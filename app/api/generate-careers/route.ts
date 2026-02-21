import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
        return NextResponse.json({ error: "GROQ_API_KEY not configured" }, { status: 500 });
    }

    const body = await req.json();
    const { profile } = body;

    if (!profile) {
        return NextResponse.json({ error: "No student profile provided" }, { status: 400 });
    }

    // Calculate compatibility sub-scores for prompt context
    const subjectScores = profile.subjectScores || {};
    const interestVector = profile.interestVector || {};
    const socioEconomic = profile.socioEconomic || {};
    const riskAppetite = profile.riskAppetite || "balanced";

    const subjectAvg = Object.values(subjectScores as Record<string, number>)
        .filter((v) => typeof v === "number" && (v as number) > 0)
        .reduce((a, b) => (a as number) + (b as number), 0) as number;

    const prompt = `You are an expert Indian career counselor and data scientist. Analyze the following student profile and return EXACTLY 10 ranked career paths.

STUDENT PROFILE:
- Class/Year: ${profile.classLevel}
- Stream: ${profile.stream}
- Subject Scores: ${JSON.stringify(subjectScores)} (out of 100)
- Interest Vector (1-10 scale): ${JSON.stringify(interestVector)}
- Location: ${socioEconomic.locationType || "urban"}
- Income Bracket: ${socioEconomic.incomeBracket || "not specified"}
- First Generation College Student: ${socioEconomic.firstGenCollege ? "yes" : "no"}
- Risk Appetite: ${riskAppetite}

SCORING FORMULA:
Compatibility Score = (Subject Alignment × 0.30) + (Interest Alignment × 0.25) + (Risk Match × 0.15) + (Accessibility × 0.15) + (Market Growth Index × 0.15)
Scale each factor 0-100. Compute a final compatibility score 0-100.

Return a JSON object with a key "careers" containing an array of exactly 10 careers, each with this structure (no other text, just the JSON object):
{
  "careers": [
    {
      "rank": 1,
      "careerName": "string",
      "compatibilityScore": 87,
      "subjectAlignment": 85,
      "interestAlignment": 90,
      "riskMatch": 80,
      "accessibility": 75,
      "marketGrowth": 88,
      "whyItMatches": "2-3 sentence explanation specific to this student",
      "requiredStream": "Science/Commerce/Arts/Any",
      "entranceExams": ["JEE Main", "JEE Advanced"],
      "topCollegesIndia": ["IIT Bombay", "NIT Trichy", "BITS Pilani"],
      "skillsRequired": ["mathematics", "problem solving", "programming"],
      "salaryRangeIndia": "₹6L – ₹25L per annum",
      "fiveYearOutlook": "High demand. 40% job growth expected by 2029 in India.",
      "riskLevel": "Medium",
      "backupPathways": ["Data Science", "IT Consulting"],
      "alternativeRoutes": "If JEE fails: BITS, state NITs via MHT-CET, or private engineering colleges followed by GATE for PSUs."
    }
  ]
}

Make sure:
1. Careers are India-specific and realistic for the student's stream and class
2. Accessibility score accounts for their socioeconomic context (rural/low-income = lower accessibility for highly competitive paths)
3. Risk match aligns with their stated appetite (${riskAppetite})
4. Include government job paths if risk appetite is "safe"
5. All entrance exams must be real Indian exams
6. Salary ranges must be realistic Indian market figures in INR`;

    try {
        const response = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: "llama-3.3-70b-versatile",
                    messages: [
                        {
                            role: "user",
                            content: prompt
                        }
                    ],
                    temperature: 0.4,
                    max_tokens: 8192,
                    top_p: 0.9,
                    response_format: { type: "json_object" }
                }),
            }
        );

        if (!response.ok) {
            const err = await response.text();
            console.error("Groq API error:", err);
            return NextResponse.json({ error: "Groq API call failed", detail: err }, { status: 500 });
        }

        const data = await response.json();
        const content = data?.choices?.[0]?.message?.content;

        if (!content) {
            return NextResponse.json({ error: "Invalid response from Groq", raw: data }, { status: 500 });
        }

        const parsed = JSON.parse(content);
        const careers = parsed.careers || [];

        return NextResponse.json({ careers });
    } catch (err) {
        console.error("Error calling Groq:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

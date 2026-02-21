import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    students: defineTable({
        userId: v.string(),
        preferredName: v.string(),
        clerkName: v.string(),

        classLevel: v.string(),
        stream: v.string(),

        subjectScores: v.object({
            maths: v.optional(v.number()),
            physics: v.optional(v.number()),
            chemistry: v.optional(v.number()),
            biology: v.optional(v.number()),
            commerce: v.optional(v.number()),
            arts: v.optional(v.number()),
        }),

        interestVector: v.object({
            analytical: v.number(),
            creative: v.number(),
            social: v.number(),
            business: v.number(),
            technical: v.number(),
            research: v.number(),
            publicService: v.number(),
        }),

        socioEconomic: v.object({
            locationType: v.union(
                v.literal("urban"),
                v.literal("rural")
            ),
            incomeBracket: v.string(),
            firstGenCollege: v.boolean(),
        }),

        riskAppetite: v.union(
            v.literal("safe"),
            v.literal("balanced"),
            v.literal("high")
        ),

        createdAt: v.number(),
    }).index("by_user", ["userId"]),

    careers: defineTable({
        userId: v.string(),
        careersData: v.array(
            v.object({
                rank: v.number(),
                careerName: v.string(),
                compatibilityScore: v.number(),
                subjectAlignment: v.number(),
                interestAlignment: v.number(),
                riskMatch: v.number(),
                accessibility: v.number(),
                marketGrowth: v.number(),
                whyItMatches: v.string(),
                requiredStream: v.string(),
                entranceExams: v.array(v.string()),
                topCollegesIndia: v.array(v.string()),
                skillsRequired: v.array(v.string()),
                salaryRangeIndia: v.string(),
                fiveYearOutlook: v.string(),
                riskLevel: v.string(),
                backupPathways: v.array(v.string()),
                alternativeRoutes: v.string(),
            })
        ),
        createdAt: v.number(),
        updatedAt: v.number(),
    }).index("by_user", ["userId"]),
});
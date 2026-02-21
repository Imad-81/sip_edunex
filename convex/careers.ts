import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const saveCareers = mutation({
    args: {
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
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db
            .query("careers")
            .withIndex("by_user", (q) => q.eq("userId", args.userId))
            .first();

        if (existing) {
            await ctx.db.patch(existing._id, {
                careersData: args.careersData,
                updatedAt: Date.now(),
            });
        } else {
            await ctx.db.insert("careers", {
                userId: args.userId,
                careersData: args.careersData,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            });
        }
    },
});

export const getCareers = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("careers")
            .withIndex("by_user", (q) => q.eq("userId", args.userId))
            .first();
    },
});

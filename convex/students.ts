import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const saveStudentProfile = mutation({
  args: {
    userId: v.string(),
    classLevel: v.string(),
    stream: v.string(),
    subjectScores: v.any(),
    interestVector: v.any(),
    socioEconomic: v.any(),
    riskAppetite: v.string(),
  },

  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("students")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, args);
      return;
    }

    await ctx.db.insert("students", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const getStudentProfile = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("students")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();
  },
});
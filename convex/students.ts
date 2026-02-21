import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const saveStudentProfile = mutation({
  args: {
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
      locationType: v.union(v.literal("urban"), v.literal("rural")),
      incomeBracket: v.string(),
      firstGenCollege: v.boolean(),
    }),
    riskAppetite: v.union(v.literal("safe"), v.literal("balanced"), v.literal("high")),
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
import * as z from "zod";

export const Relicinfo = z.object({
  relicId: z.number(),
  level: z.number(),
  nextLevel: z.number(),
  isUpgradeable: z.boolean(),
  amountFbeets: z.number(),
  rewardPending: z.number(),
  rewardPayed: z.number(),
  rewardCredit: z.number(),
  maBeetsVP: z.number(),
  imageUrl: z.string(),
});

export type Relicinfo = z.infer<typeof Relicinfo>;

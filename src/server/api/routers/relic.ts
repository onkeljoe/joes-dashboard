import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";
import {
  balanceOf,
  emissionCurve,
  getLevelInfo,
  getPositionForId,
  levelOnUpdate,
  relicPositionsOfOwner,
} from "~/utils/smartContracts/read_contract";

export const relicRouter = createTRPCRouter({
  balanceOf: publicProcedure
    .input(z.object({ address: z.string() }))
    .query(async ({ input }) => {
      return {
        balance: await balanceOf(input.address),
      };
    }),
  emissionCurve: publicProcedure.query(async () => {
    return { address: await emissionCurve() };
  }),
  getLevelInfo: publicProcedure
    .input(z.object({ poolId: z.number() }))
    .query(async ({ input }) => {
      return { levelInfo: await getLevelInfo(input.poolId) };
    }),
  getPositionForId: publicProcedure
    .input(z.object({ relicId: z.number() }))
    .query(async ({ input }) => {
      return { position: await getPositionForId(input.relicId) };
    }),
  levelOnUpdate: publicProcedure
    .input(z.object({ relicId: z.number() }))
    .query(async ({ input }) => {
      return { level: await levelOnUpdate(input.relicId) };
    }),
  relicPositionsOfOwner: publicProcedure
    .input(z.object({ owner: z.string() }))
    .query(async ({ input }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      return { level: await relicPositionsOfOwner(input.owner) };
    }),
});

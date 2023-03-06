import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";
import { balanceOf } from "~/utils/smartContracts/read_contract";

export const relicRouter = createTRPCRouter({
  balanceOf: publicProcedure
    .input(z.object({ address: z.string() }))
    .query(async ({ input }) => {
      return {
        balance: await balanceOf(input.address),
      };
    }),
});

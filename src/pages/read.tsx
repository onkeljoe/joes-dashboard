import { Card, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { api } from "~/utils/api";

const Read: NextPage = () => {
  const myAddr = "0xa3b926f6d2bB5507fE711847640bA2086CB11A75";
  const myBalance = api.relic.balanceOf.useQuery({ address: myAddr }).data
    ?.balance;
  return (
    <Card m={12} p={6}>
      <Text>for Address {myAddr} found:</Text>
      <Text>{myBalance} Relics</Text>
    </Card>
  );
};

export default Read;

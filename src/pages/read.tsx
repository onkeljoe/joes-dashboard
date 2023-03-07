import { Card, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { api } from "~/utils/api";

const Read: NextPage = () => {
  const myAddr = "0xa3b926f6d2bB5507fE711847640bA2086CB11A75";
  const relicId = 163;

  const myBalance = api.relic.balanceOf.useQuery({ address: myAddr }).data
    ?.balance;
  const emissionCurveContract = api.relic.emissionCurve
    .useQuery()
    .data?.address.toString();
  const myNextLevel = api.relic.levelOnUpdate.useQuery({ relicId }).data?.level;
  const myPosition = api.relic.getPositionForId.useQuery({ relicId }).data
    ?.position;
  return (
    <>
      <Card m={12} p={6}>
        <Text>for Address {myAddr} found:</Text>
        <Text>{myBalance} Relics</Text>
      </Card>
      <Card m={12} p={6}>
        <Text>Emission Curve Contract Address:</Text>
        <Text>{emissionCurveContract}</Text>
      </Card>
      <Card m={12} p={6}>
        <Text>Position for Relic {relicId}:</Text>
        <Text>
          amount: {parseFloat(myPosition?.amount || "0").toFixed(2)} $BEETS -
          Level: {myPosition?.level} - PoolId: {myPosition?.poolId}
        </Text>
        <Text>
          reward Debt: {parseFloat(myPosition?.rewardDebt || "0").toFixed(2)}{" "}
          reward Credit: {myPosition?.rewardCredit}
        </Text>
        <Text>
          entry Date:{" "}
          {new Date((myPosition?.entry || 0) * 1000).toLocaleDateString()}
        </Text>
      </Card>
      <Card m={12} p={6}>
        <Text>Next level for Relic {relicId}:</Text>
        <Text>{myNextLevel}</Text>
      </Card>
    </>
  );
};

export default Read;

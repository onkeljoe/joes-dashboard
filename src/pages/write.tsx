import {
  Button,
  Card,
  HStack,
  Heading,
  Input,
  Select,
  Spacer,
  Table,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { api } from "~/utils/api";
import { CustomConnectButton } from "~/components/CustomConnectButton";

import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { type Relicinfo } from "~/utils/types/relicinfo";
import { useTransferRelic } from "~/hooks/useTransferRelic";
import { Address } from "~/utils/types/contractTypes";

const Read: NextPage = () => {
  // const poolId = 2; // freshBeets pool id = 2
  const account = useAccount();
  const [relic, setRelic] = useState(0);
  const [relicInfo, setRelicInfo] = useState<Relicinfo | undefined>(undefined);
  const [toAddress, setToAddress] = useState("");

  const relicList = api.relic.relicsByAddress.useQuery(
    { address: account.address || "" },
    {
      enabled: !!account.address,
      refetchOnWindowFocus: true,
      refetchIntervalInBackground: false,
      refetchInterval: 300000,
      staleTime: 150000,
      cacheTime: 600000,
    }
  ).data?.list as Relicinfo[];

  useEffect(() => {
    if (!!relicList) {
      const info =
        relic === 0 ? relicList[0] : relicList.find((x) => x.relicId === relic);
      setRelicInfo(info);
      setRelic(info?.relicId || 0);
    }
  }, [relic, relicList]);

  if (account.isConnected && account.address) {
    return (
      <>
        <Card m={12} p={6}>
          <CustomConnectButton />
        </Card>

        <Card m={12} p={6}>
          <HStack align="start">
            <Text my={2}>Select your Relic:</Text>
            <Select
              maxW={40}
              onChange={(e) => {
                setRelic(Number(e.target.value));
              }}
              value={relic}
            >
              {relicList &&
                relicList?.map((rel, index) => (
                  <option key={index} value={rel.relicId}>
                    {rel.relicId}
                  </option>
                ))}
            </Select>
            <Spacer />
          </HStack>
        </Card>

        <Card m={12} p={6}>
          {!!relicInfo && (
            <>
              <Heading my={4}>Relic #{relic}</Heading>
              <HStack my={2}>
                <Text>
                  Level: {relicInfo.level}, is{" "}
                  {relicInfo.isUpgradeable ? "" : "not "}upgradeable
                </Text>
                <Button disabled={!relicInfo.isUpgradeable}>Upgrade</Button>
              </HStack>
              <HStack my={2}>
                <Text>Transfer to: </Text>
                <Input
                  value={toAddress}
                  onChange={(e) => setToAddress(e.target.value)}
                  placeholder="0x..."
                  size="lg"
                  isInvalid={!Address.safeParse(toAddress).success}
                  errorBorderColor="red"
                />
                <Button disabled={!Address.safeParse(toAddress).success}>
                  send now
                </Button>
              </HStack>
              <Text>{toAddress}</Text>
              <Text>
                is safeParsed:{" "}
                {Address.safeParse(toAddress).success ? "yes" : "no"}
              </Text>
              <pre>{JSON.stringify(relicInfo, undefined, "  ")}</pre>
            </>
          )}
        </Card>

        <Card m={12} p={6}>
          <Heading mb={2} alignSelf="center">
            relic Infos
          </Heading>
          <Text mb={4} alignSelf="center" as="b">
            for Address {account.address}:
          </Text>
          <Table size="sm" variant="striped" colorScheme="blue">
            <Thead>
              <Tr>
                <Th isNumeric>Relic ID</Th>
                <Th isNumeric>Level</Th>
                <Th isNumeric>Next Level</Th>
                <Th isNumeric>is upgradeable?</Th>
                <Th isNumeric>amount fBEETS</Th>
                <Th isNumeric>pending Reward</Th>
                <Th isNumeric>payed Reward</Th>
                <Th isNumeric>Reward credit</Th>
                <Th isNumeric>maBEETS voting power</Th>
                <Th isNumeric>image URL</Th>
              </Tr>
            </Thead>
            <Tbody>
              {relicList &&
                relicList.map((rel, index) => {
                  return (
                    <Tr key={index}>
                      <Td isNumeric>{rel.relicId}</Td>
                      <Td isNumeric>{rel.level}</Td>
                      <Td isNumeric>{rel.nextLevel}</Td>
                      <Td isNumeric>{rel.isUpgradeable ? "yes" : "no"}</Td>
                      <Td isNumeric>
                        {rel.amountFbeets.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </Td>
                      <Td isNumeric>
                        {rel.rewardPending.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </Td>
                      <Td isNumeric>
                        {rel.rewardPayed.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </Td>
                      <Td isNumeric>
                        {rel.rewardCredit.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </Td>
                      <Td isNumeric>
                        {rel.maBeetsVP.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </Td>
                      <Td isNumeric>{rel.imageUrl}</Td>
                    </Tr>
                  );
                })}
            </Tbody>
            <Tfoot>
              <Tr>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td isNumeric>
                  {relicList &&
                    relicList
                      .reduce((sum, cur) => sum + cur.amountFbeets, 0)
                      .toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                </Td>
                <Td isNumeric>
                  {relicList &&
                    relicList
                      .reduce((sum, cur) => sum + cur.rewardPending, 0)
                      .toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                </Td>
                <Td isNumeric>
                  {relicList &&
                    relicList
                      .reduce((sum, cur) => sum + cur.rewardPayed, 0)
                      .toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                </Td>
                <Td isNumeric>
                  {relicList &&
                    relicList
                      .reduce((sum, cur) => sum + cur.rewardCredit, 0)
                      .toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                </Td>
                <Td isNumeric>
                  {relicList &&
                    relicList
                      .reduce((sum, cur) => sum + cur.maBeetsVP, 0)
                      .toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                </Td>
                <Td></Td>
              </Tr>
            </Tfoot>
          </Table>
        </Card>
      </>
    );
  }
  return (
    <Card m={12} p={6}>
      <CustomConnectButton />
    </Card>
  );
};

export default Read;

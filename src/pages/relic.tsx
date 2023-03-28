import {
  Box,
  Card,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Divider,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import type { NextPage } from "next";
import { api } from "~/utils/api";
import { CustomConnectButton } from "~/components/CustomConnectButton";
import { FbBack, FbSmall } from "~/components/fbeet";
import { useAccount } from "wagmi";

const Read: NextPage = () => {
  const account = useAccount();

  console.log(account.address, account.isConnected);

  return (
    <>
      <VStack m={5}>
        <Heading>Relic Tool</Heading>
        <CustomConnectButton />
        {account.isConnected && <RelicDisplay />}
      </VStack>
      <FbBack />
    </>
  );
};

export default Read;

const RelicDisplay = () => {
  const toast = useToast();

  const account = useAccount();

  const myAddr = account?.address;
  // const poolId = 2;

  const relicPositions = api.relic.relicPositionsOfOwner.useQuery({
    owner: myAddr,
  }).data;

  console.log(relicPositions);

  if (relicPositions?.level.ids.length === 0) {
    return (
      <>
        <p>
          <FbSmall /> no relics
        </p>
      </>
    );
  }

  return (
    <>
      <Card m={12} p={6}>
        <HStack>
          {relicPositions?.level.ids.map((rel, index) => {
            return (
              <Box key={index}>
                <Card m={12} p={6} w={300} variant="outline">
                  <Text>Relic #{rel}</Text>
                  <Divider m={3} />
                  <Text>
                    Level: {relicPositions.level.positions[index]?.level}
                  </Text>
                  <Text>
                    <FbSmall />{" "}
                    {relicPositions.level.positions[index]?.amount.toFixed(2)}
                  </Text>
                  <Text>
                    Entry:{" "}
                    {new Date(
                      (relicPositions.level.positions[index]?.entry || 0) * 1000
                    ).toDateString()}
                  </Text>
                  <Divider m={3} />
                  <HStack>
                    <Button
                      onClick={() =>
                        toast({
                          title: "Split",
                          description: `split relic #${rel}`,
                          status: "success",
                          duration: 5000,
                          isClosable: true,
                          position: "top",
                        })
                      }
                    >
                      Split
                    </Button>
                    <Button
                      onClick={() =>
                        toast({
                          title: "Merge",
                          description: `merge relic #${rel}`,
                          status: "success",
                          duration: 5000,
                          isClosable: true,
                          position: "top",
                        })
                      }
                    >
                      Merge
                    </Button>
                    <Button
                      onClick={() =>
                        toast({
                          title: "Transfer",
                          description: `transfer relic #${rel}`,
                          status: "success",
                          duration: 5000,
                          isClosable: true,
                          position: "top",
                        })
                      }
                    >
                      Transfer
                    </Button>
                  </HStack>
                </Card>
              </Box>
            );
          })}
        </HStack>
      </Card>
    </>
  );
};

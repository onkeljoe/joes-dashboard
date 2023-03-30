/* eslint-disable @typescript-eslint/no-misused-promises */
import styles from "./index.module.css";
import type { NextPage } from "next";
import Head from "next/head";

import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";

const Home: NextPage = () => {
  const router = useRouter();
  const readPath = "/read";
  const writePath = "/write";

  return (
    <>
      <Head>
        <title>Joes dashboard</title>
        <meta name="description" content="mabeets dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>
            <span className={styles.pinkSpan}>Joe&apos;s</span> Dashboard
          </h1>
          <h2 className={styles.subtitle}>
            Supported by <span className={styles.pinkSpan}>RnZ</span>
          </h2>
          <div className={styles.cardRow}>
            <Box className={styles.card} onClick={() => router.push(readPath)}>
              <h3 className={styles.cardTitle}>Read Contract</h3>
              <div className={styles.cardText}>
                Lets find out, what infos we can get from our relics
              </div>
            </Box>
            <Box className={styles.card} onClick={() => router.push(writePath)}>
              <h3 className={styles.cardTitle}>Write Contract</h3>
              <div className={styles.cardText}>
                Learn to write to smart contract (coming soon ...)
              </div>
            </Box>
          </div>
          {/* <div className={styles.showcaseContainer}>
            <p className={styles.showcaseText}>
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
          </div> */}
        </div>
      </main>
    </>
  );
};

export default Home;

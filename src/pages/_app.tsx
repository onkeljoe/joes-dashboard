import type { AppType } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "~/styles/theme";
import { WagmiConfig } from "wagmi";
import { client, chains } from "~/utils/wagmiconf";
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { api } from "~/utils/api";
import { ColorModeSwitcher } from "~/components/ColorModeSwitcher";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <WagmiConfig client={client}>
        <RainbowKitProvider
          chains={chains}
          modalSize="compact"
          theme={darkTheme()}
        >
          <ColorModeSwitcher />
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
};

export default api.withTRPC(MyApp);

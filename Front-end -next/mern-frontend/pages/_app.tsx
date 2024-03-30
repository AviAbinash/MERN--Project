import Layout from "@/Components/Common/layout/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { configureAppStore } from "../src/redux/store";
import { Provider } from "react-redux";
export default function App({ Component, pageProps }: AppProps) {
  console.log(Layout, "component");
  const initialState = {
    // ... initial state of each chunk/feature
    utilities: { popUp: true },
  };

  const store = configureAppStore(initialState);
  return (
    <>
      <Provider store={store}>
        {" "}
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}

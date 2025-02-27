import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MovieProvider } from "@/context/MovieContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MovieProvider>
      <Component {...pageProps} />
    </MovieProvider>
);
}

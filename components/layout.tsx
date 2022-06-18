import Head from "next/head";
import { ReactNode } from "react";
import { Header } from "./header";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div style={{ WebkitTapHighlightColor: "transparent" }}>
      <Head>
        <title>Receitas TM</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>🍳</text></svg>"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="viewport" content="initial-scale=1, viewport-fit=cover" />
      </Head>

      <Header />

      {children}
    </div>
  );
};

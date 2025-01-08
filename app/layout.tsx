import { NavigationBar } from "@/components/NavigationBar/NavigationBar";
import { Theme } from "@radix-ui/themes";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aither",
  description: ".",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        {/* @ts-ignore */}
        <ThemeProvider
          attribute="class"
          disableTransitionOnChange
        >
          <Theme
            accentColor="sky"
            grayColor="slate"
            appearance="inherit"
            panelBackground="translucent"
            radius="large"
            asChild
          >
            <main
              style={{
                background: "var(--ui-1)",
                minHeight: "100%",
              }}
              id="main"
            >
              <NavigationBar />
              {children}
            </main>
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  );
}

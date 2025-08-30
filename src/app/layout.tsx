import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RunFuture Economy - AI-Powered E-commerce Marketplace",
  description: "Advanced AI-driven e-commerce marketplace with automated development capabilities for the Thai market",
  keywords: ["AI", "E-commerce", "Marketplace", "Thailand", "Automation", "Development"],
  authors: [{ name: "RunFuture Economy Team" }],
  openGraph: {
    title: "RunFuture Economy",
    description: "AI-Powered E-commerce Marketplace",
    type: "website",
    locale: "th_TH",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
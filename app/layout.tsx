import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import "@/styles/theme.css";
import Brand from "@/components/feature/brand";
import { MenuDropdown } from "@/components/feature/menu-dropdown";
import { Providers } from "./providers";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Weather Now",
  description:
    "A modern weather application with real-time forecasts and location-based search.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bricolageGrotesque.variable} ${dmSans.variable} bg-background-body antialiased`}
      >
        <div className="mx-auto min-h-dvh w-full max-w-layout p-3.5 font-secondary text-text-primary">
          <header className="flex items-center justify-between">
            <Brand />
            <nav>
              <MenuDropdown />
            </nav>
          </header>
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}

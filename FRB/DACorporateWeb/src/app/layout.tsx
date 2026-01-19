import "./globals.css";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";

// Configure Montserrat font
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

// Configure Nohemi local font
const nohemi = localFont({
  src: [
    {
      path: "../assets/public/fonts/Nohemi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/public/fonts/Nohemi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/public/fonts/Nohemi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-nohemi",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${nohemi.variable}`}>
      <body>{children}</body>
    </html>
  );
}

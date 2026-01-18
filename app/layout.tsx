import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BitLens - Focus on the Pixels, not Megapixels",
  description: "Transform your high-resolution images into artistic pixel art with retro palettes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://unpkg.com/nes.css@latest/css/nes.min.css"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

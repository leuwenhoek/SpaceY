import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SpaceY | Journey Beyond",
  description: "Explore missions, discoveries, and the endless possibilities beyond Earth with SpaceY.",
  keywords: ["space", "spacex", "spacey", "missions", "rocket", "starship", "nasa", "mars"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&family=Iosevka+Charon:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&family=Outfit:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body
        className="font-sans antialiased bg-white text-zinc-950"
      >
        {children}
      </body>
    </html>
  );
}


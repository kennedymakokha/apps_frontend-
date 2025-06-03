import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Free QR Code Generator | Customize & Download QR Codes",
  description: "Easily generate free QR codes for URLs or Wi-Fi with customizable colors, logo upload, and instant download. No login required.",
  keywords: ["QR code generator", "WiFi QR code", "custom QR", "QR code with logo", "online QR code tool"],
  metadataBase: new URL("https://qrcode-generator.mtandao.app"),
  openGraph: {
    title: "Free QR Code Generator",
    description: "Generate high-quality, customizable QR codes for URLs and Wi-Fi. Add colors, logos, and download instantly.",
    url: "https://qrcode-generator.mtandao.app",
    siteName: "QR Code Generator",
    type: "website",
    images: [
      {
        url: "/qr-preview.png",
        width: 1200,
        height: 630,
        alt: "Preview of generated QR code",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free QR Code Generator",
    description: "Customize and download QR codes for URLs and Wi-Fi for free.",
    images: ["/qr-preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${robotoMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

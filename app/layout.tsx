import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter, Fraunces } from "next/font/google";
import "./globals.css";
import AvisoCookies from "@/components/AvisoCookies";

const display = Barlow_Condensed({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-display" });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });
const serif = Fraunces({ subsets: ["latin"], style: ["italic"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "Fernando Blocos | Blocos cerâmicos em Itu",
  description: "Catálogo de blocos cerâmicos: 9, 11,5, 14 e 19 cm. Peça pelo WhatsApp.",
};
export const viewport: Viewport = { themeColor: "#a4442a", colorScheme: "light" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body id="top" className={`${display.variable} ${body.variable} ${serif.variable}`}>
        <a href="#conteudo" className="pular">Pular para o conteúdo</a>
        {children}
        <AvisoCookies />
      </body>
    </html>
  );
}

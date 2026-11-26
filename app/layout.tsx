import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter, Fraunces } from "next/font/google";
import "./globals.css";
import AvisoCookies from "@/components/AvisoCookies";
import { CONTATOS, EMPRESA, FIXO, SITE_URL } from "@/lib/config";

const display = Barlow_Condensed({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-display" });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });
const serif = Fraunces({ subsets: ["latin"], style: ["italic"], variable: "--font-serif" });

const DESCRICAO = "Blocos cerâmicos de vedação, estruturais e canaletas em Itu/SP, desde 1988. Veja todas as medidas no catálogo e peça seu orçamento pelo WhatsApp. Entregamos na sua obra.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Fernando Blocos | Blocos cerâmicos e canaletas em Itu/SP", template: "%s" },
  description: DESCRICAO,
  keywords: ["blocos cerâmicos", "bloco cerâmico Itu", "bloco de vedação", "bloco estrutural", "canaleta cerâmica", "tijolo baiano", "material de construção Itu", "Fernando Blocos"],
  openGraph: {
    type: "website", locale: "pt_BR", url: "/", siteName: "Fernando Blocos",
    title: "Fernando Blocos | Blocos cerâmicos e canaletas em Itu/SP", description: DESCRICAO,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

// Dados estruturados: dizem ao Google que é uma empresa local de materiais de construção.
// Só informações confirmadas no site; endereço completo entra quando INFO.endereco for preenchido.
const empresaJsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: EMPRESA.nome,
  ...(EMPRESA.razaoSocial && { legalName: EMPRESA.razaoSocial }),
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/opengraph-image.png`,
  description: DESCRICAO,
  foundingDate: "1988",
  telephone: `+${FIXO.tel}`,
  contactPoint: CONTATOS.map((c) => ({ "@type": "ContactPoint", telephone: `+${c.whats}`, contactType: "sales", name: c.nome, availableLanguage: "Portuguese" })),
  address: { "@type": "PostalAddress", addressLocality: "Itu", addressRegion: "SP", addressCountry: "BR" },
  areaServed: { "@type": "City", name: "Itu" },
  ...(EMPRESA.email && { email: EMPRESA.email }),
};
export const viewport: Viewport = { themeColor: "#a4442a", colorScheme: "light" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body id="top" className={`${display.variable} ${body.variable} ${serif.variable}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(empresaJsonLd) }} />
        <a href="#conteudo" className="pular">Pular para o conteúdo</a>
        {children}
        <AvisoCookies />
      </body>
    </html>
  );
}

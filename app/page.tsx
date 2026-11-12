import Image from "next/image";
import Catalogo from "@/components/Catalogo";
import ComoPedir from "@/components/ComoPedir";
import AbrirOrcamento from "@/components/AbrirOrcamento";
import Fab from "@/components/Fab";
import Marquee from "@/components/Marquee";
import Operacao from "@/components/Operacao";
import OrcamentoDrawer from "@/components/OrcamentoDrawer";
import Wall from "@/components/Wall";
import WhatsIcon from "@/components/WhatsIcon";
import { CONTATOS, waLink } from "@/lib/config";
import Rodape from "@/components/Rodape";

const marquee = [
  "Tecnologia • Qualidade • Resistência",
  "Qualidade em cada peça",
  "Tecnologia e precisão na fabricação",
  "Agilidade no atendimento",
  "Qualidade que faz a diferença na sua obra",
  "Direto de Itu para sua construção",
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <Wall />
        <Image src="/fotos/p280.webp" alt="Caminhão Scania da Fernando Blocos carregado de blocos" width={612} height={408} className="hero-truck" />
        <div className="placa">
          <Image src="/logo.png" alt="Fernando Blocos" width={260} height={240} priority className="logo" />
          <h1>Paredes de qualidade começam com <em>a escolha certa.</em></h1>
          <p>Blocos cerâmicos em diferentes medidas, tecnologia de fabricação e qualidade para sua obra. Escolha, consulte nosso catálogo e solicite seu orçamento pelo WhatsApp.</p>
          <div className="cta">
            <a href="#catalogo" className="btn">Conheça nosso catálogo</a>
            <AbrirOrcamento>Solicite seu orçamento</AbrirOrcamento>
          </div>
        </div>
      </section>

      <Marquee frases={marquee} />

      <section id="catalogo" className="catalogo">
        <header>
          <span className="eyebrow">Catálogo</span>
          <h2>Todas as medidas. <em>Um padrão de qualidade.</em></h2>
          <p>Medidas em centímetros: largura × altura × comprimento.</p>
          <a className="btn" href="#linha">Conheça nossa linha</a>
        </header>
        <Catalogo />
      </section>

      <Operacao />

      <ComoPedir />

      <section id="contato" className="contato-sec">
        <Image src="/fotos/xicara.webp" alt="Xícara da Fernando Blocos, desde 1988" width={522} height={478} className="xicara" />
        <h2>Vai construir ou reformar?</h2>
        <p>Conte com a qualidade e a confiança da Fernando Blocos! Entre em contato e faça seu pedido.</p>
        <div className="contatos">
          {CONTATOS.map((c) => (
            <a key={c.nome} className="contato" target="_blank" rel="noopener noreferrer"
              href={waLink(`Olá, ${c.nome}! Vim pelo catálogo da Fernando Blocos e quero fazer um orçamento.`, c.whats)}>
              <WhatsIcon size={32} />
              <span><small>Falar com</small><b>{c.nome}</b><em>{c.fone}</em></span>
            </a>
          ))}
        </div>
      </section>

            <Rodape />

      <Fab />
      <OrcamentoDrawer />
    </main>
  );
}

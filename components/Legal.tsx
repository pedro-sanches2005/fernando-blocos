import Image from "next/image";
import Link from "next/link";
import Rodape from "./Rodape";
import { ATUALIZADO } from "@/lib/config";

// Moldura das páginas legais: topo simples com volta ao site, texto em coluna legível e o rodapé de sempre.
export default function Legal({ titulo, resumo, children }: { titulo: string; resumo: string; children: React.ReactNode }) {
  return (
    <>
      <header className="lg-topo">
        <Link href="/" className="lg-volta" aria-label="Voltar para o catálogo da Fernando Blocos">
          <Image src="/logo.png" alt="" width={70} height={65} />
          <span>← Voltar ao catálogo</span>
        </Link>
      </header>
      <main id="conteudo" className="lg">
        <span className="eyebrow">Fernando Blocos</span>
        <h1>{titulo}</h1>
        <p className="lg-resumo">{resumo}</p>
        <p className="lg-data">Última atualização: {ATUALIZADO}</p>
        <div className="lg-texto">{children}</div>
      </main>
      <Rodape />
    </>
  );
}
import Image from "next/image";
import { CONTATOS, FIXO, INFO, waLink } from "@/lib/config";

const LINKS = [
  { href: "#linha", t: "Catálogo de blocos" },
  { href: "#entrega", t: "Da carga à obra" },
  { href: "#como-pedir", t: "Como pedir" },
  { href: "#contato", t: "Contato" },
];

export default function Rodape() {
  return (
    <footer className="rodape">
      <div className="fiadas" aria-hidden="true" />
      <div className="rodape-in">
        <div className="r-marca">
       <Image src="/logo.png" alt="Fernando Blocos" width={160} height={148} className="r-logo" />
          <p>Qualidade, praticidade e confiança para sua obra.</p>
          <span className="r-desde">Desde 1988 · Itu, SP</span>
        </div>

        <nav className="r-col" aria-label="Seções do site">
          <h4>No site</h4>
          {LINKS.map((l) => <a key={l.href} href={l.href}>{l.t}</a>)}
        </nav>

        <div className="r-col">
          <h4>Fale com a gente</h4>
          {CONTATOS.map((c) => (
            <a key={c.nome} href={waLink(`Olá, ${c.nome}! Vim pelo site da Fernando Blocos.`, c.whats)} target="_blank" rel="noopener noreferrer">
              <b>{c.nome}</b> · {c.fone}
            </a>
          ))}
          <a href={`tel:+${FIXO.tel}`}><b>Fixo</b> · {FIXO.fone}</a>
          {INFO.endereco && <span>{INFO.endereco}</span>}
          {INFO.horario && <span>{INFO.horario}</span>}
          {INFO.maps && <a href={INFO.maps} target="_blank" rel="noopener noreferrer">Como chegar</a>}
        </div>
      </div>
      <div className="r-base">
        <span>© {new Date().getFullYear()} Fernando Blocos · Itu, SP</span>
        <a href="#">Voltar ao topo ↑</a>
      </div>
    </footer>
  );
}
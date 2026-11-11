import { CONTATOS, INFO, waLink } from "@/lib/config";

const passos = [
  ["1", "Escolha o modelo e as medidas", "Veja todos os blocos do catálogo, com as medidas de cada um."],
  ["2", "Solicite seu orçamento de forma rápida", "Adicione os blocos e as quantidades, escolha para quem enviar e o pedido chega pronto no WhatsApp."],
  ["3", "Combine os detalhes da entrega", "Prazo, valor e entrega você acerta diretamente pelo WhatsApp."],
];

export default function ComoPedir() {
  const tem = INFO.endereco || INFO.horario || INFO.cidades.length > 0;
  return (
    <section id="como-pedir" className="como">
      <header>
        <span className="eyebrow">Passo a passo</span>
        <h2>Praticidade em <em>cada etapa.</em></h2>
        <p>Na Fernando Blocos, construir começa com boas escolhas.</p>
      </header>

      <ol className="passos">
        {passos.map(([nº, t, d]) => (
          <li key={nº}><b>{nº}</b><h3>{t}</h3><p>{d}</p></li>
        ))}
      </ol>

      <div className="info">
        {tem ? (
          <dl>
            {INFO.cidades.length > 0 && <div><dt>Entregamos em</dt><dd>{INFO.cidades.join(" · ")}</dd></div>}
            {INFO.horario && <div><dt>Atendimento</dt><dd>{INFO.horario}</dd></div>}
            {INFO.endereco && <div><dt>Onde estamos</dt><dd>{INFO.endereco}</dd></div>}
          </dl>
        ) : (
          <p>Quer saber se entregamos no seu endereço? Pergunte direto no WhatsApp.</p>
        )}
        <div className="info-btns">
          {INFO.maps && <a className="btn ghost" href={INFO.maps} target="_blank" rel="noopener noreferrer">Como chegar</a>}
          {CONTATOS.map((c) => (
            <a key={c.nome} className="btn" target="_blank" rel="noopener noreferrer"
              href={waLink(`Olá, ${c.nome}! Vocês entregam no meu endereço?`, c.whats)}>Falar com {c.nome}</a>
          ))}
        </div>
      </div>
    </section>
  );
}

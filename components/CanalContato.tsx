import { CONTATOS, EMPRESA, FIXO } from "@/lib/config";

export function CanalContato() {
  return (
    <ul>
      {CONTATOS.map((c) => <li key={c.nome}>WhatsApp ({c.nome}): {c.fone}</li>)}
      <li>Telefone fixo: {FIXO.fone}</li>
      {EMPRESA.email && <li>Email: <a href={`mailto:${EMPRESA.email}`}>{EMPRESA.email}</a></li>}
    </ul>
  );
}

// "Fernando Blocos (Razão Social, CNPJ ...)" quando os dados estiverem preenchidos.
export function Identificacao() {
  const extra = [EMPRESA.razaoSocial, EMPRESA.cnpj && `CNPJ ${EMPRESA.cnpj}`].filter(Boolean).join(", ");
  return <>{EMPRESA.nome}{extra ? ` (${extra})` : ""}, com sede em {EMPRESA.cidade}</>;
}

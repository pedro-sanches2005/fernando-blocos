// Quem recebe os orçamentos. Confira qual número é de quem e ajuste aqui, se precisar.
export const CONTATOS = [
  { nome: "Simone", whats: "5511971181136", fone: "(11) 9 7118-1136" },
  { nome: "Fernando", whats: "5511999675271", fone: "(11) 9 9967-5271" },
];

export const FIXO = { tel: "551140222048", fone: "(11) 4022-2048" };
export const waLink = (text?: string, numero: string = CONTATOS[0].whats) =>
  `https://wa.me/${numero}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

// Preencha o que for confirmado. O que ficar vazio simplesmente não aparece no site.
export const INFO = {
  endereco: "",            // ex.: "Rua Tal, 123 - Itu/SP"
  horario: "",             // ex.: "Seg a Sex, 7h às 17h"
  cidades: [] as string[], // ex.: ["Itu", "Salto"]
  maps: "",                // link do Google Maps (botão "Como chegar")
};

// Dados da empresa (obrigatórios por lei em site que vende: Decreto 7.962/2013 e LGPD).
// ⚠ PREENCHA razão social, CNPJ e email. Enquanto estiverem vazios, não aparecem no site.
export const EMPRESA = {
  nome: "Fernando Blocos",
  razaoSocial: "", // ex.: "Fernando Blocos Comércio de Materiais Ltda."
  cnpj: "",        // ex.: "00.000.000/0001-00"
  email: "",       // email para pedidos e para pedidos de dados pessoais (LGPD)
  cidade: "Itu/SP",
};
export const ATUALIZADO = "25 de novembro de 2026"; // data da última revisão das páginas legais

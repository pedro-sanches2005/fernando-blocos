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

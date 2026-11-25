export type Bloco = {
  slug: string; largura: string; altura: string; comprimento: string;
  furos: number;  uso: string;
  categoria?: CategoriaId; // sem categoria = vedação
  tipo?: string;           // etiqueta do card (ex.: "Canaleta J"); vazio = mostra os furos
};

export type CategoriaId = "vedacao" | "estrutural" | "canaleta";
export const CATEGORIAS: { id: CategoriaId; nome: string; nota: string }[] = [
  { id: "vedacao", nome: "Blocos de vedação", nota: "a espessura da parede é a largura do bloco" },
  { id: "estrutural", nome: "Blocos estruturais", nota: "para paredes que fazem parte da estrutura da obra" },
  { id: "canaleta", nome: "Canaletas", nota: "para vergas, contravergas e cintas de amarração" },
  // nova categoria: adicione aqui e use categoria: "id" nos itens
];

export const blocos: Bloco[] = [
  { slug: "9x19x29", largura: "9", altura: "19", comprimento: "29", furos: 6,
     uso: "Divisórias e vedação leve" },
  { slug: "9x19x39", largura: "9", altura: "19", comprimento: "39", furos: 6,
     uso: "Paredes divisórias rápidas" },
  { slug: "11-5x19x29", largura: "11,5", altura: "19", comprimento: "29", furos: 6,
     uso: "Vedação interna" },
  { slug: "11-5x19x39", largura: "11,5", altura: "19", comprimento: "39", furos: 6,
     uso: "Vedação com ótimo rendimento" },
  { slug: "14x19x29", largura: "14", altura: "19", comprimento: "29", furos: 9,
    uso: "Paredes externas e internas" },
  { slug: "14x19x39", largura: "14", altura: "19", comprimento: "39", furos: 9,
     uso: "Vedação geral" },
  { slug: "19x19x29", largura: "19", altura: "19", comprimento: "29", furos: 12,
    uso: "Paredes de alta espessura" },
  { slug: "19x19x39", largura: "19", altura: "19", comprimento: "39", furos: 9,
     uso: "Paredes robustas" },

  // ===== Blocos estruturais =====
  { slug: "estrutural-11-5x19x29", categoria: "estrutural", largura: "11,5", altura: "19", comprimento: "29", furos: 0,
     uso: "Alvenaria estrutural" },
  { slug: "estrutural-11-5x19x39", categoria: "estrutural", largura: "11,5", altura: "19", comprimento: "39", furos: 0,
     uso: "Alvenaria estrutural" },
  { slug: "estrutural-14x19x29", categoria: "estrutural", largura: "14", altura: "19", comprimento: "29", furos: 0,
     uso: "Alvenaria estrutural" },
  { slug: "estrutural-14x19x39", categoria: "estrutural", largura: "14", altura: "19", comprimento: "39", furos: 0,
     uso: "Alvenaria estrutural" },
  { slug: "estrutural-19x19x39", categoria: "estrutural", largura: "19", altura: "19", comprimento: "39", furos: 0,
     uso: "Alvenaria estrutural" },

  // ===== Canaletas =====
  // ⚠ MEDIDAS PROVISÓRIAS: confirmar com o Fernando e ajustar largura/altura/comprimento.
  // Se mudar a medida, renomeie também a foto em public/blocos/ para o novo slug.
  { slug: "canaleta-14x19x29", categoria: "canaleta", tipo: "Canaleta", largura: "14", altura: "19", comprimento: "29", furos: 0,
     uso: "Vergas, contravergas e cintas em alvenaria de vedação" },
  { slug: "canaleta-estrutural-14x19x29", categoria: "canaleta", tipo: "Estrutural", largura: "14", altura: "19", comprimento: "29", furos: 0,
     uso: "Cintas e vergas em alvenaria estrutural" },
  { slug: "canaleta-estrutural-19x19x29", categoria: "canaleta", tipo: "Estrutural", largura: "19", altura: "19", comprimento: "29", furos: 0,
     uso: "Cintas e vergas em paredes de 19 cm" },
  { slug: "canaleta-j-14x19x29", categoria: "canaleta", tipo: "Canaleta J", largura: "14", altura: "19", comprimento: "29", furos: 0,
     uso: "Apoio de laje na última fiada da parede" },
  { slug: "canaleta-j-19x19x29", categoria: "canaleta", tipo: "Canaleta J", largura: "19", altura: "19", comprimento: "29", furos: 0,
     uso: "Apoio de laje em paredes de 19 cm" },
];

export const num = (s: string) => parseFloat(s.replace(",", "."));

// Como o produto aparece no orçamento e na mensagem do WhatsApp.
const TIPO_CANALETA: Record<string, string> = { "Canaleta": "simples", "Estrutural": "estrutural", "Canaleta J": "tipo J" };
export function rotulo(b: Bloco) {
  const m = `${b.largura}×${b.altura}×${b.comprimento}`;
  if (b.categoria === "canaleta") return { nome: `Canaleta ${m}`, medida: TIPO_CANALETA[b.tipo ?? ""] ?? "canaleta", bloco: false };
  if (b.categoria === "estrutural") return { nome: `Estrutural ${m}`, medida: "estrutural", bloco: true };
  return { nome: m, medida: `${b.furos} furos`, bloco: true };
}
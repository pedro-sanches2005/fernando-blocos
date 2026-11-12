export type Bloco = {
  slug: string; largura: string; altura: string; comprimento: string;
  furos: number;  uso: string;
  categoria?: CategoriaId; // sem categoria = vedação
};

export type CategoriaId = "vedacao" | "estrutural";
export const CATEGORIAS: { id: CategoriaId; nome: string; nota: string }[] = [
  { id: "vedacao", nome: "Blocos de vedação", nota: "a espessura da parede é a largura do bloco" },
  { id: "estrutural", nome: "Blocos estruturais", nota: "para paredes que fazem parte da estrutura da obra" },
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
];

export const num = (s: string) => parseFloat(s.replace(",", "."));
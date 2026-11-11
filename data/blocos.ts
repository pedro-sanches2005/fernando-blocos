export type Bloco = {
  slug: string; largura: string; altura: string; comprimento: string;
  furos: number; legenda: string; uso: string;
};

export const blocos: Bloco[] = [
  { slug: "9x19x29", largura: "9", altura: "19", comprimento: "29", furos: 6,
    legenda: "Pequeno, mas não aceita desaforo.", uso: "Divisórias e vedação leve" },
  { slug: "9x19x39", largura: "9", altura: "19", comprimento: "39", furos: 6,
    legenda: "Mais comprido: menos junta, mais pressa.", uso: "Paredes divisórias rápidas" },
  { slug: "11-5x19x29", largura: "11,5", altura: "19", comprimento: "29", furos: 6,
    legenda: "O meio-termo que todo pedreiro respeita.", uso: "Vedação interna" },
  { slug: "11-5x19x39", largura: "11,5", altura: "19", comprimento: "39", furos: 6,
    legenda: "Rende parede como ninguém.", uso: "Vedação com ótimo rendimento" },
  { slug: "14x19x29", largura: "14", altura: "19", comprimento: "29", furos: 9,
    legenda: "Em Itu tudo é grande. Esse também.", uso: "Paredes externas e internas" },
  { slug: "14x19x39", largura: "14", altura: "19", comprimento: "39", furos: 9,
    legenda: "O queridinho da obra, de Itu a Salto.", uso: "Vedação geral" },
  { slug: "19x19x29", largura: "19", altura: "19", comprimento: "29", furos: 12,
    legenda: "Parede parruda, do jeito que o ituano gosta.", uso: "Paredes de alta espessura" },
  { slug: "19x19x39", largura: "19", altura: "19", comprimento: "39", furos: 9,
    legenda: "O gigante. Aqui tudo é exagerado mesmo.", uso: "Paredes robustas" },
];

export const num = (s: string) => parseFloat(s.replace(",", "."));

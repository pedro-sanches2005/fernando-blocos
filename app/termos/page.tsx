import type { Metadata } from "next";
import Link from "next/link";
import Legal from "@/components/Legal";
import { CanalContato, Identificacao } from "@/components/CanalContato";

export const metadata: Metadata = { alternates: { canonical: "/termos" }, title: "Termos de Uso | Fernando Blocos", description: "Regras de uso do catálogo online da Fernando Blocos." };

export default function Termos() {
  return (
    <Legal titulo="Termos de Uso" resumo="Este site é um catálogo. O orçamento que você monta aqui é um pedido de cotação: preço, prazo e disponibilidade são confirmados pela nossa equipe no WhatsApp antes de qualquer compra.">
      <h2>1. Quem somos</h2>
      <p>Este site pertence a <Identificacao />. Ao usar o site, você concorda com estes termos e com a nossa <Link href="/privacidade">Política de Privacidade</Link>.</p>

      <h2>2. Para que serve o site</h2>
      <p>Mostrar os blocos que vendemos, com suas medidas, e facilitar o envio de um pedido de orçamento pelo WhatsApp. O site não faz cobranças, não recebe pagamentos e não fecha vendas sozinho.</p>

      <h2>3. Orçamento não é compra</h2>
      <ul>
        <li>O orçamento enviado pelo site é um <strong>pedido de cotação</strong>, sem compromisso para nenhum dos lados.</li>
        <li>Preço, frete, prazo de entrega, forma de pagamento e disponibilidade em estoque são informados pela nossa equipe na conversa e só valem depois de confirmados por ela.</li>
        <li>A venda só acontece quando os dois lados confirmam o pedido.</li>
      </ul>

      <h2>4. Produtos, medidas e fotos</h2>
      <ul>
        <li>As medidas do catálogo são <strong>medidas nominais</strong>, em centímetros. Pequenas variações de tamanho e de tonalidade são normais em peças cerâmicas queimadas em forno.</li>
        <li>As fotos servem para mostrar o produto e podem ter diferenças de cor por causa da luz e da tela do seu aparelho.</li>
        <li>A indicação de uso de cada bloco é uma orientação geral. A escolha do bloco certo para a sua obra deve ser feita com o profissional responsável por ela (engenheiro, arquiteto ou mestre de obras).</li>
      </ul>

      <h2>5. Entrega</h2>
      <p>Endereço, data, horário e condições de descarga são combinados pelo WhatsApp. Confira a quantidade e o estado dos blocos na hora do recebimento e avise a nossa equipe se algo estiver errado.</p>

      <h2>6. Trocas e devoluções</h2>
      <p>Seguem o Código de Defesa do Consumidor. Os detalhes estão na página <Link href="/trocas">Trocas, devoluções e reembolso</Link>.</p>

      <h2>7. Uso do conteúdo</h2>
      <p>Não é permitido copiar, reproduzir ou usar comercialmente as fotos, textos, logotipo e demais conteúdos deste site sem nossa autorização. Também não é permitido tentar prejudicar o funcionamento do site.</p>

      <h2>8. Links externos</h2>
      <p>O site abre o WhatsApp e, quando houver, o Google Maps. Esses serviços têm termos e políticas próprios, que não controlamos.</p>

      <h2>9. Contato</h2>
      <CanalContato />

      <h2>10. Lei aplicável</h2>
      <p>Estes termos seguem as leis brasileiras, em especial o Código de Defesa do Consumidor (Lei 8.078/1990) e a LGPD (Lei 13.709/2018). Eventuais disputas podem ser levadas ao foro do domicílio do consumidor.</p>
    </Legal>
  );
}

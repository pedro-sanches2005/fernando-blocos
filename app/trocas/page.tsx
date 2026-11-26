import type { Metadata } from "next";
import Link from "next/link";
import Legal from "@/components/Legal";
import { CanalContato } from "@/components/CanalContato";

export const metadata: Metadata = { alternates: { canonical: "/trocas" }, title: "Trocas, devoluções e reembolso | Fernando Blocos", description: "Seus direitos de troca, devolução e reembolso nas compras da Fernando Blocos." };

export default function Trocas() {
  return (
    <Legal titulo="Trocas, devoluções e reembolso" resumo="Seguimos o Código de Defesa do Consumidor. Se algo chegar errado ou com defeito, ou se você desistir de uma compra feita à distância dentro do prazo, fale com a gente pelo WhatsApp.">
      <h2>1. Confira na entrega</h2>
      <p>Na hora do recebimento, confira a quantidade, as medidas e o estado dos blocos. Se houver diferença ou peças danificadas no transporte, avise o motorista e a nossa equipe na hora, de preferência com fotos.</p>

      <h2>2. Direito de arrependimento (7 dias)</h2>
      <p>Compras combinadas fora da loja, como pelo WhatsApp ou por telefone, podem ser canceladas em até <strong>7 dias corridos a partir do recebimento</strong>, sem precisar justificar (art. 49 do Código de Defesa do Consumidor). Nesse caso, devolvemos os valores pagos, incluindo o frete de entrega. A forma de recolher o material é combinada com você.</p>

      <h2>3. Produto com defeito</h2>
      <p>Blocos são produtos duráveis. Você tem <strong>90 dias</strong> para reclamar de defeitos aparentes, contados da entrega. Para defeitos ocultos, os 90 dias contam a partir de quando o defeito aparecer (art. 26 do CDC). Se o problema não for resolvido em até 30 dias, você pode escolher entre a troca por produto igual, o reembolso do valor pago ou um abatimento proporcional no preço (art. 18 do CDC).</p>

      <h2>4. Pedido errado</h2>
      <p>Se entregarmos uma medida ou quantidade diferente da combinada, a correção é por nossa conta.</p>

      <h2>5. Como é feito o reembolso</h2>
      <p>Pela mesma forma de pagamento usada na compra ou por outra que você preferir e combinar com a gente, com os valores corrigidos.</p>

      <h2>6. Como pedir</h2>
      <p>Fale com a gente por um destes canais, informando o seu nome, a data da entrega e, se possível, fotos do problema:</p>
      <CanalContato />
      <p>Veja também os <Link href="/termos">Termos de Uso</Link> e a <Link href="/privacidade">Política de Privacidade</Link>.</p>
    </Legal>
  );
}

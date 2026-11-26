import type { Metadata } from "next";
import Link from "next/link";
import Legal from "@/components/Legal";
import { CanalContato, Identificacao } from "@/components/CanalContato";

export const metadata: Metadata = { alternates: { canonical: "/privacidade" }, title: "Política de Privacidade | Fernando Blocos", description: "Como a Fernando Blocos trata seus dados pessoais, conforme a LGPD." };

export default function Privacidade() {
  return (
    <Legal titulo="Política de Privacidade" resumo="Em poucas palavras: este site não tem cadastro, não usa cookies de rastreamento e não guarda seus dados em servidor. O que você preenche no orçamento vai direto para o nosso WhatsApp, e usamos só para responder o seu pedido.">
      <h2>1. Quem cuida dos seus dados</h2>
      <p>O controlador dos dados pessoais tratados neste site é <Identificacao />. Para qualquer assunto sobre seus dados, fale com a gente pelos canais abaixo:</p>
      <CanalContato />

      <h2>2. Quais dados coletamos e por quê</h2>
      <p>Pedimos só o necessário para fazer o seu orçamento e a entrega, conforme a Lei Geral de Proteção de Dados (Lei 13.709/2018, a LGPD):</p>
      <table>
        <thead><tr><th>Dado</th><th>Para quê</th></tr></thead>
        <tbody>
          <tr><td>Nome</td><td>Saber com quem estamos falando.</td></tr>
          <tr><td>Telefone</td><td>Responder o orçamento e combinar a entrega.</td></tr>
          <tr><td>Endereço de entrega</td><td>Calcular frete e prazo e fazer a entrega.</td></tr>
          <tr><td>Email (opcional)</td><td>Enviar o orçamento por email, se você preferir.</td></tr>
          <tr><td>Observações (opcional)</td><td>Entender detalhes da sua obra ou dúvidas.</td></tr>
          <tr><td>Blocos e quantidades</td><td>Montar o orçamento.</td></tr>
        </tbody>
      </table>
      <p>A base legal é a execução de procedimentos preliminares a um contrato, a seu pedido (art. 7º, V, da LGPD). Depois da compra, alguns dados também são mantidos para cumprir obrigações legais, como as fiscais (art. 7º, II). Não pedimos CPF, documentos nem dados sensíveis pelo site.</p>

      <h2>3. Como os dados chegam até nós</h2>
      <p>O formulário do orçamento <strong>não envia nada para um servidor nosso</strong>. Ao tocar em “Enviar pelo WhatsApp”, o seu próprio aparelho monta a mensagem e abre o WhatsApp. É você quem confirma o envio. A partir daí, a conversa segue as regras do WhatsApp (Meta), que tem a própria política de privacidade.</p>

      <h2>4. Cookies e armazenamento no navegador</h2>
      <p>Este site <strong>não usa cookies</strong>, nem ferramentas de análise, publicidade ou rastreamento (como Google Analytics ou Pixel do Facebook). Usamos apenas o armazenamento local do seu navegador (localStorage) para duas coisas estritamente necessárias:</p>
      <ul>
        <li>guardar os blocos do seu orçamento enquanto você navega;</li>
        <li>lembrar que você já viu o aviso de privacidade.</li>
      </ul>
      <p>Isso fica só no seu aparelho. Você pode apagar a qualquer momento em “Esvaziar orçamento” ou limpando os dados do site nas configurações do navegador.</p>

      <h2>5. Com quem compartilhamos</h2>
      <p>Não vendemos nem alugamos dados pessoais. Eles só são usados pela nossa equipe de atendimento e entrega. O site fica hospedado na Vercel Inc., nos Estados Unidos. Como todo serviço de hospedagem, ela pode registrar dados técnicos de acesso, como endereço IP e tipo de navegador, para segurança e funcionamento do site.</p>

      <h2>6. Por quanto tempo guardamos</h2>
      <p>Pelo tempo necessário para responder o orçamento e concluir a venda e a entrega, e depois pelo prazo que a lei exigir (por exemplo, documentos fiscais). Quando não forem mais necessários, os dados são apagados.</p>

      <h2>7. Seus direitos</h2>
      <p>Pela LGPD (art. 18), você pode pedir a qualquer momento:</p>
      <ul>
        <li>confirmação de que tratamos seus dados e acesso a eles;</li>
        <li>correção de dados incompletos ou errados;</li>
        <li>exclusão dos dados que não precisamos manter por lei;</li>
        <li>informação sobre com quem compartilhamos;</li>
        <li>revisão ou revogação do seu consentimento, quando for o caso.</li>
      </ul>
      <p>Basta pedir por um dos canais do item 1. Se não ficar satisfeito com a resposta, você também pode procurar a Autoridade Nacional de Proteção de Dados (ANPD), em <a href="https://www.gov.br/anpd" target="_blank" rel="noopener noreferrer">gov.br/anpd</a>.</p>

      <h2>8. Segurança</h2>
      <p>O site usa conexão segura (HTTPS). Como os dados do orçamento não ficam guardados em servidor nosso, o site não acumula uma base de dados de clientes. Nas conversas, só a equipe de atendimento tem acesso.</p>

      <h2>9. Mudanças nesta política</h2>
      <p>Se mudarmos a forma de tratar seus dados, atualizamos esta página e a data no topo. Veja também os <Link href="/termos">Termos de Uso</Link> e a política de <Link href="/trocas">Trocas, devoluções e reembolso</Link>.</p>
    </Legal>
  );
}

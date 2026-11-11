"use client";
import { abrirOrcamento } from "@/lib/orcamento";

export default function AbrirOrcamento({ className = "btn ghost", children }: { className?: string; children: React.ReactNode }) {
  return <button type="button" className={className} onClick={abrirOrcamento}>{children}</button>;
}

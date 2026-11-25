"use client";
// Xícara da Fernando Blocos: entra balançando, flutua com vapor subindo e "brinda" no hover.
import Image from "next/image";
import { motion, MotionConfig } from "framer-motion";

export default function Xicara() {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div className="xicara-wrap" aria-hidden={false}
        initial={{ opacity: 0, y: 40, rotate: -18 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: true, margin: "-40px" }}
        transition={{ type: "spring", stiffness: 160, damping: 11, delay: 0.15 }}>
        <svg className="vapor" viewBox="0 0 60 50" aria-hidden>
          {[12, 30, 48].map((x, i) => (
            <path key={x} d={`M${x} 48 q-6 -8 0 -16 q6 -8 0 -16 q-6 -8 0 -14`} style={{ animationDelay: `${i * 0.7}s` }} />
          ))}
        </svg>
        <motion.div className="xicara-boia" whileHover={{ rotate: -14, scale: 1.06 }} whileTap={{ rotate: -14, scale: 1.06 }}
          transition={{ type: "spring", stiffness: 300, damping: 12 }}>
          <Image src="/fotos/xicara.webp" alt="Xícara da Fernando Blocos, desde 1988" width={522} height={478} className="xicara" />
        </motion.div>
      </motion.div>
    </MotionConfig>
  );
}

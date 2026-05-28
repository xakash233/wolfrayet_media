"use client";

import { motion } from "framer-motion";

const DEFAULT_MAP_URL =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL ??
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.0!2d78.1821!3d26.2183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDEzJzA1LjkiTiA3OMKwMTAnNTUuNiJF!5e0!3m2!1sen!2sin!4v1";

export function GoogleMap() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="overflow-hidden rounded-2xl border border-border"
    >
      <iframe
        src={DEFAULT_MAP_URL}
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Wolfrayet Media office location"
        className="w-full"
      />
    </motion.div>
  );
}

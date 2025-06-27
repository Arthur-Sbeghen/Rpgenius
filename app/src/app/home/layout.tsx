"use client";
import "./style.css";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.4 }}
        className="home-layout"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

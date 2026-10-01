"use client";

import { motion } from "framer-motion";
import { CheckCircle2, MessageCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface CheckoutSuccessViewProps {
  onClose: () => void;
}

export function CheckoutSuccessView({ onClose }: CheckoutSuccessViewProps) {
  const handleOpenWhatsApp = () => {
    window.open(
      "https://wa.me/6281234567890?text=Halo%20monis.rent,%20saya%20sudah%20memilih%20setup%20workspace%20impian%20saya%20di%20Bali!",
      "_blank"
    );
  };

  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col items-center text-center gap-4 py-6"
    >
      <div className="relative">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 shadow-inner"
        >
          <CheckCircle2 className="w-12 h-12" />
        </motion.div>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-2xl font-bold text-slate-900">
          Workspace Siap Diantar! 🎉
        </h3>
        <p className="text-sm text-slate-500 max-w-sm">
          Setup pesananmu telah tercatat. Tim monis.rent akan segera menyiapkan dan mengantar furniture ke vilamu di Bali.
        </p>
      </div>

      <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full text-xs font-medium text-slate-600">
        <MapPin className="w-3.5 h-3.5 text-teal-600" />
        <span>Gratis Antar & Instalasi Area Canggu, Seminyak, & Ubud</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full mt-3">
        <Button
          variant="primary"
          onClick={handleOpenWhatsApp}
          className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Konfirmasi via WhatsApp</span>
        </Button>
        <Button variant="secondary" onClick={onClose} className="px-6">
          Selesai
        </Button>
      </div>
    </motion.div>
  );
}

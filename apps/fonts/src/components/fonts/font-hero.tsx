"use client";

import { useRouter } from "next/navigation";
import { Button } from "@dalim/core/ui/button";
import { Upload } from "lucide-react";
import { motion } from "framer-motion";

export function FontsHero() {
  const router = useRouter();

  return (
    <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 dark:from-primary/20 dark:via-primary/10 dark:to-primary/20">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Font Management System
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-xl text-muted-foreground mb-8"
          >
            Upload, preview, and download high-quality fonts for your projects
          </motion.p>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Button 
              size="lg" 
              onClick={() => router.push("/fonts/upload")}
              className="group"
            >
              <Upload className="mr-2 h-4 w-4 transition-transform group-hover:-translate-y-1" />
              Upload New Font
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
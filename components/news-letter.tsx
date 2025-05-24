"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Gift, Sparkles } from "lucide-react";
import { toast } from "sonner";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      //   toast({
      //     title: "Welcome to StyleHub! 🎉",
      //     description:
      //       "You've been subscribed to our newsletter. Check your email for a welcome gift!",
      //   });
      toast("hello", {
        description:
          "You have been subscribed to our newsletter. Check your email for a welcome gift!",
      });
      setEmail("");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <Mail className="h-12 w-12 text-primary" />
                <Sparkles className="h-6 w-6 text-yellow-500 absolute -top-2 -right-2 animate-pulse" />
              </div>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Stay in <span className="text-primary">Style</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join our fashion community and be the first to know about new
              arrivals, exclusive offers, and style tips
            </p>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex items-center justify-center md:justify-start"
              >
                <Gift className="h-6 w-6 text-primary mr-3" />
                <span className="font-medium">15% off your first order</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="flex items-center justify-center md:justify-start"
              >
                <Sparkles className="h-6 w-6 text-primary mr-3" />
                <span className="font-medium">Exclusive early access</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex items-center justify-center md:justify-start"
              >
                <Mail className="h-6 w-6 text-primary mr-3" />
                <span className="font-medium">Weekly style inspiration</span>
              </motion.div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 px-6 rounded-full border-border/40 focus-visible:ring-primary"
              required
            />
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="h-12 px-8 rounded-full font-semibold transform hover:scale-105 transition-all duration-300"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Subscribing...
                </div>
              ) : (
                "Subscribe Now"
              )}
            </Button>
          </motion.form>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-sm text-muted-foreground mt-4"
          >
            No spam, unsubscribe at any time. We respect your privacy.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

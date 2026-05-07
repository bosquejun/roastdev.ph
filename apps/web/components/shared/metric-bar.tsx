"use client";

import { motion } from "motion/react";

interface MetricBarProps {
  label: string;
  score: number;
  colorClass: string;
  shadowClass: string;
}

export function MetricBar({ label, score, colorClass, shadowClass }: MetricBarProps) {
  const scoreColor =
    score < 30
      ? "text-accent-danger"
      : score < 60
        ? "text-accent-warning"
        : "text-accent-success";

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm font-medium">
        <span>{label}</span>
        <span className={scoreColor}>{score}/100</span>
      </div>
      <div className="h-3 w-full bg-background border border-border">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full ${colorClass} ${shadowClass}`}
        />
      </div>
    </div>
  );
}
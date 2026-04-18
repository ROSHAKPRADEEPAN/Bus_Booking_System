import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "light" | "dark";
  hoverEffect?: boolean;
  children: React.ReactNode;
}

const GlassCard = ({
  variant = "light",
  hoverEffect = false,
  className,
  children,
  ...props
}: GlassCardProps) => {
  const baseClass = variant === "dark"
    ? "dark-glass"
    : "glass-card";

  const hoverClass = hoverEffect ? "animate-hover" : "";

  return (
    <div
      className={cn(
        baseClass,
        hoverClass,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;

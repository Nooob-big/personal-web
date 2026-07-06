import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-sm border-2 border-comic-ink px-3 py-1 text-xs font-black uppercase leading-none shadow-[2px_2px_0_#000]",
  {
    variants: {
      variant: {
        default: "bg-comic-yellow text-comic-ink",
        red: "bg-comic-red text-white",
        blue: "bg-comic-blue text-white",
        green: "bg-comic-green text-white",
        yellow: "bg-comic-yellow text-comic-ink",
        paper: "bg-comic-paper text-comic-ink",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }

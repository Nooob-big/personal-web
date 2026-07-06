import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm border-4 border-comic-ink text-sm font-black uppercase transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-comic-yellow disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-comic-yellow text-comic-ink shadow-comicSm hover:-translate-y-1 hover:shadow-comic active:translate-y-0 active:shadow-none",
        red:
          "bg-comic-red text-white shadow-comicSm hover:-translate-y-1 hover:shadow-comicBlue active:translate-y-0 active:shadow-none",
        blue:
          "bg-comic-blue text-white shadow-comicSm hover:-translate-y-1 hover:shadow-comicRed active:translate-y-0 active:shadow-none",
        outline:
          "bg-comic-paper text-comic-ink shadow-comicSm hover:bg-comic-green hover:text-white active:translate-y-0 active:shadow-none",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 px-4",
        lg: "h-12 px-6 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }

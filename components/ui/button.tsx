import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center bg-clip-padding text-sm font-bold uppercase tracking-tight transition-all outline-none select-none disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] transition-all duration-300 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-black shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.02]",
        outline:
          "border border-border bg-background hover:bg-muted text-foreground",
        secondary:
          "bg-secondary text-black shadow-lg shadow-secondary/20 hover:scale-[1.02]",
        ghost:
          "hover:bg-muted text-foreground",
        destructive:
          "bg-destructive text-white shadow-lg shadow-destructive/20 hover:scale-[1.02]",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-12 px-8 rounded-2xl",
        xs: "h-8 px-4 text-xs rounded-xl",
        sm: "h-10 px-6 text-sm rounded-xl",
        lg: "h-14 px-10 text-lg rounded-[1.8rem]",
        icon: "size-12 rounded-2xl",
        "icon-xs":
          "size-8 rounded-xl",
        "icon-sm":
          "size-10 rounded-xl",
        "icon-lg": "size-14 rounded-[1.8rem]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-12 w-full min-w-0 border border-border bg-muted/30 px-6 py-2 text-base transition-all focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none placeholder:text-muted-foreground/40 font-bold tracking-tight rounded-2xl disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Input }

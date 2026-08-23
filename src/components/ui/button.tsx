import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "group/button inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-transparent text-sm font-medium transition-all duration-200 outline-none select-none focus-visible:ring-2 focus-visible:ring-ring/40 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/30 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground shadow-sm shadow-primary/15 hover:bg-primary/90 hover:shadow-md",
                outline:
                    "border-border/80 bg-background/80 text-foreground shadow-sm hover:border-border hover:bg-muted/70",
                secondary: "bg-muted text-foreground shadow-sm hover:bg-muted/80",
                ghost: "text-foreground hover:bg-muted/70 hover:text-foreground",
                destructive:
                    "bg-destructive/10 text-destructive shadow-sm hover:bg-destructive/15 focus-visible:ring-destructive/20 dark:bg-destructive/15 dark:hover:bg-destructive/20",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-10 px-4",
                xs: "h-8 rounded-lg px-2.5 text-xs",
                sm: "h-9 rounded-lg px-3 text-sm",
                lg: "h-11 px-5 text-sm",
                icon: "size-10",
                "icon-xs": "size-8 rounded-lg",
                "icon-sm": "size-9 rounded-lg",
                "icon-lg": "size-12",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

function Button({
    className,
    variant = "default",
    size = "default",
    asChild = false,
    ...props
}: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
    }) {
    const Comp = asChild ? Slot.Root : "button";

    return (
        <Comp
            data-slot="button"
            data-variant={variant}
            data-size={size}
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    );
}

export { Button, buttonVariants };

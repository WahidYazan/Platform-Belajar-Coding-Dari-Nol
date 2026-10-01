import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "group/button inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md border-2 border-black font-bold tracking-wide transition-all outline-none select-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive shadow-[3px_3px_0px_0px_#000000] hover:shadow-[5px_5px_0px_0px_#000000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#000000] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    {
        variants: {
            variant: {
                default: "bg-primary text-black hover:bg-primary/95",
                outline: "border-2 border-black bg-white text-black hover:bg-secondary",
                secondary: "bg-secondary text-black hover:bg-secondary/90",
                ghost: "border-transparent shadow-none hover:border-black hover:shadow-[3px_3px_0px_0px_#000000] hover:bg-secondary text-foreground",
                destructive: "bg-destructive text-white hover:bg-destructive/90",
                link: "text-primary underline-offset-4 hover:underline shadow-none border-transparent hover:shadow-none hover:translate-x-0 hover:translate-y-0",
            },
            size: {
                default: "h-11 px-5 text-sm",
                xs: "h-8 rounded px-2.5 text-xs shadow-[2px_2px_0px_0px_#000000] hover:shadow-[3px_3px_0px_0px_#000000]",
                sm: "h-9 rounded px-3 text-sm shadow-[2px_2px_0px_0px_#000000] hover:shadow-[3px_3px_0px_0px_#000000]",
                lg: "h-12 rounded-lg px-7 text-base shadow-[4px_4px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#000000]",
                icon: "size-10",
                "icon-xs": "size-8 rounded shadow-[2px_2px_0px_0px_#000000]",
                "icon-sm": "size-9 rounded shadow-[2px_2px_0px_0px_#000000]",
                "icon-lg": "size-12 shadow-[4px_4px_0px_0px_#000000]",
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

import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
    return (
        <input
            type={type}
            data-slot="input"
            className={cn(
                "h-11 w-full min-w-0 rounded-lg border-2 border-black bg-white px-3.5 py-2 text-sm font-medium shadow-[2px_2px_0px_0px_#000000] transition-all placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:shadow-[4px_4px_0px_0px_#000000] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive",
                className,
            )}
            {...props}
        />
    );
}

export { Input };

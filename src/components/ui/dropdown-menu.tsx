"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { Check, ChevronRight, Circle } from "lucide-react";
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import * as React from "react";

import { cn } from "@/lib/utils";

function DropdownMenu({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
    return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuPortal({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
    return <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />;
}

function DropdownMenuTrigger({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
    return <DropdownMenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />;
}

function DropdownMenuContent({
    className,
    sideOffset = 4,
    ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
    return (
        <DropdownMenuPrimitive.Portal>
            <DropdownMenuPrimitive.Content
                data-slot="dropdown-menu-content"
                sideOffset={sideOffset}
                className={cn(
                    "z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] overflow-x-hidden overflow-y-auto rounded-xl border border-border/70 bg-popover/90 p-1 text-popover-foreground shadow-md shadow-slate-900/10 backdrop-blur supports-[backdrop-filter]:bg-popover/80",
                    "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
                    "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
                    "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                    className,
                )}
                {...props}
            />
        </DropdownMenuPrimitive.Portal>
    );
}

const dropdownMenuItemVariants = cva(
    "group/menu-item relative flex cursor-pointer select-none items-center gap-2 rounded-lg px-2 py-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 data-[slot=menu-indicator]:py-1 data-inset:pl-8 [&_svg:not([class*=\'size-\')]:size-4 [&_svg]:shrink-0 [&_svg]:pointer-events-none",
    {
        variants: {
            variant: {
                default: "text-foreground",
                destructive:
                    "text-destructive focus:bg-destructive/10 focus:text-destructive data-[highlighted]:bg-destructive/10 data-[highlighted]:text-destructive dark:focus:bg-destructive/15 dark:data-[highlighted]:bg-destructive/15",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
);

function DropdownMenuItem({
    className,
    variant,
    inset,
    ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> &
    VariantProps<typeof dropdownMenuItemVariants> & {
        inset?: boolean;
    }) {
    return (
        <DropdownMenuPrimitive.Item
            data-slot="dropdown-menu-item"
            data-inset={inset}
            className={cn(dropdownMenuItemVariants({ variant }), className)}
            {...props}
        />
    );
}

function DropdownMenuCheckboxItem({
    className,
    children,
    checked,
    ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
    return (
        <DropdownMenuPrimitive.CheckboxItem
            data-slot="dropdown-menu-checkbox-item"
            className={cn(
                "group relative flex cursor-pointer select-none items-center gap-2 rounded-lg py-1.5 pr-2 pl-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg:not([class*=\'size-\')]:size-4 [&_svg]:shrink-0 [&_svg]:pointer-events-none",
                className,
            )}
            checked={checked}
            {...props}
        >
            <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center rounded-md border border-border transition-all group-data-checked:bg-primary group-data-checked:text-primary-foreground group-data-checked:border-primary">
                <Check className="size-3.5 opacity-0 group-data-checked:opacity-100" />
            </span>
            {children}
        </DropdownMenuPrimitive.CheckboxItem>
    );
}

function DropdownMenuRadioGroup({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
    return <DropdownMenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />;
}

function DropdownMenuRadioItem({
    className,
    children,
    ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
    return (
        <DropdownMenuPrimitive.RadioItem
            data-slot="dropdown-menu-radio-item"
            className={cn(
                "group relative flex cursor-pointer select-none items-center gap-2 rounded-lg py-1.5 pr-2 pl-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg:not([class*=\'size-\')]:size-4 [&_svg]:shrink-0 [&_svg]:pointer-events-none",
                className,
            )}
            {...props}
        >
            <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
                <Circle className="size-2 fill-current opacity-0 transition-opacity group-data-checked:opacity-100" />
            </span>
            {children}
        </DropdownMenuPrimitive.RadioItem>
    );
}

function DropdownMenuLabel({
    className,
    inset,
    ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
}) {
    return (
        <DropdownMenuPrimitive.Label
            data-slot="dropdown-menu-label"
            data-inset={inset}
            className={cn("px-2 py-1.5 text-sm font-semibold data-inset:pl-8", className)}
            {...props}
        />
    );
}

function DropdownMenuSeparator({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
    return (
        <DropdownMenuPrimitive.Separator
            data-slot="dropdown-menu-separator"
            className={cn("-mx-1 my-1 h-px bg-border/70", className)}
            {...props}
        />
    );
}

function DropdownMenuShortcut({ className, ...props }: React.ComponentProps<"span">) {
    return (
        <span
            data-slot="dropdown-menu-shortcut"
            className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}
            {...props}
        />
    );
}

function DropdownMenuGroup({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
    return <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />;
}

function DropdownMenuSub({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
    return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />;
}

function DropdownMenuSubTrigger({
    className,
    inset,
    children,
    ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
}) {
    return (
        <DropdownMenuPrimitive.SubTrigger
            data-slot="dropdown-menu-sub-trigger"
            data-inset={inset}
            className={cn(
                "group/menu-item relative flex cursor-pointer select-none items-center gap-2 rounded-lg px-2 py-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 data-open:bg-accent data-open:text-accent-foreground data-inset:pl-8 [&_svg:not([class*=\'size-\')]:size-4 [&_svg]:shrink-0 [&_svg]:pointer-events-none",
                className,
            )}
            {...props}
        >
            {children}
            <ChevronRight className="ml-auto" />
        </DropdownMenuPrimitive.SubTrigger>
    );
}

function DropdownMenuSubContent({
    className,
    ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
    return (
        <DropdownMenuPrimitive.SubContent
            data-slot="dropdown-menu-sub-content"
            className={cn(
                "z-50 min-w-[8rem] overflow-hidden rounded-xl border border-border/70 bg-popover/90 p-1 text-popover-foreground shadow-lg shadow-slate-900/10 backdrop-blur supports-[backdrop-filter]:bg-popover/80",
                "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
                "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
                "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                className,
            )}
            {...props}
        />
    );
}

export {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    dropdownMenuItemVariants,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
};

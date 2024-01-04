"use client";

import * as React from "react";
import { ChevronDown, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export function PageSizeDropdown({
  currentPage,
  perPage,
  sizes = [5, 10, 15],
}: {
  currentPage: number;
  perPage: number;
  sizes?: number[];
}) {
  const { setTheme } = useTheme();
  const router = useRouter();
  const pathName = usePathname();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          {/* <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span> */}
          {perPage}
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {sizes.map((size) => (
          <DropdownMenuItem
            key={size}
            onClick={(e) => {
              e.preventDefault();
              router.push(`${pathName}/?page=${currentPage}&perPage=${size}`);
            }}
          >
            {size}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useMountedTheme } from "@/hooks/use-mounted-theme"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { setTheme, theme, mounted, isDark, dashboardDarkColors, darkThemeColors } = useMountedTheme()

  if (!mounted) {
    return <Button variant="ghost" size="icon" className="rounded-full w-9 h-9"></Button>
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full border border-gray-700 dark:border-transparent mx-5 ">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-slate-400 hover:text-gray-900 dark:text-white" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 dark:text-purple-300" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={isDark ? "bg-gray-900 border-gray-800" : ""}>
        <DropdownMenuItem onClick={() => setTheme("light")}
          className={isDark ? "text-slate-300 hover:text-white hover:bg-gray-800" : ""}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}
          className={isDark ? "text-slate-300 hover:text-white hover:bg-gray-800" : ""}>
          <span className={isDark ? `bg-gradient-to-r ${darkThemeColors.dashboard.primary} text-transparent bg-clip-text` : ""}>
            Dark
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}
          className={isDark ? "text-slate-300 hover:text-white hover:bg-gray-800" : ""}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

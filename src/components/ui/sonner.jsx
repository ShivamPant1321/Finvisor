"use client"

import { useMountedTheme } from "@/hooks/use-mounted-theme"
import { Toaster as Sonner } from "sonner"

const Toaster = ({
  ...props
}) => {
  const { theme = "system", isDark, dashboardDarkColors } = useMountedTheme()

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            `group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg ${isDark ? 'dark:group-[.toaster]:bg-gray-900 dark:group-[.toaster]:border-gray-800' : ''}`,
          description: `group-[.toast]:text-muted-foreground ${isDark ? 'dark:group-[.toast]:text-gray-300' : ''}`,
          actionButton:
            `group-[.toast]:bg-primary group-[.toast]:text-primary-foreground ${isDark ? 'dark:group-[.toast]:bg-blue-600' : ''}`,
          cancelButton:
            `group-[.toast]:bg-muted group-[.toast]:text-muted-foreground ${isDark ? 'dark:group-[.toast]:bg-gray-800 dark:group-[.toast]:text-gray-300' : ''}`,
        },
      }}
      {...props}
    />
  )
}

export { Toaster }

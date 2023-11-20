"use client";
import { ThemeProvider } from "next-themes";
import { useState, useEffect } from "react";
type ChildrenType = {
  children: React.ReactNode;
};
export default function Providers2({ children }: ChildrenType) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}

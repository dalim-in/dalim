"use client";

import { Suspense } from "react";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./theme-provider";
import { TooltipProvider } from "@dalim/core/ui/tooltip"; 
import { Loader } from "lucide-react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <TooltipProvider>
            <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange>
              <Suspense
                fallback={
                  <div className="flex mt-[400px] justify-center h-screen">
                    <Loader strokeWidth={0.5} className="w-10 h-10 animate-spin" />
                  </div>
                }
              >
                {children} 
              </Suspense>
            </ThemeProvider>
          </TooltipProvider>
        </SessionProvider>
      </QueryClientProvider>
    </>
  );
};

export default Providers;

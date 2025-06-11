"use client";


import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./theme-provider";
import { TooltipProvider } from "@dalim/core/ui/tooltip";  
import { FontPreviewProvider } from "@dalim/core/hooks/use-font-preview";


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
               <FontPreviewProvider>
                {children}  
                </FontPreviewProvider>
            </ThemeProvider>
          </TooltipProvider>
        </SessionProvider>
      </QueryClientProvider> 
    </>
  );
};

export default Providers;

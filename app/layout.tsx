import './globals.css'
import { Metadata } from "next"; //C:\Users\Dell\Desktop\insight-client-main\globals.css
import { Providers } from "./GlobalRedux/provider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "Insight-Client",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <div className="container mx-auto md:px-32 h-screen">
          <TooltipProvider>
            <Providers>
              <main>{children}</main>
            </Providers>
          </TooltipProvider>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;

"use client";

import "./globals.css";
import { useState, useEffect } from "react";
import { Metadata } from "next";
import { Providers } from "./GlobalRedux/provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import Nav from "@/components/Nav/Nav";
import { db } from "@/modules/filebase";
import loader from "@/public/loading.png";
import { auth11 } from "@/modules/fileauth";
import Providers2 from "./providers";
import { ModeToggle } from "./ThemeSwitcher";
import PeopleUMayKnow from "@/components/PeopleUMayKnow";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const [firebase, setFirebase] = useState(false);
  const [open,setOpen] = useState(false)

  useEffect(() => {
    if (auth11) {
      setTimeout(() => setFirebase(true), 500);
    }
  }, []);

  return (
    <html lang="en">
      <title>Insight-client</title>
      <body className="body">
        <Providers2>
          <div className="container mx-auto md:px-32 h-screen">
            <TooltipProvider>
              <Providers>
                {!firebase && (
                  <>
                    <div className="h-[100vh] flex justify-center items-center">
                      <img
                        className="animate-spin text-center"
                        src={loader.src}
                        alt="spinner-frame-8"
                      />
                    </div>
                  </>
                )}
                {firebase && (
                  <>
                     <PeopleUMayKnow />
                    <ModeToggle />
                    <Nav />
                    <main>{children}</main>
                  </>
                )}
              </Providers>
            </TooltipProvider>
          </div>
        </Providers2>
      </body>
    </html>
  );
};

export default RootLayout;

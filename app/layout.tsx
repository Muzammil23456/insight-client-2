"use client";

import "./globals.css";
import { useState, useEffect } from "react";
import { Metadata } from "next"; 
import { Providers } from "./GlobalRedux/provider";
import {
  TooltipProvider,
} from "@/components/ui/tooltip";
import Nav from "@/components/Nav/Nav";
import { db } from "@/modules/filebase";
import loader from "@/public/loading.png";

export const metadata: Metadata = {
  title: "Insight-Client",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const [firebase, setFirebase] = useState(false);

  useEffect(() => {
    if (db) {
      setTimeout(() => setFirebase(true), 1000);
    }
  }, []);

  return (
    <html lang="en">
      <body>
        <div className="container mx-auto md:px-32 h-screen">
          <TooltipProvider>
            <Providers>
              {!firebase && (
                <div className="h-[100vh] flex justify-center items-center">
                  <img
                    className="animate-spin text-center"
                    src={loader.src}
                    alt="spinner-frame-8"
                  />
                </div>
              )}
              {firebase && (
                <>
                  <Nav />
                  <main>{children}</main>
                </>
              )}
            </Providers>
          </TooltipProvider>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;

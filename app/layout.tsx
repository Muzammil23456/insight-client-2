import { title } from "process";
import "./globals.css";
import { Metadata } from "next";
import { Providers } from './GlobalRedux/provider';

export const metadata: Metadata = {
  title: "Stepper",
};

const RootLayout = ({ children  }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <div className="container mx-auto md:px-32 h-screen">
        <Providers>
          <main>{children}</main>
        </Providers>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;

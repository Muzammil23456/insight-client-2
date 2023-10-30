import "../globals.css";
import { Metadata } from "next";
import { Providers } from "@/app/GlobalRedux/provider";

export const metadata: Metadata = {
  title: "Insight-Client-Profile",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Providers>{children}</Providers>
    </>
  );
};

export default RootLayout;

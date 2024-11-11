import StreamVideoProvider from "@/providers/StreamClientProvider";
import React from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return <StreamVideoProvider>{children}</StreamVideoProvider>;
};

export default HomeLayout;

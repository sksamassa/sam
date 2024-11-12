import "@stream-io/video-react-sdk/dist/css/styles.css";
// ideally, Stream Video theme should be imported before your own styles
// as this would make it easier for you to override certain video-theme rules
import { ReactNode } from "react";
import StreamVideoProvider from "@/providers/StreamClientProvider";

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  );
};

export default RootLayout;

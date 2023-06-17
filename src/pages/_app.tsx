import { SidebarProvider } from "@/context/SidebarContext";
import { AuthFirebaseProvider } from "@/context/AuthFirebaseContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthFirebaseProvider>
      <SidebarProvider>
        <Component {...pageProps} />
      </SidebarProvider>
    </AuthFirebaseProvider>
  );
}

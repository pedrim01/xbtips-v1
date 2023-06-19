import Head from "next/head";

import Image from "next/image";
import router from "next/router";
import { ReactNode } from "react";
import load from "../../public/images/load.gif";
import useAuthFirebase from "../hook/useAuthFirebase";

export default function ForceAuthentication({ children }: { children: ReactNode }) {
  const { user, loading } = useAuthFirebase();

  function renderContent() {
    return (
      <>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              if (!document.cookie?.includes("admin-template-xbtips-auth"))
              {
                window.location.href = "/login"  
            }`,
            }}
          />
        </Head>

        {children}
      </>
    );
  }

  function renderLoading() {
    return (
      <div
        className={`
          flex h-screen items-center justify-center`}
      >
        <Image src={load} alt="Loading..." />
      </div>
    );
  }

  if (!loading && user?.email) {
    return renderContent();
  } else if (loading) {
    return renderLoading();
  } else {
    router.push("/login");

    return null;
  }
}

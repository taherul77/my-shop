import Layout from "@/components/main/Layout/Layout";
import Navbar from "@/components/shared/Navbar";
import { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <Layout>
      <Navbar />
      {children}
    </Layout>
  );
}

export default layout;

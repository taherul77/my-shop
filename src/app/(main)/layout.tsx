
import Layout from "@/components/main/Layout/Layout";
import { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <Layout>{children}</Layout>
  )
}

export default layout;

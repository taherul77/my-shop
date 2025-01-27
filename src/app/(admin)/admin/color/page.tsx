import ColorComponent from "@/components/Admin/Color/ColorComponent";
import React from "react";
import { prisma } from "../../../../../prisma/client";

const ColorPage = async () => {
  const data = await prisma.color.findMany();

  return (
    <div>
      <ColorComponent data={data} />
    </div>
  );
};

export default ColorPage;
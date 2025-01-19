
import { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return <div className="bg-backgroundColor">
  
    {children}

  </div>;
}

export default layout;

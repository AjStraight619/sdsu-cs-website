import { retail } from "googleapis/build/src/apis/retail";
import { ReactNode } from "react";

export default function FileName({ children }: { children: ReactNode }) {
  return <h4 className="text-lg font-medium">{children}</h4>;
}

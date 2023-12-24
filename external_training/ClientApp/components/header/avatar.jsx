import { clsx } from "clsx";
import {useState} from "react";

export default function Avatar({ children, className }) {
  return (
    <div
      className={clsx(
        className,
        "flex items-center justify-center h-[50px] w-[50px] rounded-full bg-[#FFEDCF] border border-[#F59D0E] hover:drop-shadow-md transition-colors",
      )}
    >
      {children}
    </div>
  );
}

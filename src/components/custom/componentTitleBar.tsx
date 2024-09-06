import React, { ReactNode } from "react";

type props = {
  title?: string;
  suffix?: ReactNode;
};

export const ComponentTitleBar = ({ title = "", suffix = "" }: props) => {
  return (
    <div className="flex justify-between w-full">
      <label className="text-[var(--primary)] text-[20px] font-semibold">{title}</label>
      <div>{suffix}</div>
    </div>
  );
};

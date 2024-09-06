import React, { MouseEventHandler, PropsWithChildren, useState } from "react";

type props = {
  active: string | null;
  children: any;
  onTabClick: (arg: string) => void;
};
const Tabs = ({ children, active = null, onTabClick = () => {} }: props) => {
  return (
    <div className="w-full h-full">
      <div className="flex border-b border-gray-300">
        {children.map((child: any) => {
          return (
            <button
              key={child.props.value}
              className={`${
                active === child.props.value
                  ? "border-b-2 border-[var(--primary)] text-[var(--primary)]"
                  : "text-[#808080]"
              } flex-1 text-[14px] font-medium py-2 max-w-max mr-10 h-[43px]`}
              onClick={() => {
                onTabClick(child.props.value);
              }}
            >
              {child.props.label}
            </button>
          );
        })}
      </div>
      {children.map((child: any) => {
        if (active && active === child.props.value) {
          return (
            <div
              key={child.props.label}
              {...child.props}
              className={`h-[calc(100%-43px)] ${child.props.className}`}
            >
              {child.props.children}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

const Tab = ({
  children,
}: {
  label: string;
  value: string | number;
  [key: string]: any;
}) => {
  return children;
};
export { Tabs, Tab };

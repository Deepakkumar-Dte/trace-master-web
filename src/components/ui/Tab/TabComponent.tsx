import { useState, ReactNode, FC, memo, useEffect } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

type TabProps = {
  tabs: {
    label: string | ReactNode;
    content?: FC<any>;
    element?: any;
    navigateTo: string;
  }[];
  active: number;
  Suffix?: any;
  onClick?: (label: string) => void;
  onRemove?: (index: number) => void;
};

const Tabs = ({ tabs, active, onClick, Suffix, onRemove }: TabProps) => {
  const [activeTab, setActiveTab] = useState(active);
  const tempActive = activeTab < tabs.length ? activeTab : activeTab - 1;
  const Component = tabs[tempActive]?.content;
  const element = tabs[tempActive].element;
  useEffect(() => {
    setActiveTab((prev) => (prev < tabs.length ? prev : prev - 1));
  }, [tabs.length]);
  return (
    <div className="tabs-component">
      <div className="tabs-header justify-between flex border-b">
        <div>
          {tabs.map((tab: any, index) => (
            <button
              className={`px-4 py-2 mr-2 relative ${
                activeTab === index ? "active" : "tab-button"
              }`}
              onClick={() => {
                setActiveTab(index);
                onClick && onClick(tab.navigateTo);
              }}
            >
              {onRemove && activeTab === index && (
                <span
                  className="absolute top-0 right-0 cursor-pointer z-10 hover:text-[red] "
                  onClick={() => onRemove(index)}
                >
                  <IoMdCloseCircleOutline />
                </span>
              )}
              {tab.label}
            </button>
          ))}
        </div>
        <div className="self-end ml-[30px]">{Suffix}</div>
      </div>
      <div className="tabs-content m-0 p-4">
        {Component && <Component />}
        {element}
      </div>
    </div>
  );
};

export default memo(Tabs);

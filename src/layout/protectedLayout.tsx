"use client";
import dynamic from "next/dynamic";
import { Header, Drawer } from "../components/custom";
import ProcessContextProvider from "@/context/processContext";
import { GlobalContextProvider } from "@/context/globalContext";
import { ReactFlowProvider } from "@xyflow/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function AdminLayout(props: any) {
  return (
    <div
      className=" h-[100vh] w-[100vw]"
      style={{
        background: "#F2F4F2",
      }}
    >
      <GlobalContextProvider>
        <Header />
        <div
          className="scroll-smooth overflow-hidden flex h-[calc(100vh - 80px]"
          style={{ height: "calc(100vh - 80px)" }}
        >
          <div className="drawer-container">
            <Drawer />
          </div>
          <ProcessContextProvider>
            <ReactFlowProvider>
              <DndProvider backend={HTML5Backend}>
                <div className="content-container"> {props.children}</div>
              </DndProvider>
            </ReactFlowProvider>
          </ProcessContextProvider>
        </div>
      </GlobalContextProvider>
    </div>
  );
}
export default AdminLayout;

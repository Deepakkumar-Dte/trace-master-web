import { useEffect } from "react";
import { Header, Drawer } from "../components/custom";
import ProcessContextProvider from "@/context/processContext";
import { GlobalContextProvider } from "@/context/globalContext";

function AdminLayout(props: any) {
  return (
    <div
      className=" h-[100vh] w-[100vw]"
      style={{
        background: "#F2F4F2",
      }}
    >
      <GlobalContextProvider>
        {" "}
        <Header />
        <div
          className="scroll-smooth overflow-hidden flex h-[calc(100vh - 80px]"
          style={{ height: "calc(100vh - 80px)" }}
        >
          <div className="drawer-container">
            <Drawer />
          </div>
          <ProcessContextProvider>
            <div className="content-container"> {props.children}</div>
          </ProcessContextProvider>
        </div>
      </GlobalContextProvider>
    </div>
  );
}
export default AdminLayout;

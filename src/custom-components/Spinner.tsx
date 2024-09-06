import React from "react";

const Spinner = ({ children }: React.ComponentProps<any>) => {
  return <div className="spinner">{children || "Loading"}</div>;
};

export default Spinner;

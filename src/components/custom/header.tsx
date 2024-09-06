import { useTheme } from "next-themes";
import Link from "next/link";
import React from "react";

const Header = () => {
  const { theme, themes, setTheme } = useTheme();
  return (
    <div
      className="h-[80px] flex justify-between bg-[#fff] z-5"
      // onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Link href={"/login"}>Logout</Link>
    </div>
  );
};

export default Header;
// `
// display: flex;
// justify-content:space-between;
// background:#fff;
// border-bottom:2px solid #DDE3ED;
// z-index: 5;`;

import React from "react";
import "./styles.css";
import DashBoardMenu from "./DashBoardMenu";
import DashBoardContent from "./DashBoardContent";
import DashBoardFooter from "./DashBoardFooter";
const DashBoard = () => {
  return (
    <>
      <div className="main_content">
        <DashBoardMenu />
        <DashBoardContent />
      </div>
      <DashBoardFooter />
    </>
  );
};

export default DashBoard;

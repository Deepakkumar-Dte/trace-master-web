import styled from "@emotion/styled";
import HeaderTabs from "./headerTabComponent";
import HeaderUser from "./UserHeader";

const Header = () => {

  return (
    <StyledDiv
      className="px-8 text-primary h-[80px] flex items-center">
      <div className="py-2">
        <img src="/asset/logo.svg" alt="dfv" />
      </div>
      <HeaderUser />
    </StyledDiv>
  );
};

export default Header;
const StyledDiv = styled.div`
display: flex;
justify-content:space-between;
background:#fff;
border-bottom:2px solid #DDE3ED;
z-index: 5;`
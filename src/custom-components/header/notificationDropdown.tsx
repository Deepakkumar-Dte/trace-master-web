import styled from "styled-components";
import { headerpropType } from "../../types";

function NotificationDropdown(props: headerpropType) {
  const GetViewMoreText = () =>
    props.data.unreadNotificationCount ? (
      <div className="flex justify-center">
        <button
          className="my-5 text-sm text-primary cursor-pointer underline"
          onClick={props.viewMore}
        >
          View More
        </button>
      </div>
    ) : (
      <p className="text-center text-[#000] pb-3">{`No Notifications`}</p>
    );
  return (
    <>
      {props.isDropdownOpen && (
        <StyledDiv className="">
          <div className=" ">
            <div className=" mt-4  mb-3 ml-3  mr-3  flex justify-between">
              <p className=" flex items-center ">Notifications</p>
            </div>
          </div>
          {GetViewMoreText()}
        </StyledDiv>
      )}
    </>
  );
}
export default NotificationDropdown;
const StyledDiv = styled.div`
  position: absolute;
  right: 11rem;
  width: 300px;
  background: #f1f1f1;
  margin: 1rem 0 0 0.25rem;
  border: 2px solid #dde3ed;
  border-radius: 0.375rem;
  z-index: 5;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`;

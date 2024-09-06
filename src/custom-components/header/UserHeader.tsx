import { Badge } from "@mui/material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Card from "@mui/material/Card";
import { Avatar } from "@mui/material";
import { notificationData, loginUserData } from "../../types";
import NotificationDropdown from "./notificationDropdown";
import { useState } from "react";

function HeaderUser() {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleViewMore = () => {
    setIsDropdownOpen(false);
  };
  const data: notificationData = {
    unreadNotificationCount: 2,
  };

  const loginUser: loginUserData = {
    user: "Admin",
    userImage: "/sampleProfileAvatar.svg",
    role: "admin",
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
      className="gap-x-4 mr-4"
    >
      <div>
        <Badge
          badgeContent={data.unreadNotificationCount}
          color="error"
          className="text-primary "
        >
          <NotificationsNoneIcon
            className="text-primary  text-[28px] cursor-pointer"
            onClick={toggleDropdown}
          />
        </Badge>
        <NotificationDropdown
          data={data}
          viewMore={handleViewMore}
          isDropdownOpen={isDropdownOpen}
        />
      </div>
      <div className="px-2  w-[199px]">
        <Card
          className="rounded-lg cursor-pointer "
          onClick={() => {}}
          sx={{
            background: "var(--profileCardBg)",
            border: "2px solid var(--primary)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
            className="justify-start m-1 w-full  "
          >
            <div className="relative ml-2">
              <Avatar alt="User Image" src={loginUser.userImage} />
            </div>
            <div className="ml-2 mr-3">
              <p className="font-[400] text-[14px]">{loginUser.user}</p>
              <p className="text-[12px] font-[300] text-greylabelText">
                {loginUser.role}
              </p>
            </div>
            <div className="mr-1 items-center"></div>
          </div>
        </Card>
      </div>
      <div
        className="flex gap-x-2 cursor-pointer"
        //todo need to add logout function
        onClick={() => {}}
      >
        <LogoutOutlinedIcon />
      </div>
    </div>
  );
}

export default HeaderUser;

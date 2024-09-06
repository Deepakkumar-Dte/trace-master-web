
export interface headerpropType {
    data: notificationData;
    viewMore:()=>void;
    isDropdownOpen:boolean;
}

export interface loginUserData {
    user:string;
    userImage:string;
    role:string;
}

export interface notificationData {
    unreadNotificationCount:number;
}
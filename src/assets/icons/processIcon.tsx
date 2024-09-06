import { iconProps } from "../../shared/type";

const ProcessIcon = (props: iconProps) => {
  const { color, ...rest } = props;
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M19.3066 5.41406C19.3565 4.98988 19.3319 4.54473 19.2348 4.08297C18.7951 1.99091 16.7316 0.723374 14.6664 1.24779L14.6664 1.2478C12.6804 1.7522 11.423 3.64134 11.892 5.7364L11.892 5.73645C12.1053 6.68878 12.6298 7.44527 13.4272 7.99709L13.4272 7.99712C13.6676 8.16343 13.8497 8.37308 13.9941 8.63561L13.9942 8.6357C14.2731 9.14238 14.5593 9.64562 14.8444 10.1469C14.9272 10.2925 15.0099 10.4379 15.0923 10.5831C15.0923 10.5832 15.0923 10.5832 15.0924 10.5833L15.338 10.4439M19.3066 5.41406L15.5531 11.3431L15.4718 11.2091C15.4833 11.1979 15.4948 11.1868 15.5064 11.1757C15.5329 11.15 15.5608 11.1276 15.5779 11.1138L15.5821 11.1104C15.6026 11.0939 15.6102 11.0873 15.6151 11.0824L15.6159 11.0816C15.657 11.0403 15.7126 10.9902 15.7587 10.9485C15.7617 10.9458 15.7647 10.9431 15.7677 10.9404C15.7884 10.9217 15.8068 10.9051 15.8204 10.8922C15.8413 10.8726 15.8594 10.8546 15.8751 10.8379M19.3066 5.41406C19.3172 5.35688 19.3283 5.29782 19.3406 5.23604L19.341 4.50737C19.3214 4.42113 19.3045 4.33977 19.2883 4.26155C19.252 4.08667 19.2189 3.92744 19.1661 3.76427C18.4079 1.42553 15.8308 0.421754 13.6871 1.62722L13.6871 1.62723C11.9956 2.57817 11.3127 4.68049 12.1166 6.44551C12.4215 7.11478 12.889 7.64275 13.4969 8.06865L13.3348 8.29994C13.4346 8.3696 13.5314 8.46185 13.5924 8.5654C13.9682 9.20617 14.3392 9.85015 14.7119 10.4973L14.7133 10.4997L14.7159 10.5042C14.8366 10.7138 14.9576 10.9238 15.079 11.1341C14.6085 11.5874 14.14 12.0386 13.6699 12.4912L12.9466 13.1878C12.5434 12.8165 12.0802 12.6501 11.5448 12.7066C11.0022 12.7638 10.5921 13.0458 10.2792 13.4837L10.2214 13.4512L10.2213 13.4512C10.1783 13.427 10.1402 13.4057 10.1026 13.3832M19.3066 5.41406L2.88951 15.8206C3.45335 14.9639 4.0189 14.1087 4.58848 13.2562L4.5885 13.2561C4.63036 13.1935 4.68706 13.0943 4.68557 12.9673C4.68403 12.8363 4.62212 12.7359 4.56682 12.6661C4.20238 12.2056 4.16706 11.5723 4.47836 11.0531C4.7926 10.5293 5.3724 10.2723 6.00495 10.393L6.00506 10.393C6.54506 10.4958 7.0292 10.9759 7.10263 11.5237C7.1251 11.6914 7.17779 11.8343 7.27223 11.9568C7.36324 12.0748 7.47837 12.1543 7.5888 12.2188L7.58885 12.2188C8.16221 12.5535 8.73147 12.8935 9.30218 13.2344C9.52042 13.3648 9.73888 13.4953 9.95785 13.6257C9.95796 13.6257 9.95807 13.6258 9.95818 13.6258L10.1026 13.3832M15.338 10.4439C15.3562 10.476 15.3749 10.5077 15.3947 10.5405C15.3725 10.5747 15.348 10.6127 15.3203 10.6563L15.5587 10.8077L15.8001 10.6612C15.7736 10.6175 15.7499 10.5788 15.7282 10.5438C15.7473 10.513 15.7654 10.483 15.7827 10.4526C15.8715 10.296 15.9609 10.1397 16.0503 9.98348L16.0504 9.98338C16.3087 9.53162 16.5671 9.07991 16.8122 8.62112M15.338 10.4439C15.2552 10.298 15.1722 10.1521 15.0893 10.0062L15.0892 10.006L15.0892 10.006C14.8043 9.5051 14.5194 9.00422 14.2415 8.4995L15.338 10.4439ZM16.8122 8.62112L17.0612 8.75428M16.8122 8.62112L17.0613 8.75418C17.0612 8.75421 17.0612 8.75425 17.0612 8.75428M16.8122 8.62112C17.0181 8.23592 17.3024 7.94373 17.6469 7.67714L17.3832 8.29837M17.0612 8.75428C16.814 9.217 16.5527 9.67387 16.2938 10.1266C16.2048 10.2822 16.1161 10.4373 16.0283 10.592L16.0282 10.5922C15.9833 10.6711 15.9313 10.7512 15.8751 10.8379M17.0612 8.75428C17.151 8.58625 17.2584 8.43685 17.3832 8.29837M15.8751 10.8379C15.9043 10.8068 15.9253 10.7799 15.9404 10.7544L15.9404 10.7544C16.2278 10.2662 16.5048 9.77347 16.7834 9.27787C16.8937 9.08164 17.0042 8.88496 17.1158 8.68794C17.1921 8.55277 17.2788 8.42101 17.3832 8.29837M15.8751 10.8379C15.8751 10.8379 15.8751 10.838 15.875 10.838C15.8498 10.8769 15.8237 10.9171 15.797 10.9591L15.6791 11.1447L15.6787 11.1453L15.5987 11.2714L17.3832 8.29837M10.1026 13.3832C9.88451 13.2533 9.66658 13.1232 9.44865 12.993L9.44835 12.9928L9.44805 12.9926C8.87694 12.6515 8.30585 12.3104 7.73121 11.9749L10.1026 13.3832ZM18.8275 6.80127C18.5788 7.20785 18.2409 7.5752 17.8198 7.90049C17.7506 7.95401 17.6847 8.0081 17.622 8.06338C17.6578 8.03413 17.6953 8.00584 17.7346 7.97861L18.8275 6.80127ZM18.8275 6.80127C18.5611 7.26392 18.1982 7.6572 17.7346 7.97856L18.8275 6.80127ZM5.68109 10.4127H5.68118C6.46074 10.4071 7.08806 11.023 7.09184 11.8026L5.68109 10.4127ZM5.68109 10.4127C4.92622 10.4184 4.30885 11.0491 4.31074 11.8051C4.31264 12.5599 4.93872 13.1827 5.69373 13.1817C6.46693 13.1808 7.09565 12.5741 7.09184 11.8026L5.68109 10.4127ZM10.3516 14.4158L10.3516 14.4159L11.7699 13.306L11.7758 13.0237C11.7758 13.0237 11.7757 13.0237 11.7757 13.0237C10.9798 13.0072 10.3627 13.6186 10.3516 14.4158ZM3.48575 17.4375C3.48195 16.6771 2.86148 16.0634 2.10047 16.0634C1.33367 16.0634 0.694872 16.6961 0.709213 17.4619C0.723344 18.2179 1.34335 18.8349 2.09861 18.8358C2.8667 18.8368 3.48952 18.2061 3.48575 17.4375ZM18.2053 4.89829C18.2053 6.302 17.0674 7.43992 15.6637 7.43992C14.26 7.43992 13.1221 6.302 13.1221 4.89829C13.1221 3.49459 14.26 2.35667 15.6637 2.35667C17.0674 2.35667 18.2053 3.49459 18.2053 4.89829Z"
        stroke={color || "var(--primary)"}
        strokeWidth="0.564806"
      />
    </svg>
  );
};

export default ProcessIcon;

import { iconProps } from "../../shared/type";

const DashboardIcon = (props: iconProps) => {
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
        d="M5.83317 7.5013H13.3332M5.83317 10.8346H13.3332M5.83317 14.168H9.99984M18.3332 10.0013C18.3332 14.6038 14.6023 18.3346 9.99984 18.3346H1.6665V10.0013C1.6665 5.3988 5.39734 1.66797 9.99984 1.66797C14.6023 1.66797 18.3332 5.3988 18.3332 10.0013Z"
        stroke={color || "var(--primary)"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DashboardIcon;

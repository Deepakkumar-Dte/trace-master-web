export interface ButtonProps {
  handleOnClick: () => void;
  buttonName?: React.ReactNode | string;
  buttonIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
  classes?: string;
  customStyle?: any;
  disable?: boolean;
}

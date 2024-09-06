import React, { HTMLAttributes, ReactNode, useState } from "react";
import Select, { Props as SelectProps, MultiValue } from "react-select";
import { Label } from "./label";

export interface ComboBoxOption {
  label: string;
  value: string;
  isFixed?: boolean;
  isDisabled?: boolean;
}

interface ComboBoxProps extends SelectProps<ComboBoxOption> {
  options: ComboBoxOption[];
  label?: string;
  wrapperProps?: HTMLAttributes<HTMLDivElement>;
  extra?: {
    label: ReactNode;
    value: any;
    isFixed?: true;
    isDisabled?: boolean;
  }[];
}

const DropDown: React.FC<ComboBoxProps> = ({
  options,
  label,
  wrapperProps,
  extra = [],
  ...props
}) => {
  const [selectedOption, setSelectedOption] = useState<
    ComboBoxOption | MultiValue<ComboBoxOption> | null
  >(null);

  const handleChange = (
    option: ComboBoxOption | MultiValue<ComboBoxOption> | null
  ) => {
    setSelectedOption(option);
  };

  return (
    <div
      {...wrapperProps}
      className={`combo-box flex flex-col gap-0 ${wrapperProps?.className}`}
    >
      {label && <Label className="text-[14px] font-medium">{label}</Label>}
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={[...(extra as ComboBoxOption[]), ...options]}
        styles={{
          control(base, props) {
            base.fontSize = "14px";
            base.minHeight = "40px";
            return base;
          },
          indicatorSeparator: (base) => {
            base.display = "none";
            return base;
          },
          dropdownIndicator: (base) => {
            base.padding = 0;
            base.background = "transparent";
            return base;
          },
          option(base, props) {
            base.fontSize = "14px";
            return base;
          },
        }}
        classNamePrefix="combo-box"
        {...props}
      />
    </div>
  );
};

export default DropDown;

export interface TextInputProps {
  label: string;
  error?: string[] | string | any;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  placeholder?: string;
  onblur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  touched?: boolean | any;
  type?: string;
  customStyle?: any;
  labelStyle?: any;
  classes?: string;
  required?: boolean;
  value?: string | number;
  readOnly?: boolean;
  max?: number | string;
  min?: number | string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  manualError?: boolean;
  manualText?: string;
  maxLength?: number;
}

export interface TextAreaProps {
  label: string;
  labelStyle?: any;
  error?: any;
  handleChange: ChangeEventHandler<HTMLTextAreaElement>;
  name: string;
  placeholder?: string;
  onblur?: any;
  touched?: any;
  resizeValue?: any;
  required?: boolean;
  value?: string;
  classes?: string;
  customStyle?: any;
  readOnly?: boolean;
}

import { ChangeEventHandler, ReactNode } from "react";

//to do type input object
export type SelectMenuProps = {
  labelname?: string;
  name: string;
  classes?: string;
  labelStyle?: any;
  data: {}[];
  fieldStyle?: any;
  handleChange: any;
  onblur?: any;
  touched?: any;
  readOnly?: boolean;
  required?: boolean;
  error?: any;
  value?: any;
  placeHolderStyle?: any;
  placeHolderText: string;
  background?: string;
  showedValue?: string;
  manualError?: boolean;
  disabled?: boolean;
  dropDownColor?: string;
  onPointerDown?: (e: any) => void;
  onDoubleClick?: (e: any) => void;
  addNew?: ReactNode;
};

export interface FilterProps {
  classes?: any;
  onSearch: any;
  value: any;
  filterPosition?: string;
  filter: any;
  applyFilter: any;
  clearFilter?: any;
  isEmpty?: boolean;
  onClickSearch?: any;
  clearSearch?: any;
  isFilter?: boolean;
  isColoumn?: boolean;
  placeholderText?: string;
  buttonName?: any;
  buttonOnClick?: any;
  isFilterNeed?: boolean;
  children?: any;
}

export interface CheckBoxProps {
  checkBox?: {
    props?: {
      checked?: boolean;
    };
  };
  pillar_status?: String;
}

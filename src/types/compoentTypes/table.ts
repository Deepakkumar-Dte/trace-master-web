export interface DynamicTableProps {
    data: any;
    onClick?: any;
    backgroundColor?: string;
    headerBg?: string;
    classes?: any;
    count?: any;
    paginateData?: any;
    clearPage?: any;
    allSelect?: any;
    pagination?: boolean;
    customRowstyle?: any;
    rowGap?: any;
    divider?: string;
    updateRoleAccess?: (role: string, index: number) => void;
  }
  
  export interface CustomEvent {
  
    target: {
      value?: string;
      name?: string;
      checked?: string;
    };
  
  }
  
  
  
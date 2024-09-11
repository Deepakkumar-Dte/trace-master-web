export const headerTabs = [
  { name: "Tracking Management", url: `/tracking` },
  // { name: "Node Management", url: `/node` },
  { name: "Inventory Management", url: `/inventory` },
  { name: "Settings", url: `/settings` },
];

export const TabStyle = {
  "& .css-heg063-MuiTabs-flexContainer": {
    borderBottom: "2px solid #D9D9D9",
  },
  ".MuiTabs-indicator": {
    backgroundColor: "var(--primary)",
    color: "var(--primary)",
  },
  ".Mui-selected": {
    color: "var(--primary) !important",
  },
  "& .MuiTab-root": {
    marginLeft: "0px !important",
    fontFamily: "Work Sans, sans-serif !important",
  },
  fontFamily: "work-sans, sans-serif !important",
  fontSize: "14px",
};

export let emailValidation =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export let numberValidation = /^[0-9]+$/;
export let textValidation = /^[A-Za-z\s]+$/;
export let dataTypeOptions = [
  { label: "Auto", value: "auto" },
  { label: "Text", value: "text" },
  { label: "Number", value: "number" },
  { label: "Date", value: "date" },
  { label: "Dropdown", value: "dropdown" },
  { label: "Object", value: "object" },
];

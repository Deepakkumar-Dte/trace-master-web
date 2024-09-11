// import { DateTime } from "luxon";
// import { useFetch } from "../../customeHooks";
// import { getTrackingList } from "../../shared/api";
// import { useMemo } from "react";
// import Spinner from "../../custom-components/Spinner";
// import DynamicTable from "../../custom-components/DynamicTable";
// import HeaderText from "../../custom-components/headerText";
// import CustomButton from "../../custom-components/buttons/CustomButton";
// import { useNavigate } from "react-router-dom";
// import SelectMenu from "../../custom-components/inputComponents/SelectMenu";
// import SearchBar from "../../custom-components/inputComponents/searchBar";
// import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';

// const RequestList = () => {
//     const apiData = useMemo(() => {
//         return { trackingList: getTrackingList };
//     }, []);
//     const [loading, data] = useFetch(apiData, {});
//     const navigate = useNavigate();
//     if (loading) return <Spinner />

//     const filterData = data.trackingList.map((e: any, index: number) => {
//         return {
//             "Request ID": (
//                 <span className="text-primary">
//                     {e?.title}
//                 </span>
//             ),
//             "Create Date": <p>{DateTime.fromISO("2024-05-22T05:46:18.000Z").toFormat(
//                 "yyyy - MMM - dd"
//             )}</p>,
//             "Blend Name": <p className="text-center">4</p>,
//             "Quantity": <p className="text-center">4</p>,
//             "Action": <div className="cursor-pointer text-primary underline flex" onClick={(e: any) => { console.log(`e`,e); navigate(`/process/requestDetails`) }}>View</div>
//         };
//     });
//     return (
//         <div className="h-full">
//             <div className="request-management mx-[4.5rem]">
//                 <div className="header mx-4 my-6 flex flex-col items-start gap-y-6">
//                     <CustomButton startIcon={<ArrowBackIosNewOutlinedIcon className="text-[10px]" />}
//                         buttonName="Back"
//                         handleOnClick={() => { navigate("/process") }}
//                         customStyle={{
//                             width: "90px",
//                             padding: "0.5rem 1rem"
//                         }} />
//                     <HeaderText text={`Sample Request Tracking`} />
//                 </div>
//                 <div className="table-container bg-white p-4">
//                     <div className="flex justify-end">
//                         <SelectMenu fieldStyle={{ width: "300px", border: "1px solid #E6E6E6",height:"40px" }} name={""} data={[]} handleChange={undefined} placeHolderText={"Blend Name"} />
//                         <SearchBar onSearch={undefined} classes={`h-[40px] mt-4`} value={undefined} filter={undefined} applyFilter={undefined} />
//                     </div>
//                     <DynamicTable data={filterData} />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default RequestList;

import React from 'react'

const requestList = () => {
  return (
    <div>requestList</div>
  )
}

export default requestList
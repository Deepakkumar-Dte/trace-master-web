// import CustomButton from "../../custom-components/buttons/CustomButton";
// import { useNavigate } from "react-router-dom";
// import RequestCard from "./requestCard";
// import HeaderText from "../../custom-components/headerText";

// function RequestDetails(props: any) {
//   const navigate = useNavigate();
//   const requestDatas = [
//     {
//       name: "Off Node",
//       Sample_Quality: "test1x",
//       Incharge_Name: "ytestxdf",
//       Office_Sample_Cake_ID: "hbsckjdvh",
//     },
//     { name: "Store Node 2", test1g: "test1x", ytestgh: "ytestxddf" },
//     { name: "Node X" },
//   ];
//   return (
//     <div className="mx-[5%] my-10">
//       <CustomButton
//         startIcon={``}
//         buttonName="Back"
//         handleOnClick={() => {
//           navigate("/process");
//         }}
//         customStyle={{
//           width: "90px",
//           padding: "0.5rem 1rem",
//         }}
//       />
//       <div className="flex justify-between items-center my-6">
//         <div className="flex items-center gap-x-1">
//           <HeaderText
//             text={`Sample Request Tracking /`}
//             onClick={() => {
//               navigate(-1);
//             }}
//             classes={`cursor-pointer`}
//           />
//           <span className="text-primary">{`Request ID# 215258`}</span>
//         </div>
//         <div className="flex justify-end gap-x-6">
//           <CustomButton
//             classes={`green-button`}
//             buttonName="Print"
//             handleOnClick={() => {
//               navigate("/process");
//             }}
//             customStyle={{
//               width: "150px",
//               background: "green",
//               color: "#fff",
//             }}
//           />
//           <CustomButton
//             classes={`white-button`}
//             buttonName="Generate QR code"
//             handleOnClick={() => {
//               navigate("/process");
//             }}
//             customStyle={{
//               width: "150px",
//               background: "#fff",
//               color: "#232323",
//               border: "1px solid #232323",
//             }}
//           />
//         </div>
//       </div>
//       <div className="detailsContainer flex flex-col gap-y-4 my-4">
//         {requestDatas.map((item: any, index: number) => {
//           return (
//             <div key={index} className="my-2">
//               <RequestCard key={index} data={item} index={index} />
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default RequestDetails;


import React from 'react'

const requestDetails = () => {
  return (
    <div>requestDetails</div>
  )
}

export default requestDetails

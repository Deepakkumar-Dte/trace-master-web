import dashboardImage from "@/assets/dashboard.png";
import Image from "next/image";
const Dashboard = () => {
  return (
    <div className="w-full h-full overflow-y-auto">
      <Image src={dashboardImage} alt="" />
    </div>
  );
};

export default Dashboard;

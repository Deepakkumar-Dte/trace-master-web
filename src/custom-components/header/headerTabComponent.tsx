import { headerTabs } from "../../shared/config";
import { useNavigate } from "react-router-dom";

function HeaderTabs() {
  const pathName = `/${location.pathname.split("/")[1]}`;
  const navigate = useNavigate();
  return (
    <div className="flex gap-x-12">
      {headerTabs.map((item: any, index: number) => {
        return (
          <div
            key={index}
            style={{
              fontSize: "14px",
              fontWeight: 600,
              lineHeight: "16.42px",
              textAlign: "left",
              padding: "1rem 1.5rem",
              borderBottom:
                item.url === pathName ? "3px solid var(--primary)" : "none",
            }}
          >
            <h1 className="cursor-pointer" onClick={() => navigate(item.url)}>
              {item.name}
            </h1>
          </div>
        );
      })}
    </div>
  );
}
export default HeaderTabs;

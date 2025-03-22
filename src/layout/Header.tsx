import { Link, useLocation, useNavigate } from "react-router-dom";
import routesConstants from "@/routes/routesConstants";
import { BrokerDetail, Dollar, File, Line, Sarvidhi } from "@/constants/images";

const NAV_ITEMS = [
  { path: routesConstants.BROKER, label: "Broker Details", icon: BrokerDetail },
  { path: routesConstants.DIAMOND, label: "Diamond Details", icon: File },
  { path: routesConstants.TRANSACTION, label: "Transaction Module", icon: Dollar },
];

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation()

  return (
    <header className="header_block">
      <div className="header_content">
        <div className="header_logo">
          <Link to={"#"}>
            <img src={Sarvidhi} alt="Company Logo" />
          </Link>
        </div>
        <div>
          <img src={Line}/>
        </div>

        <div className="header_right d-flex">
          {NAV_ITEMS.map(({ path, label, icon }) => (
            <div key={path} onClick={() => navigate(path)} className="header-item">
              <img src={icon} alt={label} className="header-icon" />
              <label className="header-label" style={{color:`${location.pathname === path ?"#2A67B2": "#8BA1B3"}`}}>{label}</label>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;

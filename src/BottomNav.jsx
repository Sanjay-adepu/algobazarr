import { FiHome, FiGrid, FiShoppingCart, FiUser } from "react-icons/fi";
import "./BottomNav.css";
import {Link} from "react-router-dom";
const BottomNav = () => {
  return (
    <div className="bottom-nav">
             <Link to="/"> 
      <div className="nav-item active">
        <FiHome className="nav-icon" />
        <span className="nav-label">Home</span>
      </div>
      </Link>
         <Link to="/category"> 
      <div className="nav-item">
        <FiGrid className="nav-icon" />
        <span className="nav-label">Categories</span>
      </div>
      </Link>
      <div className="nav-item">
        <FiShoppingCart className="nav-icon" />
        <span className="nav-label">Cart</span>
      </div>
      <div className="nav-item">
        <FiUser className="nav-icon" />
        <span className="nav-label">Account</span>
      </div>
    </div>
  );
};

export default BottomNav;
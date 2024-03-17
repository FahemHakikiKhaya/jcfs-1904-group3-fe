import "./style.css";
import { TrendingUp, Storefront, AttachMoney } from "@mui/icons-material";
import ProfileIcon from "@mui/icons-material/AccountCircle";
import { Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Sidebar() {
  const username = useSelector((state) => state.auth.username);
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <Dropdown>
            <Dropdown.Toggle
              style={{
                backgroundColor: "inherit",
                color: "black",
                border: "0",
              }}
            >
              <ProfileIcon />
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark">
              <Dropdown.Item>Hello {username}</Dropdown.Item>

              <Dropdown.Item href="/login">Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <h3 className="sidebarTitle" style={{ marginTop: "10px" }}>
            Dashboard
          </h3>
          <ul className="sidebarList">
            <Link to="/admin/sales-report" className="link">
              <li className="sidebarListItem">
                <TrendingUp className="sidebarIcon" />
                Sales
              </li>
            </Link>
            <Link to="/admin/products" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </Link>
            <Link to="/admin/transactions" className="link">
              <li className="sidebarListItem">
                <AttachMoney className="sidebarIcon" />
                Transactions
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Sidebar;

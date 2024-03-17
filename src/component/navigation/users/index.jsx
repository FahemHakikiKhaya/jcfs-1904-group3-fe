import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Button, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ProfileIcon from "@mui/icons-material/AccountCircle";
import { TextField, InputAdornment } from "@mui/material";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./style.css";

function MuiNavBar() {
  const username = useSelector((state) => state.auth.username);
  const location = useLocation().pathname;

  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e) => {
    setValue(e);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const enterSearch = (e) => {
    if (e.code === "Enter") {
      if (!searchValue) {
        navigate(`/product-list/`);
      } else {
        navigate(`/product-list/search/${searchValue}`);
      }
    }
  };

  const categoryNavigate = (e) => {
    const category = e.target.value;
    navigate(`/product-list/${category}`);
  };
  if (location == "/checkout") {
    return null;
  }
  if (location.includes("/admin")) {
    return null;
  }

  if (location.includes("/admin")) {
    return null;
  }

  return (
    <div className="navBar">
      <Container
        maxWidth="none"
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingInline: 50,
          paddingTop: 20,
          paddingBottom: 20,
        }}
      >
        <Stack direction="row" p={3} alignItems="center" style={{ padding: 0 }}>
          <img
            src="https://i.imgur.com/WYBghfu.png"
            alt="Logo"
            height={50}
            style={{ marginRight: 50 }}
            onClick={() => {
              navigate("/");
            }}
          />
          <Button
            onClick={() => navigate(`/product-list/`)}
            className="btnNavbar btn-effect"
            style={{ color: "black", marginRight: 10 }}
          >
            All
          </Button>
          <Button
            onClick={() => handleChange("cat")}
            className="btnNavbar btn-effect"
            style={{ color: "black", marginRight: 10 }}
          >
            Categories
          </Button>
          <Button
            onClick={() => handleChange("need")}
            className="btnNavbar btn-effect"
            style={{ color: "black", marginRight: 10 }}
          >
            Needs
          </Button>
          <TextField
            defaultValue={searchValue}
            onChange={handleSearch}
            onKeyPress={enterSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
        </Stack>
        <Stack direction="row" alignItems="center">
          <Button
            onClick={() => {
              navigate("/carts");
            }}
            sx={{ color: "black" }}
          >
            <ShoppingCartIcon sx={{ m: 2 }} />
          </Button>

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
              {username ? (
                <Dropdown.Item>Hello {username}</Dropdown.Item>
              ) : (
                <Dropdown.Item
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login
                </Dropdown.Item>
              )}
              {username ? (
                <Dropdown.Item
                  onClick={() => {
                    navigate("/transaction/status");
                  }}
                >
                  Transaction History
                </Dropdown.Item>
              ) : (
                ""
              )}
              <Dropdown.Item href="/login">Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Stack>
      </Container>

      {value == "cat" ? (
        <Container
          maxWidth="none"
          style={{
            display: "flex",
            paddingInline: 50,
            paddingBottom: 20,
          }}
          className="categoryListParent"
        >
          <Button
            variant="text"
            value="Sofa"
            onClick={categoryNavigate}
            style={{ color: "black", marginRight: 10, fontSize: 12 }}
            className="categoryButton"
          >
            Sofa
          </Button>
          <Button
            variant="text"
            value="Chairs"
            onClick={categoryNavigate}
            style={{ color: "black", marginRight: 10, fontSize: 12 }}
            className="categoryButton"
          >
            Chairs
          </Button>
          <Button
            variant="text"
            value="Tables"
            onClick={categoryNavigate}
            style={{ color: "black", marginRight: 10, fontSize: 12 }}
            className="categoryButton"
          >
            Tables
          </Button>
          <Button
            variant="text"
            value="Storages"
            onClick={categoryNavigate}
            style={{ color: "black", marginRight: 10, fontSize: 12 }}
            className="categoryButton"
          >
            Storages
          </Button>
          <Button
            variant="text"
            value="Beds"
            onClick={categoryNavigate}
            style={{ color: "black", marginRight: 10, fontSize: 12 }}
            className="categoryButton"
          >
            Beds
          </Button>

          <Button
            variant="text"
            value="Desks"
            onClick={categoryNavigate}
            style={{ color: "black", marginRight: 10, fontSize: 12 }}
            className="categoryButton"
          >
            Desks
          </Button>
        </Container>
      ) : (
        <Container
          maxWidth="none"
          style={{
            display: "flex",
            paddingInline: 50,
            paddingBottom: 20,
          }}
          className="categoryListParent"
        >
          <Button
            variant="text"
            value="Home"
            onClick={categoryNavigate}
            style={{ color: "black", marginRight: 10, fontSize: 12 }}
            className="categoryButton"
          >
            Home
          </Button>
          <Button
            variant="text"
            value="Office"
            onClick={categoryNavigate}
            style={{ color: "black", marginRight: 10, fontSize: 12 }}
            className="categoryButton"
          >
            Office
          </Button>
          <Button
            variant="text"
            value="Kitchen"
            onClick={categoryNavigate}
            style={{ color: "black", marginRight: 10, fontSize: 12 }}
            className="categoryButton"
          >
            Kitchen
          </Button>
          <Button
            variant="text"
            value="Kids"
            onClick={categoryNavigate}
            style={{ color: "black", marginRight: 10, fontSize: 12 }}
            className="categoryButton"
          >
            Kids
          </Button>
        </Container>
      )}
    </div>
  );
}

export default MuiNavBar;

import React, { useState, useEffect } from "react";
import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography, Tab, Tabs } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";

const linksArr = ["home", "diaries", "auth"];
const loggedInLinks = ["home", "diaries", "add", "profile"];

const Header = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 960); // Adjust the breakpoint to  desired value
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const renderTabs = () => {
    return (
      <Tabs
        value={false}
        aria-label="tabs"
        sx={{
          marginLeft: "auto",
          color: "black",
        }}
      >
        {(isLoggedIn ? loggedInLinks : linksArr).map((link) => (
          <Tab
            key={link}
            component={Link}
            to={`/${link === "home" ? "" : link}`}
            label={link}
            sx={{
              textDecoration: "none",
              ":hover": {
                textDecoration: "underline",
                textUnderlineOffset: "18px",
              },
            }}
          />
        ))}
      </Tabs>
    );
  };

  const renderHamburgerMenu = () => {
    return (
      <>
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="menu"
          aria-haspopup="true"
          onClick={handleMenuOpen}
          sx={{
            marginLeft: "auto",
            color: "black",
          }}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {(isLoggedIn ? loggedInLinks : linksArr).map((link) => (
            <MenuItem
              key={link}
              component={Link}
              to={`/${link === "home" ? "" : link}`}
              onClick={handleMenuClose}
            >
              {link}
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  };

  return (
    <AppBar sx={{ bgcolor: "white", position: "sticky" }}>
      <Toolbar>
        <AirportShuttleIcon sx={{ color: "black", fontSize: "70px", display: { xs: "block", sm: "block", md: "block" } }} />
        <Typography variant="h3" sx={{ ml: 2, fontWeight: "bold", color: "black", marginLeft: "3%",fontSize:'35px' }}>
          Travelogue
        </Typography>
        {isLargeScreen ? renderTabs() : renderHamburgerMenu()}
      </Toolbar>
    </AppBar>
  );
};

export default Header;

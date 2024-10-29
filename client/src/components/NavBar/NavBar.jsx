import React, { useState, useContext, useRef } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";
import { Context } from "../../Context/Context";
import { Link as LinkRouter, useNavigate } from "react-router-dom";

function ResponsiveAppBar() {
  const navigate = useNavigate();

  const { logout, isAuthenticated, roles } = useContext(Context);

  const pages = ["Products", "Pricing", "Blog"];
  const settings = roles.includes("user")
    ? ["Profile", "Account", "Logout"]
    : ["Profile", "Account", "Dashboard", "Logout"];
  const refItemProfile = useRef();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (e) => {
    // console.log(e.target.innerText);
    const textContext = e.target.innerText;
    if (textContext === "Logout") {
      logout();
    }
    if (textContext === "Dashboard") {
      navigate("/dashboard");
    }
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* VERSION MOVILE */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            AUTH
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            {/* ICONS MENU BURGER */}
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            {/* LINK ITEMS PAGES */}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* VERSION DESKTOP */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            AUTH
          </Typography>
          {/* LINK ITEMS PAGES */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {isAuthenticated ? (
            <Box sx={{ flexGrow: 0 }}>
              {/* AVATAR */}
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              {/* MENU PROFILE */}
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings?.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={(e) => handleCloseUserMenu(e)}
                    ref={refItemProfile}
                  >
                    <Typography sx={{ textAlign: "center" }}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
                {/* {roles.includes("admin") || roles.includes("moderator") ? (
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography sx={{ textAlign: "center" }}>
                      Dashboard
                    </Typography>
                  </MenuItem>
                ) : null} */}
              </Menu>
            </Box>
          ) : (
            /*BUTTON-SIGN IN-SIGN UP */
            <Box>
              <Link
                component={LinkRouter}
                to="/signin"
                sx={{ textDecoration: "none" }}
              >
                <Button variant="contained"> Sign In</Button>
              </Link>
              <Link
                component={LinkRouter}
                to="/signup"
                sx={{ textDecoration: "none" }}
              >
                <Button variant="outlined" color="secondary">
                  Sign up
                </Button>
              </Link>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;

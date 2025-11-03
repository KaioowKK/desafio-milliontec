import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Container } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const nav = useNavigate();
  const handleLogout = () => {
    logout();
    nav("/login");
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Cliente — Painel
          </Typography>

          <Button color="inherit" startIcon={<LogoutIcon />} onClick={handleLogout}>
            LOGOUT
          </Button>
        </Toolbar>
      </AppBar>

      {/* full-width container so bg fills entire page */}
      <Container maxWidth={false} disableGutters sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
        {/* centered content column with consistent width */}
        <Box sx={{ width: "100%", maxWidth: 1200, px: 2, py: 4 }}>
          {children}
        </Box>
      </Container>

      <Box component="footer" sx={{ py: 2, textAlign: "center", bgcolor: "background.paper" }}>
        <Typography variant="caption" color="text.secondary">
          © {new Date().getFullYear()} Desafio
        </Typography>
      </Box>
    </Box>
  );
};

export default Layout;
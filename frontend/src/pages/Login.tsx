import React, { useState } from "react";
import { Container, TextField, Button, Box, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";

const Login: React.FC = () => {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError("");
      const data = await login(username, password);
      localStorage.setItem("token", data.token);
      nav("/");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={10}>
        <Typography variant="h5" mb={2}>Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Username" fullWidth margin="normal" value={username} onChange={e => setUsername(e.target.value)} />
          <TextField label="Password" fullWidth margin="normal" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>Login</Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
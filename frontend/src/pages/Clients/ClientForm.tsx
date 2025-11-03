import React, { useState, useEffect } from "react";
import type { Client } from "../../types/client";
import { TextField, Button, Paper, Box, Typography } from "@mui/material";
import api from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";

const ClientForm: React.FC = () => {
  const [form, setForm] = useState<Client>({ name: "", email: "", phone: "", address: "" });
  const nav = useNavigate();
  const { id } = useParams<{ id?: string }>();

  useEffect(() => {
    if (id) {
      api
        .get(`/clients/${id}`)
        .then((r) => setForm(r.data))
        .catch(console.error);
    }
  }, [id]);

  const handleSave = async () => {
    try {
      if (id) await api.put(`/clients/${id}`, form);
      else await api.post("/clients", form);
      nav("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Paper sx={{ p: 3, width: "100%", maxWidth: 920, mx: "auto", boxSizing: "border-box" }}>
      <Typography variant="h6" mb={2}>
        {id ? "Editar Cliente" : "Novo Cliente"}
      </Typography>

      <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }} gap={2} mb={2}>
        <TextField
          label="Nome"
          fullWidth
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <TextField
          label="E-mail"
          fullWidth
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <TextField
          label="Telefone"
          fullWidth
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <TextField
          label="Endereço"
          fullWidth
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
      </Box>

      <Box display="flex" gap={2}>
        <Button variant="contained" onClick={handleSave}>
          Salvar
        </Button>
        <Button variant="outlined" onClick={() => nav("/")}>
          Cancelar
        </Button>
      </Box>
    </Paper>
  );
};

export default ClientForm;
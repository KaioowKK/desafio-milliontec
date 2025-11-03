import React, { useEffect, useState } from "react";
import type { Client } from "../../types/client";
import {
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Box,
  Paper,
} from "@mui/material";
import { Edit as EditIcon, Add as AddIcon } from "@mui/icons-material";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";

const ClientList: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const nav = useNavigate();

  const fetchClients = async () => {
    try {
      const res = await api.get("/clients");
      setClients(res.data);
    } catch (err) {
      console.error("fetchClients error:", err);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const exportPdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Client List", 14, 20);
    doc.setFontSize(10);
    clients.forEach((c, i) => {
      const y = 30 + i * 8;
      doc.text(`${i + 1}. ${c.name} — ${c.email} — ${c.phone} — ${c.address}`, 14, y);
    });
    doc.save("clients.pdf");
  };

  return (
    <Paper sx={{ p: 3, maxWidth: "100%", boxSizing: "border-box" }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h5">Lista de Clientes</Typography>
        <Box>
          <Button variant="contained" startIcon={<AddIcon />} sx={{ mr: 2 }} onClick={() => nav("/clients/new")}>
            Novo Cliente
          </Button>
          <Button variant="outlined" onClick={exportPdf}>Exportar PDF</Button>
        </Box>
      </Box>

      <Box sx={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {clients.map((c) => (
              <TableRow key={c.id}>
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.email}</TableCell>
                <TableCell>{c.phone}</TableCell>
                <TableCell>{c.address}</TableCell>
                <TableCell>
                  <IconButton onClick={() => nav(`/clients/${c.id}`)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
};

export default ClientList;
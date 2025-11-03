import { Request, Response } from "express";
import * as ClientService from "../services/ClientService";

export const create = async (req: Request, res: Response) => {
  try {
    const created = await ClientService.createClient(req.body);
    return res.status(201).json(created);
  } catch (err) {
    return res.status(500).json({ message: "Error creating client", error: err });
  }
};

export const list = async (_req: Request, res: Response) => {
  try {
    const clients = await ClientService.getClients();
    return res.json(clients);
  } catch (err) {
    return res.status(500).json({ message: "Error fetching clients", error: err });
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const client = await ClientService.getClientById(id);
    if (!client) return res.status(404).json({ message: "Client not found" });
    return res.json(client);
  } catch (err) {
    return res.status(500).json({ message: "Error fetching clients", error: err });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const updated = await ClientService.updateClient(id, req.body);
    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ message: "Error updating client", error: err });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await ClientService.deleteClient(id);
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ message: "Error deleting client", error: err });
  }
};
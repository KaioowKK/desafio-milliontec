import { AppDataSource } from "../data-source";
import { Client } from "../entities/Client";

const clientRepo = () => AppDataSource.getRepository(Client);

export const createClient = async (data: Partial<Client>) => {
  const client = clientRepo().create(data);
  return clientRepo().save(client);
};

export const getClients = async () => {
  return clientRepo().find();
};

export const getClientById = async (id: number) => {
  return clientRepo().findOneBy({ id });
};

export const updateClient = async (id: number, data: Partial<Client>) => {
  await clientRepo().update({ id }, data);
  return getClientById(id);
};

export const deleteClient = async (id: number) => {
  return clientRepo().delete({ id });
};
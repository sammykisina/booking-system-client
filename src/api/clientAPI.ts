import { API } from './api';

const ClientAPI = {
  getClients: async () => API.get('/admin/clients?filter[role.slug]=user'),
};

export default ClientAPI;

import { TicketsData } from '../types/typings.t';
import { API } from './api';

const TravelAPI = {
  getBusTravels: async () => API.get('/users/busJourney'),
  getTrainTravels: async () => API.get('/users/trainJourney'),
  getAirTravels: async () => API.get('/users/airJourney'),
  getTickets: async () => API.get('/admin/tickets'),
  createTicket: async (newTicketData: TicketsData) =>
    API.post('/users/tickets', newTicketData),
};

export default TravelAPI;

import { API } from './api';

const TravelAPI = {
  getBusTravels: async () => API.get('/users/busJourney'),
  getTrainTravels: async () => API.get('/users/trainJourney'),
  getAirTravels: async () => API.get('/users/airJourney'),
};

export default TravelAPI;

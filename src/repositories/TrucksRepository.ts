import { apiService } from '../core/ApiService';

export const truckRepository = {
  getTrucks: () => apiService.get('/trucks'),

  getTruck: (id: string) => apiService.get(`/trucks/${id}`),

  createTruck: (truck: any) => apiService.post('/trucks', truck),

  updateTruck: (id: string, truck: any) => apiService.put(`/trucks/${id}`, truck),

  deleteTruck: (id: string) => apiService.del(`/trucks/${id}`),
};
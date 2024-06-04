import { truckRepository } from '../repositories/TrucksRepository';

export const truckService = {
    fetchTrucks: async (dispatch: React.Dispatch<any>) => {
      dispatch({ type: 'FETCH_TRUCKS_REQUEST' });
      try {
        const trucks = await truckRepository.getTrucks();
        dispatch({ type: 'FETCH_TRUCKS_SUCCESS', payload: trucks });
      } catch (error) {
        console.warn('Error fetching trucks:', error);
        dispatch({ type: 'FETCH_TRUCKS_FAILURE', payload: (error as Error).message });
      }
    },
  
    fetchTruck: async (dispatch: React.Dispatch<any>, id: string) => {
      dispatch({ type: 'FETCH_TRUCK_REQUEST' });
      try {
        const truck = await truckRepository.getTruck(id);
        dispatch({ type: 'FETCH_TRUCK_SUCCESS', payload: truck });
      } catch (error) {
        console.warn('Error fetching truck:', error);
        dispatch({ type: 'FETCH_TRUCK_FAILURE', payload: (error as Error).message });
      }
    },
  
    createTruck: async (dispatch: React.Dispatch<any>, truck: any) => {
      dispatch({ type: 'CREATE_TRUCK_REQUEST' });
      try {
        const newTruck = await truckRepository.createTruck(truck);
        dispatch({ type: 'CREATE_TRUCK_SUCCESS', payload: newTruck });
      } catch (error) {
        console.warn('Error creating truck:', error);
        dispatch({ type: 'CREATE_TRUCK_FAILURE', payload: (error as Error).message });
      }
    },
  
    updateTruck: async (dispatch: React.Dispatch<any>, id: string, truck: any) => {
      dispatch({ type: 'UPDATE_TRUCK_REQUEST' });
      try {
        const updatedTruck = await truckRepository.updateTruck(id, truck);
        dispatch({ type: 'UPDATE_TRUCK_SUCCESS', payload: updatedTruck });
      } catch (error) {
        console.warn('Error updating truck:', error);
        dispatch({ type: 'UPDATE_TRUCK_FAILURE', payload: (error as Error).message });
      }
    },
  
    deleteTruck: async (dispatch: React.Dispatch<any>, id: string) => {
      dispatch({ type: 'DELETE_TRUCK_REQUEST' });
      try {
        await truckRepository.deleteTruck(id);
        dispatch({ type: 'DELETE_TRUCK_SUCCESS', payload: id });
      } catch (error) {
        console.warn('Error deleting truck:', error);
        dispatch({ type: 'DELETE_TRUCK_FAILURE', payload: (error as Error).message });
      }
    },
  };
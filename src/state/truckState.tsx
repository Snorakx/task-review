import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { truckService } from '../services/TruckService';

interface Truck {
  id: string;
  code: string;
  name: string;
  status: string;
  description: string;
}

interface TruckState {
  trucks: Truck[];
  loading: boolean;
  error: string | null;
}

type Action =
  | { type: 'FETCH_TRUCKS_REQUEST' }
  | { type: 'FETCH_TRUCKS_SUCCESS'; payload: Truck[] }
  | { type: 'FETCH_TRUCKS_FAILURE'; payload: string }
  | { type: 'FETCH_TRUCK_REQUEST' }
  | { type: 'FETCH_TRUCK_SUCCESS'; payload: Truck }
  | { type: 'FETCH_TRUCK_FAILURE'; payload: string }
  | { type: 'CREATE_TRUCK_REQUEST' }
  | { type: 'CREATE_TRUCK_SUCCESS'; payload: Truck }
  | { type: 'CREATE_TRUCK_FAILURE'; payload: string }
  | { type: 'UPDATE_TRUCK_REQUEST' }
  | { type: 'UPDATE_TRUCK_SUCCESS'; payload: Truck }
  | { type: 'UPDATE_TRUCK_FAILURE'; payload: string }
  | { type: 'DELETE_TRUCK_REQUEST' }
  | { type: 'DELETE_TRUCK_SUCCESS'; payload: string }
  | { type: 'DELETE_TRUCK_FAILURE'; payload: string };

const initialState: TruckState = {
  trucks: [],
  loading: false,
  error: null,
};

const TruckContext = createContext<{
  state: TruckState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const truckReducer = (state: TruckState, action: Action): TruckState => {
  switch (action.type) {
    case 'FETCH_TRUCKS_REQUEST':
    case 'FETCH_TRUCK_REQUEST':
    case 'CREATE_TRUCK_REQUEST':
    case 'UPDATE_TRUCK_REQUEST':
    case 'DELETE_TRUCK_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_TRUCKS_SUCCESS':
      return { ...state, loading: false, trucks: action.payload };
    case 'FETCH_TRUCK_SUCCESS':
      return { ...state, loading: false, trucks: [action.payload, ...state.trucks] };
    case 'CREATE_TRUCK_SUCCESS':
      return { ...state, loading: false, trucks: [...state.trucks, action.payload] };
    case 'UPDATE_TRUCK_SUCCESS':
      return {
        ...state,
        loading: false,
        trucks: state.trucks.map((truck) =>
          truck.id === action.payload.id ? action.payload : truck,
        ),
      };
    case 'DELETE_TRUCK_SUCCESS':
      return {
        ...state,
        loading: false,
        trucks: state.trucks.filter((truck) => truck.id !== action.payload),
      };
    case 'FETCH_TRUCKS_FAILURE':
    case 'FETCH_TRUCK_FAILURE':
    case 'CREATE_TRUCK_FAILURE':
    case 'UPDATE_TRUCK_FAILURE':
    case 'DELETE_TRUCK_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const TruckProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(truckReducer, initialState);

  return (
    <TruckContext.Provider value={{ state, dispatch }}>
      {children}
    </TruckContext.Provider>
  );
};

export const useTruckState = () => {
  const context = useContext(TruckContext);
  if (!context) {
    throw new Error('useTruckState must be used within a TruckProvider');
  }
  return context;
};



export const fetchTrucks = async (dispatch: React.Dispatch<Action>) => {
  await truckService.fetchTrucks(dispatch);
};

export const fetchTruck = async (dispatch: React.Dispatch<Action>, id: string) => {
  await truckService.fetchTruck(dispatch, id);
};

export const createTruck = async (dispatch: React.Dispatch<Action>, truck: any) => {
  await truckService.createTruck(dispatch, truck);
};

export const updateTruck = async (dispatch: React.Dispatch<Action>, id: string, truck: any) => {
  await truckService.updateTruck(dispatch, id, truck);
};

export const deleteTruck = async (dispatch: React.Dispatch<Action>, id: string) => {
  await truckService.deleteTruck(dispatch, id);
};
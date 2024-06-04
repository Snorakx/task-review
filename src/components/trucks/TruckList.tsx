import React, { useEffect } from 'react';
import { useTruckState, fetchTrucks, deleteTruck } from '../../state/truckState';
import './TruckList.scss';

const TruckList: React.FC<{ onEdit: (id: string) => void }> = ({ onEdit }) => {
    const { state, dispatch } = useTruckState();

    useEffect(() => {
        fetchTrucks(dispatch);
    }, [dispatch]);

    const handleDelete = async (id: string) => {
        await deleteTruck(dispatch, id);
    };

    if (state.error) return <div>Error: {state.error}</div>;

    return (
        <div className="list-container">
            {state.loading && <div className="loader">Loading...</div>}
            <div>
                <h2>Truck List</h2>
                <ul>
                    {state.trucks.map((truck) => (
                        <li className="list-item" key={truck.id}>
                            {truck.name} - {truck.status}
                            <div className="holder">
                                <button className="button edit" onClick={() => onEdit(truck.id)}>Edit</button>
                                <button className="button delete" onClick={() => handleDelete(truck.id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );
};

export default TruckList;
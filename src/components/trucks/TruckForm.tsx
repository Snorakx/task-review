import React, { useState, useEffect } from 'react';
import { useTruckState, createTruck, updateTruck } from '../../state/truckState';
import './TruckForm.scss';

interface TruckFormProps {
    id?: string;
    onSave: () => void;
}

const TruckForm: React.FC<TruckFormProps> = ({ id, onSave }) => {
    const { state, dispatch } = useTruckState();
    const [code, setCode] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [status, setStatus] = useState<string>('Out Of Service');
    const [description, setDescription] = useState<string>('');

    useEffect(() => {
        if (id) {
            const truck = state.trucks.find((truck) => truck.id === id);
            if (truck) {
                setCode(truck.code);
                setName(truck.name);
                setStatus(truck.status);
                setDescription(truck.description);
            }
        }
    }, [id, state.trucks]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const truck = { code, name, status, description };
        if (id) {
            await updateTruck(dispatch, id, truck);
        } else {
            await createTruck(dispatch, truck);
        }
        onSave();
    };

    const handleClear = async (event: React.FormEvent) => {
        event.preventDefault();
        setCode('');
        setName('');
        setStatus('');
        setDescription('');
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Code:</label>
                    <input type="text" value={code} onChange={(e) => setCode(e.target.value)} required />
                </div>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Status:</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                        <option value="Out Of Service">Out Of Service</option>
                        <option value="Loading">Loading</option>
                        <option value="To Job">To Job</option>
                        <option value="At Job">At Job</option>
                        <option value="Returning">Returning</option>
                    </select>
                </div>
                <div>
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <button className="button" onClick={handleClear} disabled={state.loading}>Clear</button>
                <br />
                <button className="button" type="submit" disabled={state.loading}>Save</button>

                {state.error && <div className="error">Error: {state.error}</div>}
            </form>
        </div>
    );
};

export default TruckForm;
import React, { useState } from 'react';
import TruckList from '../../components/trucks/TruckList';
import TruckForm from '../../components/trucks/TruckForm';
import { TruckProvider } from '../../state/truckState';
import './TruckManagementPage.scss';

const TruckManagementPage: React.FC = () => {
    const [editingTruckId, setEditingTruckId] = useState<string | null>(null);

    const handleSave = () => {
        setEditingTruckId(null);
    };

    return (
        <TruckProvider>
            <h1 className="header">Truck Management</h1>
            <TruckList onEdit={setEditingTruckId} />
            <TruckForm id={editingTruckId} onSave={handleSave} />
        </TruckProvider>
    );
};

export default TruckManagementPage;
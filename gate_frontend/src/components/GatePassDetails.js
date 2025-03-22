import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const GatePassDetails = () => {
    const { id } = useParams();
    const [gatePass, setGatePass] = useState(null);

    useEffect(() => {
        const fetchGatePass = async () => {
            try {
                const response = await api.getGatePassById(id);
                setGatePass(response.data);
            } catch (error) {
                console.error('Error fetching gate pass details:', error);
            }
        };
        fetchGatePass();
    }, [id]);

    if (!gatePass) return <div>Loading...</div>;

    return (
        <div>
            <h2>Gate Pass Details</h2>
            <p>Reason: {gatePass.reason}</p>
            <p>Date: {gatePass.date}</p>
            <p>Status: {gatePass.status}</p>
        </div>
    );
};

export default GatePassDetails;
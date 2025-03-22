import React, { useEffect, useState } from 'react';
import api from '../services/api';

const GatePassList = () => {
    const [gatePasses, setGatePasses] = useState([]);

    useEffect(() => {
        const fetchGatePasses = async () => {
            try {
                const response = await api.getAllGatePasses();
                setGatePasses(response.data);
            } catch (error) {
                console.error('Error fetching gate passes:', error);
            }
        };
        fetchGatePasses();
    }, []);

    return (
        <div>
            <h2>All Gate Passes</h2>
            <ul>
                {gatePasses.map((gatePass) => (
                    <li key={gatePass.id}>
                        <p>Reason: {gatePass.reason}</p>
                        <p>Date: {gatePass.date}</p>
                        <p>Status: {gatePass.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GatePassList;
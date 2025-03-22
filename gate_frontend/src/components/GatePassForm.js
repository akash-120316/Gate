import React, { useState } from 'react';
import api from '../services/api';

const GatePassForm = () => {
    const [formData, setFormData] = useState({
        reason: '',
        date: '',
        studentId: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.applyForGatePass(formData);
            alert('Gate Pass Applied Successfully!');
            console.log(response.data);
        } catch (error) {
            console.error('Error applying for gate pass:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Reason"
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            />
            <input
                type="date"
                placeholder="Date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
            <input
                type="number"
                placeholder="Student ID"
                value={formData.studentId}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
            />
            <button type="submit">Apply</button>
        </form>
    );
};

export default GatePassForm;
import React, { useEffect, useState } from 'react';
import api from '../services/api';

const WardenApproval = () => {
    const [gatePasses, setGatePasses] = useState([]);
    const [approverId, setApproverId] = useState('');

    // Fetch gate passes approved by tutors
    useEffect(() => {
        const fetchApprovedByTutorGatePasses = async () => {
            try {
                const response = await api.getAllGatePasses();
                const approvedByTutorGatePasses = response.data.filter(
                    (gatePass) => gatePass.status === 'APPROVED_BY_TUTOR'
                );
                setGatePasses(approvedByTutorGatePasses);
            } catch (error) {
                console.error('Error fetching gate passes:', error);
            }
        };
        fetchApprovedByTutorGatePasses();
    }, []);

    const handleApprove = async (gatePassId) => {
        const approvalData = {
            gatePassId: gatePassId,
            approverId: approverId,
        };
        try {
            const response = await api.approveByWarden(approvalData);
            alert('Gate Pass Approved by Warden!');
            console.log(response.data);
            // Refresh the list of gate passes
            const updatedGatePasses = gatePasses.filter(
                (gatePass) => gatePass.id !== gatePassId
            );
            setGatePasses(updatedGatePasses);
        } catch (error) {
            console.error('Error approving gate pass:', error);
        }
    };

    const handleReject = async (gatePassId) => {
        try {
            const response = await api.rejectGatePass(gatePassId);
            alert('Gate Pass Rejected by Warden!');
            console.log(response.data);
            // Refresh the list of gate passes
            const updatedGatePasses = gatePasses.filter(
                (gatePass) => gatePass.id !== gatePassId
            );
            setGatePasses(updatedGatePasses);
        } catch (error) {
            console.error('Error rejecting gate pass:', error);
        }
    };

    return (
        <div>
            <h2>Warden Approval</h2>
            <input
                type="number"
                placeholder="Enter Warden ID"
                value={approverId}
                onChange={(e) => setApproverId(e.target.value)}
            />
            <ul>
                {gatePasses.map((gatePass) => (
                    <li key={gatePass.id}>
                        <p>Reason: {gatePass.reason}</p>
                        <p>Date: {gatePass.date}</p>
                        <p>Status: {gatePass.status}</p>
                        <button onClick={() => handleApprove(gatePass.id)}>Approve</button>
                        <button onClick={() => handleReject(gatePass.id)}>Reject</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WardenApproval;
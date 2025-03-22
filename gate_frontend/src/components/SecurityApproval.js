import React, { useEffect, useState } from 'react';
import api from '../services/api';

const SecurityApproval = () => {
    const [gatePasses, setGatePasses] = useState([]);
    const [approverId, setApproverId] = useState('');

    // Fetch gate passes approved by tutors and wardens
    useEffect(() => {
        const fetchApprovedByWardenGatePasses = async () => {
            try {
                const response = await api.getAllGatePasses();
                const approvedByWardenGatePasses = response.data.filter(
                    (gatePass) => gatePass.status === 'APPROVED_BY_TUTOR_AND_WARDEN'
                );
                setGatePasses(approvedByWardenGatePasses);
            } catch (error) {
                console.error('Error fetching gate passes:', error);
            }
        };
        fetchApprovedByWardenGatePasses();
    }, []);

    const handleApprove = async (gatePassId) => {
        const approvalData = {
            gatePassId: gatePassId,
            approverId: approverId,
        };
        try {
            const response = await api.approveBySecurity(approvalData);
            alert('Gate Pass Approved by Security!');
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
            alert('Gate Pass Rejected by Security!');
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
            <h2>Security Approval</h2>
            <input
                type="number"
                placeholder="Enter Security ID"
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

export default SecurityApproval;
import React, { useEffect, useState } from 'react';
import api from '../services/api';

const TutorApproval = () => {
    const [gatePasses, setGatePasses] = useState([]);
    const [approverId, setApproverId] = useState('');

    // Fetch pending gate passes for tutors
    useEffect(() => {
        const fetchPendingGatePasses = async () => {
            try {
                const response = await api.getAllGatePasses();
                const pendingGatePasses = response.data.filter(
                    (gatePass) => gatePass.status === 'PENDING'
                );
                setGatePasses(pendingGatePasses);
            } catch (error) {
                console.error('Error fetching pending gate passes:', error);
            }
        };
        fetchPendingGatePasses();
    }, []);

    const handleApprove = async (gatePassId) => {
        const approvalData = {
            gatePassId: gatePassId,
            approverId: approverId,
        };
        try {
            const response = await api.approveByTutor(approvalData);
            alert('Gate Pass Approved by Tutor!');
            console.log(response.data);
            // Refresh the list of pending gate passes
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
            alert('Gate Pass Rejected by Tutor!');
            console.log(response.data);
            // Refresh the list of pending gate passes
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
            <h2>Tutor Approval</h2>
            <input
                type="number"
                placeholder="Enter Tutor ID"
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

export default TutorApproval;
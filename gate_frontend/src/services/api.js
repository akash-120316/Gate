import axios from 'axios';

const API_URL = 'http://localhost:8080/api/gatepass'; // Replace with your backend URL

const applyForGatePass = (gatePassData) => {
    return axios.post(`${API_URL}/apply/gatepass`, gatePassData);
};

const approveByTutor = (approvalData) => {
    return axios.put(`${API_URL}/approve/tutor`, approvalData);
};

const approveByWarden = (approvalData) => {
    return axios.put(`${API_URL}/approve/warden`, approvalData);
};

const approveBySecurity = (approvalData) => {
    return axios.put(`${API_URL}/approve/security`, approvalData);
};

const rejectGatePass = (gatePassId) => {
    return axios.put(`${API_URL}/reject/${gatePassId}`);
};

const getAllGatePasses = () => {
    return axios.get(API_URL);
};

const getGatePassById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

export default {
    applyForGatePass,
    approveByTutor,
    approveByWarden,
    approveBySecurity,
    rejectGatePass,
    getAllGatePasses,
    getGatePassById,
};
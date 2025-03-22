import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import GatePassForm from './components/GatePassForm';
import GatePassList from './components/GatePassList';
import GatePassDetails from './components/GatePassDetails';
import TutorApproval from './components/TutorApproval';
import WardenApproval from './components/WardenApproval';
import SecurityApproval from './components/SecurityApproval';

const App = () => {
    return (
        <Router>
            <nav>
                <Link to="/">Home</Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/apply/gatepass">Apply for Gate Pass</Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/gatepasses">View Gate Passes</Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/tutor-approval">Tutor Approval</Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/warden-approval">Warden Approval</Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/security-approval">Security Approval</Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
            </nav>
            <Routes>
                <Route path="/apply/gatepass" element={<GatePassForm />} />
                <Route path="/gatepasses" element={<GatePassList />} />
                <Route path="/gatepasses/:id" element={<GatePassDetails />} />
                <Route path="/tutor-approval" element={<TutorApproval />} />
                <Route path="/warden-approval" element={<WardenApproval />} />
                <Route path="/security-approval" element={<SecurityApproval />} />
            </Routes>
        </Router>
    );
};

export default App;
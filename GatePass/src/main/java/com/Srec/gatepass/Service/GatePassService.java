package com.Srec.gatepass.Service;


import com.Srec.gatepass.Dto.ApprovalDTO;
import com.Srec.gatepass.Dto.GatePassDTO;
import com.Srec.gatepass.Dto.GatePassResponseDTO;

import java.util.List;

public  interface GatePassService {
    GatePassResponseDTO applyForGatePass(GatePassDTO gatePassDTO);
    GatePassResponseDTO approveByTutor(ApprovalDTO approvalDTO);
    GatePassResponseDTO approveByWarden(ApprovalDTO approvalDTO);
    GatePassResponseDTO approveBySecurity(ApprovalDTO approvalDTO);
    GatePassResponseDTO rejectGatePass(Long gatePassId);
    List<GatePassResponseDTO> getAllGatePasses();
    GatePassResponseDTO getGatePassById(Long id);

}
package com.Srec.gatepass.Controller;


import com.Srec.gatepass.Dto.ApprovalDTO;
import com.Srec.gatepass.Dto.GatePassDTO;
import com.Srec.gatepass.Dto.GatePassResponseDTO;
import com.Srec.gatepass.Service.GatePassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gatepass")
public class GatePassController {

    @Autowired
    private GatePassService gatePassService;

    @PostMapping("/apply/gatepass")
    public ResponseEntity<GatePassResponseDTO> applyForGatePass(@RequestBody GatePassDTO gatePassDTO) {
        return ResponseEntity.ok(gatePassService.applyForGatePass(gatePassDTO));
    }

    @PutMapping("/approve/tutor")
    public ResponseEntity<GatePassResponseDTO> approveByTutor(@RequestBody ApprovalDTO approvalDTO) {
        return ResponseEntity.ok(gatePassService.approveByTutor(approvalDTO));
    }

    @PutMapping("/approve/warden")
    public ResponseEntity<GatePassResponseDTO> approveByWarden(@RequestBody ApprovalDTO approvalDTO) {
        return ResponseEntity.ok(gatePassService.approveByWarden(approvalDTO));
    }

    @PutMapping("/approve/security")
    public ResponseEntity<GatePassResponseDTO> approveBySecurity(@RequestBody ApprovalDTO approvalDTO) {
        return ResponseEntity.ok(gatePassService.approveBySecurity(approvalDTO));
    }

    @PutMapping("/reject/{gatePassId}")
    public ResponseEntity<GatePassResponseDTO> rejectGatePass(@PathVariable Long gatePassId) {
        return ResponseEntity.ok(gatePassService.rejectGatePass(gatePassId));
    }

    @GetMapping
    public ResponseEntity<List<GatePassResponseDTO>> getAllGatePasses() {
        return ResponseEntity.ok(gatePassService.getAllGatePasses());
    }

    @GetMapping("/{id}")
    public ResponseEntity<GatePassResponseDTO> getGatePassById(@PathVariable Long id) {
        return ResponseEntity.ok(gatePassService.getGatePassById(id));
    }
}
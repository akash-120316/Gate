package com.Srec.gatepass.ServiceImplementation;

import com.Srec.gatepass.Dto.*;
import com.Srec.gatepass.Entity.*;
import com.Srec.gatepass.Repository.*;
import com.Srec.gatepass.Service.GatePassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GatePassServiceImpl implements GatePassService {

    @Autowired
    private GatePassRepository gatePassRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private TutorRepository tutorRepository;

    @Autowired
    private WardenRepository wardenRepository;

    @Autowired
    private SecurityRepository securityRepository;

    @Override
    public GatePassResponseDTO applyForGatePass(GatePassDTO gatePassDTO) {
        Student student = studentRepository.findById(gatePassDTO.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        GatePass gatePass = new GatePass();
        gatePass.setReason(gatePassDTO.getReason());
        gatePass.setDate(gatePassDTO.getDate());
        gatePass.setStatus("PENDING");
        gatePass.setStudent(student);

        GatePass savedGatePass = gatePassRepository.save(gatePass);
        return mapToGatePassResponseDTO(savedGatePass);
    }

    @Override
    public GatePassResponseDTO approveByTutor(ApprovalDTO approvalDTO) {
        GatePass gatePass = gatePassRepository.findById(approvalDTO.getGatePassId())
                .orElseThrow(() -> new RuntimeException("GatePass not found"));

        if (!gatePass.getStatus().equals("PENDING")) {
            throw new RuntimeException("Gate pass is not in PENDING status");
        }

        Tutor tutor = tutorRepository.findById(approvalDTO.getApproverId())
                .orElseThrow(() -> new RuntimeException("Tutor not found"));

        if ("ACCEPTED".equalsIgnoreCase(approvalDTO.getStatus())) {
            gatePass.setTutor(tutor);
            gatePass.setStatus("APPROVED_BY_TUTOR");
        } else if ("REJECTED".equalsIgnoreCase(approvalDTO.getStatus())) {
            gatePass.setStatus("REJECTED_BY_TUTOR");
            gatePass.setTutor(tutor);
        } else {
            throw new RuntimeException("Invalid status. Must be ACCEPTED or REJECTED.");
        }

        GatePass updatedGatePass = gatePassRepository.save(gatePass);
        return mapToGatePassResponseDTO(updatedGatePass);
    }

    @Override
    public GatePassResponseDTO approveByWarden(ApprovalDTO approvalDTO) {
        GatePass gatePass = gatePassRepository.findById(approvalDTO.getGatePassId())
                .orElseThrow(() -> new RuntimeException("GatePass not found"));

        if (!gatePass.getStatus().equals("APPROVED_BY_TUTOR")) {
            throw new RuntimeException("Gate pass is not in APPROVED_BY_TUTOR status");
        }

        Warden warden = wardenRepository.findById(approvalDTO.getApproverId())
                .orElseThrow(() -> new RuntimeException("Warden not found"));

        if ("ACCEPTED".equalsIgnoreCase(approvalDTO.getStatus())) {
            gatePass.setWarden(warden);
            gatePass.setStatus("APPROVED_BY_TUTOR_AND_WARDEN");
        } else if ("REJECTED".equalsIgnoreCase(approvalDTO.getStatus())) {
            gatePass.setStatus("REJECTED_BY_WARDEN");
            gatePass.setWarden(warden);
        } else {
            throw new RuntimeException("Invalid status. Must be ACCEPTED or REJECTED.");
        }

        GatePass updatedGatePass = gatePassRepository.save(gatePass);
        return mapToGatePassResponseDTO(updatedGatePass);
    }

    @Override
    public GatePassResponseDTO approveBySecurity(ApprovalDTO approvalDTO) {
        GatePass gatePass = gatePassRepository.findById(approvalDTO.getGatePassId())
                .orElseThrow(() -> new RuntimeException("GatePass not found"));

        if (!gatePass.getStatus().equals("APPROVED_BY_TUTOR_AND_WARDEN")) {
            throw new RuntimeException("Gate pass is not in APPROVED_BY_TUTOR_AND_WARDEN status");
        }

        Security security = securityRepository.findById(approvalDTO.getApproverId())
                .orElseThrow(() -> new RuntimeException("Security not found"));

        if ("ACCEPTED".equalsIgnoreCase(approvalDTO.getStatus())) {
            gatePass.setSecurity(security);
            gatePass.setStatus("PASS_AVAILED_BY_STUDENT");
        } else if ("REJECTED".equalsIgnoreCase(approvalDTO.getStatus())) {
            gatePass.setStatus("REJECTED_BY_SECURITY");
            gatePass.setSecurity(security);
        } else {
            throw new RuntimeException("Invalid status. Must be ACCEPTED or REJECTED.");
        }

        GatePass updatedGatePass = gatePassRepository.save(gatePass);
        return mapToGatePassResponseDTO(updatedGatePass);
    }

    @Override
    public GatePassResponseDTO rejectGatePass(Long gatePassId) {
        GatePass gatePass = gatePassRepository.findById(gatePassId)
                .orElseThrow(() -> new RuntimeException("GatePass not found"));
        gatePass.setStatus("REJECTED");
        GatePass updatedGatePass = gatePassRepository.save(gatePass);
        return mapToGatePassResponseDTO(updatedGatePass);
    }

    @Override
    public List<GatePassResponseDTO> getAllGatePasses() {
        return gatePassRepository.findAll().stream()
                .map(this::mapToGatePassResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public GatePassResponseDTO getGatePassById(Long id) {
        GatePass gatePass = gatePassRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("GatePass not found"));
        return mapToGatePassResponseDTO(gatePass);
    }

    private GatePassResponseDTO mapToGatePassResponseDTO(GatePass gatePass) {
        GatePassResponseDTO responseDTO = new GatePassResponseDTO();
        responseDTO.setId(gatePass.getId());
        responseDTO.setReason(gatePass.getReason());
        responseDTO.setDate(gatePass.getDate());
        responseDTO.setStatus(gatePass.getStatus());
        responseDTO.setStudentId(gatePass.getStudent().getId());
        responseDTO.setTutorId(gatePass.getTutor() != null ? gatePass.getTutor().getId() : null);
        responseDTO.setWardenId(gatePass.getWarden() != null ? gatePass.getWarden().getId() : null);
        responseDTO.setSecurityId(gatePass.getSecurity() != null ? gatePass.getSecurity().getId() : null);
        return responseDTO;
    }
}
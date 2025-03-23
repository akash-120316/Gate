package com.Srec.gatepass.Dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class GatePassResponseDTO {
    private Long id;
    private String reason;
    private String date;
    private String status;
    private Long studentId;
    private Long tutorId;
    private Long wardenId;
    private Long securityId;

}
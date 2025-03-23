package com.Srec.gatepass.Dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class ApprovalDTO {
    private Long gatePassId;
    private Long approverId;
    private String status;


}
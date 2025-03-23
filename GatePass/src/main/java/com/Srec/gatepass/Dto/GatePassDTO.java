package com.Srec.gatepass.Dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class GatePassDTO {
    private String reason;
    private String date;
    private Long studentId;


}
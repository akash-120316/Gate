package com.Srec.gatepass.Dto;

public class ApprovalDTO {
    private Long gatePassId;
    private Long approverId;
    private String status;


    public Long getGatePassId() {
        return gatePassId;
    }

    public void setGatePassId(Long gatePassId) {
        this.gatePassId = gatePassId;
    }

    public Long getApproverId() {
        return approverId;
    }

    public void setApproverId(Long approverId) {
        this.approverId = approverId;
    }
    public String getStatus(){
        return status;
    }
    public void setStatus(String status){
        this.status=status;
    }
}
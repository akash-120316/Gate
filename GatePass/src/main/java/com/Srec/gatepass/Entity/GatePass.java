package com.Srec.gatepass.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;

@Getter
@Entity
@Data
public class GatePass {
    // Getters and Setters
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String reason;
    private String date;
    private String status; // PENDING, APPROVED_BY_TUTOR, APPROVED_BY_WARDEN, REJECTED, APPROVED

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "tutor_id")
    private Tutor tutor;

    @ManyToOne
    @JoinColumn(name = "warden_id")
    private Warden warden;

    @ManyToOne
    @JoinColumn(name = "security_id")
    private Security security;


}
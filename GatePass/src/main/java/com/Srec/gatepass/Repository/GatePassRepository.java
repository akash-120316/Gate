package com.Srec.gatepass.Repository;


import com.Srec.gatepass.Entity.GatePass;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GatePassRepository extends JpaRepository<GatePass, Long> {}
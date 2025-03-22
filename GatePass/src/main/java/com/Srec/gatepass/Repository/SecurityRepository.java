package com.Srec.gatepass.Repository;


import com.Srec.gatepass.Entity.Security;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SecurityRepository extends JpaRepository<Security, Long> {
}
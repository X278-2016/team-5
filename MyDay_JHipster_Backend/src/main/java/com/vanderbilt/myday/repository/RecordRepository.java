package com.vanderbilt.myday.repository;

import com.vanderbilt.myday.domain.Record;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Record entity.
 */
@SuppressWarnings("unused")
public interface RecordRepository extends JpaRepository<Record,Long> {

}

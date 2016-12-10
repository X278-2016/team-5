package org.jhipster.com.repository;

import org.jhipster.com.domain.Record;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Record entity.
 */
@SuppressWarnings("unused")
public interface RecordRepository extends JpaRepository<Record,Long> {

}

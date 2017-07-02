package co.com.fixit.repository;

import co.com.fixit.domain.WorkTypeCategory;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the WorkTypeCategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WorkTypeCategoryRepository extends JpaRepository<WorkTypeCategory,Long> {
    
}

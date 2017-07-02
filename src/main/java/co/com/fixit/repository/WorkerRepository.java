package co.com.fixit.repository;

import co.com.fixit.domain.Worker;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the Worker entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WorkerRepository extends JpaRepository<Worker,Long> {

    @Query("select worker from Worker worker where worker.user.login = ?#{principal.username}")
    List<Worker> findByUserIsCurrentUser();
    
}

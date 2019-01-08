package at.bartendr.backend.model;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LocationRepository extends PagingAndSortingRepository<Location, Long> {

    public Optional<Location> findByName(@Param("name") String name);
}

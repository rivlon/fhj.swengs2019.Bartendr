package at.bartendr.backend.model;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DrinkRepository extends PagingAndSortingRepository<Drink, Long> {

    public Optional<Drink> findByName(@Param("name") String name);
}

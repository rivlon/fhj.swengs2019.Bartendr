package at.bartendr.backend.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Optional;

@RepositoryRestResource()
public interface MediaRepository extends PagingAndSortingRepository<Media, Long>, JpaRepository<Media, Long>, CrudRepository<Media, Long> {
    public Optional<Media> findById(@Param("mediaId") Long id);
}

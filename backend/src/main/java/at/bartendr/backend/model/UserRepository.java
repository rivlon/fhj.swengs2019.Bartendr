package at.bartendr.backend.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@RepositoryRestResource
@Transactional(isolation = Isolation.READ_COMMITTED)
public interface UserRepository extends PagingAndSortingRepository<User, Long>, JpaRepository<User, Long>, CrudRepository<User, Long> {

    User findByUsername(String username);

    public Optional<User> findByIdAndActiveTrue(@Param("id") Long id);

    public Optional<User> findByUsernameAndActiveTrue(@Param("id") String username);

    public List<User> findAllByActiveTrue();

    public List<User> findAllByActiveFalse();

    public List<User> findAll();

}

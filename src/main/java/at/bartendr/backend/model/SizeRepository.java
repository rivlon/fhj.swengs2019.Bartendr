package at.bartendr.backend.model;

import org.springframework.data.convert.ReadingConverter;
import org.springframework.data.repository.PagingAndSortingRepository;

@ReadingConverter
public interface SizeRepository extends PagingAndSortingRepository {
}

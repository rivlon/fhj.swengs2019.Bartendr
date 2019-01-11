package at.bartendr.backend.service;

import at.bartendr.backend.model.Location;
import at.bartendr.backend.model.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service()
public class LocationService {

    @Autowired
    private LocationRepository locationRepository;

    public Optional<Location> findById(Long id) {
        return locationRepository.findById(id);
    }


    public Location save(Location entity) {
        return locationRepository.save(entity);
    }
}

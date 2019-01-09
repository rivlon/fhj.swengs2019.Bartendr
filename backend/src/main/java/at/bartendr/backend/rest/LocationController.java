package at.bartendr.backend.rest;

import at.bartendr.backend.model.Location;
import at.bartendr.backend.model.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.xml.ws.Response;
import java.util.Optional;

@RestController
public class LocationController {

    @Autowired
    private LocationRepository locationRepository;

    @RequestMapping(value = "/location", method = RequestMethod.GET)
    ResponseEntity<Iterable> getAllLocations() {
        Iterable<Location> locations = locationRepository.findAll();
        if (locations == null || !locations.iterator().hasNext()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(locations, HttpStatus.OK);
        }
    }

    @RequestMapping(value = "/locations/{id}", method = RequestMethod.GET)
    Location getLocation(@PathVariable Long id) {
        Optional<Location> locationOptional = locationRepository.findById(id);
        if (locationOptional.isPresent()) {
            return locationOptional.get();
        } else {
            throw new LocationNotFoundException("This location doesn't seem to exist.");
        }
    }

    @RequestMapping(value = "/locations/{id}", method = RequestMethod.DELETE)
    ResponseEntity<Location> deleteLocation(@PathVariable Long id) {
        Optional<Location> locationOptional = locationRepository.findById(id);
        if (!locationOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            Location location = locationOptional.get();
            locationRepository.delete(location);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @RequestMapping(value = "/locations", method = RequestMethod.POST)
    ResponseEntity<Location> createLocation(@RequestBody Location location, UriComponentsBuilder ucBuilder) {
        locationRepository.save(location);
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(ucBuilder.path("/locations/{id}").buildAndExpand(location.getId()).toUri());
        return new ResponseEntity<>(headers, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/locations/{id}", method = RequestMethod.PUT)
    ResponseEntity<Location> updateLocation(@PathVariable Long id, @RequestBody Location locationUpdate) {
        Optional<Location> locationOptional = locationRepository.findById(id);
        if (!locationOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            locationUpdate.setId(id);
            locationRepository.save(locationUpdate);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    private class LocationNotFoundException extends RuntimeException {
        public LocationNotFoundException(String message) {
            super(message);
        }
    }
}

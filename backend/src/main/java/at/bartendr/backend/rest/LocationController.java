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

    @RequestMapping(value = "/places", method = RequestMethod.GET)
    ResponseEntity<Iterable> getAllLocations() {
        Iterable<Location> places = locationRepository.findAll();
        if (places == null || !places.iterator().hasNext()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(places, HttpStatus.OK);
        }
    }

    @RequestMapping(value = "/places/{id}", method = RequestMethod.GET)
    Location getLocation(@PathVariable Long id) {
        Optional<Location> placeOptional = locationRepository.findById(id);
        if (placeOptional.isPresent()) {
            return placeOptional.get();
        } else {
            throw new LocationNotFoundException("This place doesn't seem to exist.");
        }
    }

    @RequestMapping(value = "/places/{id}", method = RequestMethod.DELETE)
    ResponseEntity<Location> deleteLocation(@PathVariable Long id) {
        Optional<Location> placeOptional = locationRepository.findById(id);
        if (!placeOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            Location place = placeOptional.get();
            locationRepository.delete(place);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @RequestMapping(value = "/places", method = RequestMethod.POST)
    ResponseEntity<Location> createLocation(@RequestBody Location place, UriComponentsBuilder ucBuilder) {
        locationRepository.save(place);
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(ucBuilder.path("/places/{id}").buildAndExpand(place.getId()).toUri());
        return new ResponseEntity<>(headers, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/places/{id}", method = RequestMethod.PUT)
    ResponseEntity<Location> updateLocation(@PathVariable Long id, @RequestBody Location placeUpdate) {
        Optional<Location> placeOptional = locationRepository.findById(id);
        if (!placeOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            placeUpdate.setId(id);
            locationRepository.save(placeUpdate);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    private class LocationNotFoundException extends RuntimeException {
        public LocationNotFoundException(String message) {
            super(message);
        }
    }
}

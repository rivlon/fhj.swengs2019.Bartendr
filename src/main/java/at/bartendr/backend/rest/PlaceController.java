package at.bartendr.backend.rest;

import at.bartendr.backend.model.Place;
import at.bartendr.backend.model.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.xml.ws.Response;
import java.util.Optional;

@RestController
public class PlaceController {

    @Autowired
    private PlaceRepository placeRepository;

    @RequestMapping(value = "/places", method = RequestMethod.GET)
    ResponseEntity<Iterable<Place>> getAllPlaces() {
        Iterable<Place> places = placeRepository.findAll();
        if (places == null || !places.iterator().hasNext()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(places, HttpStatus.OK);
        }
    }

    @RequestMapping(value = "/places/{id}", method = RequestMethod.GET)
    Place getPlace(@PathVariable Long id) {
        Optional<Place> placeOptional = placeRepository.findById(id);
        if (placeOptional.isPresent()) {
            return placeOptional.get();
        } else {
            throw new PlaceNotFoundException("This place doesn't seem to exist.");
        }
    }

    @RequestMapping(value = "/places/{id}", method = RequestMethod.DELETE)
    ResponseEntity<Place> deletePlace(@PathVariable Long id) {
        Optional<Place> placeOptional = placeRepository.findById(id);
        if (!placeOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            Place place = placeOptional.get();
            placeRepository.delete(place);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @RequestMapping(value = "/places", method = RequestMethod.POST)
    ResponseEntity<Place> createPlace(@RequestBody Place place, UriComponentsBuilder ucBuilder) {
        placeRepository.save(place);
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(ucBuilder.path("/places/{id}").buildAndExpand(place.getId()).toUri());
        return new ResponseEntity<>(headers, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/places/{id}", method = RequestMethod.PUT)
    ResponseEntity<Place> updatePlace(@PathVariable Long id, @RequestBody Place placeUpdate) {
        Optional<Place> placeOptional = placeRepository.findById(id);
        if (!placeOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            placeUpdate.setId(id);
            placeRepository.save(placeUpdate);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    private class PlaceNotFoundException extends RuntimeException {
        public PlaceNotFoundException(String message) {
            super(message);
        }
    }
}

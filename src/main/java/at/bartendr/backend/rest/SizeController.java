package at.bartendr.backend.rest;

import at.bartendr.backend.model.Size;
import at.bartendr.backend.model.SizeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Optional;

@RestController
public class SizeController {

    @Autowired
    private SizeRepository sizeRepository;

    @RequestMapping(value = "/sizes", method = RequestMethod.GET)
    ResponseEntity<Iterable<Size>> getAllSizes() {
        Iterable<Size> sizes = sizeRepository.findAll();
        if (sizes == null || !sizes.iterator().hasNext()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(sizes, HttpStatus.OK);
        }
    }

    @RequestMapping(value = "/sizes/{id}", method = RequestMethod.GET)
    Size getSize(@PathVariable Long id) {
        Optional<Size> sizeOptional = sizeRepository.findById(id);
        if (sizeOptional.isPresent()) {
            return sizeOptional.get();
        } else {
            throw new SizeNotFoundException("This size doesn't seem to exist.");
        }
    }

    @RequestMapping(value = "/sizes/{id}", method = RequestMethod.DELETE)
    ResponseEntity<Size> deleteSize(@PathVariable Long id) {
        Optional<Size> sizeOptional = sizeRepository.findById(id);
        if (!sizeOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            Size size = sizeOptional.get();
            sizeRepository.delete(size);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @RequestMapping(value = "/sizes", method = RequestMethod.POST)
    ResponseEntity<Size> createSize(@RequestBody Size size, UriComponentsBuilder ucBuilder) {
        sizeRepository.save(size);
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(ucBuilder.path("/sizes/{id}").buildAndExpand(size.getId()).toUri());
        return new ResponseEntity<>(headers, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/sizes/{id}", method = RequestMethod.PUT)
    ResponseEntity<Size> updateSize(@PathVariable Long id, @RequestBody Size sizeUpdate) {
        Optional<Size> sizeOptional = sizeRepository.findById(id);
        if (!sizeOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            sizeUpdate.setId(id);
            sizeRepository.save(sizeUpdate);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    private class SizeNotFoundException extends RuntimeException {
        public SizeNotFoundException(String message) {
            super(message);
        }
    }
}

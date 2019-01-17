package at.bartendr.backend.controller;

import at.bartendr.backend.dto.LocationDTO;
import at.bartendr.backend.facade.LocationFacade;
import at.bartendr.backend.model.Location;
import at.bartendr.backend.model.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import javax.xml.ws.Response;
import java.util.List;
import java.util.Optional;

@RestController
public class LocationController {

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private LocationFacade locationFacade;

    @GetMapping("/dto/locations")
    List<LocationDTO> getAllLocations() {
        return locationFacade.getAllLocations();
    }

    @GetMapping("/dto/locations/{id}")
    LocationDTO getById(@PathVariable Long id) {
        return locationFacade.getById(id);
    }


    @PostMapping("/dto/locations")
    LocationDTO create(@RequestBody @Valid LocationDTO dto) {
        return locationFacade.create(dto);
    }

    @PutMapping("/dto/locations/{id}")
    LocationDTO update(@RequestBody @Valid LocationDTO dto, @PathVariable Long id) {
        return locationFacade.update(id, dto);
    }

    @DeleteMapping("/dto/locations/{id}")
    void delete(@PathVariable Long id) {
        this.locationFacade.delete(id);
    }
}

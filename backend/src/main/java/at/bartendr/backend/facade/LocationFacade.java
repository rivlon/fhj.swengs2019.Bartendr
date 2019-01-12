package at.bartendr.backend.facade;
import at.bartendr.backend.dto.LocationDTO;
import at.bartendr.backend.model.Drink;
import at.bartendr.backend.model.Location;
import at.bartendr.backend.service.DrinkService;
import at.bartendr.backend.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service()
@Transactional
public class LocationFacade {

    @Autowired
    private DrinkService drinkService;

    @Autowired
    private LocationService locationService;

    void mapDtoToEntity(LocationDTO dto, Location entity) {
        entity.setName(dto.getName());
        entity.setPlusCode(dto.getPlusCode());
        entity.setRating(dto.getRating());
        entity.setDrinks(drinkService.getDrinks(dto.getDrinks()));
    }

    private void mapEntityToDto(Location entity, LocationDTO dto) {
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setPlusCode(entity.getPlusCode());
        dto.setRating(entity.getRating());
        dto.setDrinks(entity.getDrinks().stream().map((m) -> m.getId()).collect(Collectors.toSet()));
    }

    public LocationDTO update(long id, LocationDTO dto) {
        Location entity = locationService.findById(id).get();
        mapDtoToEntity(dto, entity);
        mapEntityToDto(locationService.save(entity), dto);
        return dto;
    }

    public LocationDTO create(LocationDTO dto) {
        Location entity = new Location();
        mapDtoToEntity(dto, entity);
        mapEntityToDto(locationService.save(entity), dto);
        return dto;
    }

    public LocationDTO getById(long id) {
        Location entity = locationService.findById(id).get();
        LocationDTO dto = new LocationDTO();
        mapEntityToDto(entity, dto);
        return dto;
    }

}

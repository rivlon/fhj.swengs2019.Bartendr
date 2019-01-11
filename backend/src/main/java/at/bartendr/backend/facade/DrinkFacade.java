package at.bartendr.backend.facade;
import at.bartendr.backend.dto.DrinkDTO;
import at.bartendr.backend.model.Drink;
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
public class DrinkFacade {

    @Autowired
    private DrinkService drinkService;

    @Autowired
    private LocationService locationService;

    void mapDtoToEntity(DrinkDTO dto, Drink entity) {
        entity.setName(dto.getName());
        entity.setCategory(dto.getCategory());
        entity.setPrice(dto.getPrice());
        entity.setAge(dto.getAge());
        entity.setRating(dto.getRating());
        entity.setLocations(dto.getLocations());

    }

    private void mapEntityToDto(Drink entity, DrinkDTO dto) {
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setPrice(entity.getPrice());
        dto.setAge(entity.getAge());
        dto.setRating(entity.getRating());
        dto.setLocations(entity.getLocations());
    }

    public DrinkDTO update(Long id, DrinkDTO dto) {
        Drink entity = drinkService.findById(id).get();
        mapDtoToEntity(dto, entity);
        mapEntityToDto(drinkService.save(entity), dto);
        return dto;
    }

    public DrinkDTO create(DrinkDTO dto) {
        Drink entity = new Drink();
        mapDtoToEntity(dto, entity);
        mapEntityToDto(drinkService.save(entity), dto);
        return dto;
    }

    public DrinkDTO getById(Long id) {
        Drink entity = drinkService.findById(id).get();
        DrinkDTO dto = new DrinkDTO();
        mapEntityToDto(entity, dto);
        return dto;
    }

}

package at.bartendr.backend.facade;

import at.bartendr.backend.dto.DrinkDTO;
import at.bartendr.backend.model.Drink;
import at.bartendr.backend.service.DrinkService;
import at.bartendr.backend.service.LocationService;
import at.bartendr.backend.service.MediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service()
@Transactional
public class DrinkFacade {

    @Autowired
    private DrinkService drinkService;

    @Autowired
    private LocationService locationService;

    @Autowired
    private MediaService mediaService;

    void mapDtoToEntity(DrinkDTO dto, Drink entity) {
        entity.setName(dto.getName());
        entity.setCategory(dto.getCategory());
        entity.setPrice(dto.getPrice());
        entity.setAge(dto.getAge());
        entity.setRating(dto.getRating());
        entity.setPictures(dto.getPictures());
        entity.setLocations(locationService.findById(
                dto.getLocationID()
        ).get());
    }


    private void mapEntityToDto(Drink entity, DrinkDTO dto) {
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setCategory(entity.getCategory());
        dto.setPrice(entity.getPrice());
        dto.setAge(entity.getAge());
        dto.setRating(entity.getRating());
        dto.setPictures(entity.getPictures());
        dto.setLocationID(entity.getLocations().getId());
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

    public void delete(Long id) {
        Drink entity = drinkService.findById(id).get();
        drinkService.delete(entity);
    }

    public List<DrinkDTO> getAllDrinks() {
        List<DrinkDTO> drinks = new ArrayList<>();

        drinkService.getDrinks().forEach(entity -> {
            DrinkDTO dto = new DrinkDTO();
            mapEntityToDto(entity, dto);
            drinks.add(dto);
        });

        return drinks;
    }

}
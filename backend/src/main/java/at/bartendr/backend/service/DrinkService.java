package at.bartendr.backend.service;

import at.bartendr.backend.model.Drink;
import at.bartendr.backend.model.DrinkRepository;
import at.bartendr.backend.model.Media;
import at.bartendr.backend.model.MediaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service()
public class DrinkService {

    @Autowired
    private DrinkRepository drinkRepository;

    @Autowired
    private MediaRepository mediaRepository;

    public Optional<Drink> findById(Long id) {
        return drinkRepository.findById(id);
    }

    public Drink save(Drink entity) {
        if (entity.getPictures().size() <= 1) {
            return drinkRepository.save(entity);
        } else {
            entity.setPictures(Collections.emptySet());
            return drinkRepository.save(entity);
        }
    }

    public Set<Drink> getDrinks(Set<Long> dtos) {
        Set<Drink> entities = new HashSet<>();
        if(dtos != null)
            dtos.forEach((dto)->entities.add(drinkRepository.findById(dto).get()));
        return entities;
    }

    public void delete(Drink entity) {
        List<Media> pictures = new ArrayList<>(entity.getPictures());
        for (Media picture : pictures) {
            this.mediaRepository.delete(picture);
        }
        this.drinkRepository.delete(entity);
    }

    public List<Drink> getDrinks(){ return drinkRepository.findAll();}
}


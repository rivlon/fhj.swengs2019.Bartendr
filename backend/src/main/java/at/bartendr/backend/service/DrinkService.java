package at.bartendr.backend.service;

import at.bartendr.backend.model.Drink;
import at.bartendr.backend.model.DrinkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service()
public class DrinkService {

    @Autowired
    private DrinkRepository drinkRepository;

    public Optional<Drink> findById(Long id) {
        return drinkRepository.findById(id);
    }


    public Drink save(Drink entity) {
        return drinkRepository.save(entity);
    }

    public Set<Drink> getDrinks(Set<Long> dtos) {
        Set<Drink> entities = new HashSet<>();

        if(dtos != null)
            dtos.forEach((dto)->entities.add(drinkRepository.findById(dto).get()));
        return entities;
    }

}


package at.bartendr.backend.rest;

import at.bartendr.backend.model.Drink;
import at.bartendr.backend.model.DrinkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Optional;

@RestController
public class DrinkController {

    @Autowired
    private DrinkRepository drinkRepository;

    @RequestMapping(value = "/drinks", method = RequestMethod.GET)
    ResponseEntity<Iterable<Drink>> getAllDrinks() {
        Iterable<Drink> drinks = drinkRepository.findAll();
        if (drinks == null || !drinks.iterator().hasNext()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(drinks, HttpStatus.OK);
        }
    }

    @RequestMapping(value = "/drinks/{id}", method = RequestMethod.GET)
    Drink getDrink(@PathVariable Long id) {
        Optional<Drink> drinkOptional = drinkRepository.findById(id);
        if (drinkOptional.isPresent()) {
            return drinkOptional.get();
        } else {
            throw new DrinkNotFoundException("Mei Bier is net deppat (owa a net do).");
        }
    }

    @RequestMapping(value = "/drinks/{id}", method = RequestMethod.DELETE)
    ResponseEntity<Drink> deleteDrink(@PathVariable Long id) {
        Optional<Drink> drinkOptional = drinkRepository.findById(id);
        if (!drinkOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            Drink drink = drinkOptional.get();
            drinkRepository.delete(drink);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @RequestMapping(value = "/drinks", method = RequestMethod.POST)
    ResponseEntity<Drink> createDrink(@RequestBody Drink drink, UriComponentsBuilder ucBuilder) {
        drinkRepository.save(drink);
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(ucBuilder.path("/drinks/{id}").buildAndExpand(drink.getId()).toUri());
        return new ResponseEntity<>(headers, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/drinks/{id}", method = RequestMethod.PUT)
    ResponseEntity<Drink> updateDrink(@PathVariable Long id, @RequestBody Drink drinkUpdate) {
        Optional<Drink> drinkOptional = drinkRepository.findById(id);
        if (!drinkOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            drinkUpdate.setId(id);
            drinkRepository.save(drinkUpdate);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    private class DrinkNotFoundException extends RuntimeException {
        public DrinkNotFoundException(String message) {
            super(message);
        }
    }
}

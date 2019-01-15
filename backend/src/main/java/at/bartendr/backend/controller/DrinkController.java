package at.bartendr.backend.controller;

import at.bartendr.backend.dto.DrinkDTO;
import at.bartendr.backend.facade.DrinkFacade;
import at.bartendr.backend.model.Drink;
import at.bartendr.backend.model.DrinkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
public class DrinkController {

    @Autowired
    private DrinkFacade drinkFacade;

    @GetMapping("/dto/drinks/{id}")
    DrinkDTO getById(@PathVariable long id) {
        return drinkFacade.getById(id);
    }


    @PostMapping("/dto/drinks")
    DrinkDTO create(@RequestBody @Valid DrinkDTO dto) {
        return drinkFacade.create(dto);
    }

    @PutMapping("/dto/drinks/{id}")
    DrinkDTO update(@RequestBody @Valid DrinkDTO dto, @PathVariable long id) {
        return drinkFacade.update(id, dto);
    }

    @DeleteMapping("/dto/drinks/{id}")
    void delete(@PathVariable long id) {
        this.drinkFacade.delete(id);
    }
}
















































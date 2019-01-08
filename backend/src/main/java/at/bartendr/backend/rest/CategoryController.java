package at.bartendr.backend.rest;

import at.bartendr.backend.model.Category;
import at.bartendr.backend.model.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Optional;

@RestController
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @RequestMapping(value = "/categories", method = RequestMethod.GET)
    ResponseEntity<Iterable<Category>> getAllCategories() {
        Iterable<Category> categories = categoryRepository.findAll();
        if (categories == null || !categories.iterator().hasNext()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(categories, HttpStatus.OK);
        }
    }

    @RequestMapping(value = "/categories/{id}", method = RequestMethod.GET)
    Category getCategory(@PathVariable Long id) {
        Optional<Category> categoryOptional = categoryRepository.findById(id);
        if (categoryOptional.isPresent()) {
            return categoryOptional.get();
        } else {
            throw new CategoryNotFoundException("Sorry, that category doesn't exist.");
        }
    }

    @RequestMapping(value = "/categories/{id}", method = RequestMethod.DELETE)
    ResponseEntity<Category> deleteCategory(@PathVariable Long id) {
        Optional<Category> categoryOptional = categoryRepository.findById(id);
        if (!categoryOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            Category category = categoryOptional.get();
            categoryRepository.delete(category);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @RequestMapping(value = "/categories", method = RequestMethod.POST)
    ResponseEntity<Category> createCategory(@RequestBody Category category, UriComponentsBuilder ucBuilder) {
        categoryRepository.save(category);
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(ucBuilder.path("/categories/{id}").buildAndExpand(category.getId()).toUri());
        return new ResponseEntity<>(headers, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/categories/{id}", method = RequestMethod.PUT)
    ResponseEntity<Category> updateCategory(@PathVariable Long id, @RequestBody Category categoryUpdate) {
        Optional<Category> categoryOptional = categoryRepository.findById(id);
        if (!categoryOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            categoryUpdate.setId(id);
            categoryRepository.save(categoryUpdate);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    private class CategoryNotFoundException extends RuntimeException {
        public CategoryNotFoundException(String message) {
            super(message);
        }
    }
}

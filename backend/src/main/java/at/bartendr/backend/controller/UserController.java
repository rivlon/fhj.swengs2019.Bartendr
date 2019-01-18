package at.bartendr.backend.controller;

import at.bartendr.backend.dto.UserDTO;
import at.bartendr.backend.facade.UserFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    private UserFacade userFacade;

    @GetMapping("/dto/users/")
    List<UserDTO> getAllUsers() {
        return userFacade.getAllUsers();
    }

    @GetMapping("/dto/users/active")
    List<UserDTO> getAllActiveUsers() {
        return userFacade.getAllActiveUsers();
    }

    @GetMapping("/dto/users/inactive")
    List<UserDTO> getAllInActiveUsers() {
        return userFacade.getAllInactiveUsers();
    }

    @GetMapping("/dto/users/{id}")
    UserDTO getById(@PathVariable Long id) {
        return userFacade.getById(id);
    }

    @GetMapping("/dto/users:{username}")
    UserDTO getById(@PathVariable String username) {
        return userFacade.getByUsername(username);
    }


    @PostMapping("/dto/users/")
    UserDTO create(@RequestBody @Valid UserDTO dto) {
        return userFacade.create(dto);
    }

    @PutMapping("/dto/users/{id}")
    UserDTO update(@RequestBody @Valid UserDTO dto, @PathVariable Long id) {
        return userFacade.update(id, dto);
    }

    @DeleteMapping("/dto/users/{id}")
    void delete(@PathVariable Long id) {
        userFacade.delete(id);
    }
}
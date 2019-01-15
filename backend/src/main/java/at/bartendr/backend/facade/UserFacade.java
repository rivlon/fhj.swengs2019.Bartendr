package at.bartendr.backend.facade;

import at.bartendr.backend.dto.UserDTO;
import at.bartendr.backend.model.User;
import at.bartendr.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service()
@Transactional
public class UserFacade {

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Autowired
    private UserService userService;


    private void mapDtoToEntity(UserDTO dto, User entity) {
        entity.setUsername(dto.getUsername());

        if (dto.getPassword() != null && !dto.getPassword().isEmpty()) {
            String encodedPW = encoder.encode(dto.getPassword());
            entity.setPassword(encodedPW);
        }
        entity.setAdmin(dto.isAdmin());
        entity.setFirstname(dto.getFirstname());
        entity.setLastname(dto.getLastname());
        entity.setEmail(dto.getEmail());
        entity.setActive(true);
    }

    private void mapEntityToDto(User entity, UserDTO dto) {

        dto.setId(entity.getId());
        dto.setUsername(entity.getUsername());

        //Don't set Password & active flag since they won't get to the frontend!

        dto.setAdmin(entity.isAdmin());
        dto.setFirstname(entity.getFirstname());
        dto.setLastname(entity.getLastname());
        dto.setEmail(entity.getEmail());
        dto.setActive(entity.isActive());

    }

    public UserDTO update(Long id, UserDTO dto) {

        Optional<User> entity = userService.findActiveUserById(id);
        if (entity.isPresent()) {
            mapDtoToEntity(dto, entity.get());
            mapEntityToDto(userService.save(entity.get()), dto);
            return dto;
        }
        return null;
    }

    public UserDTO create(UserDTO dto) {
        User entity = new User();
        mapDtoToEntity(dto, entity);
        mapEntityToDto(userService.save(entity), dto);
        return dto;
    }

    public void delete(Long id) {
        userService.delete(id);
    }

    public UserDTO getById(Long id) {
        Optional<User> entity = userService.findActiveUserById(id);
        if (entity.isPresent()) {
            UserDTO dto = new UserDTO();
            mapEntityToDto(entity.get(), dto);
            return dto;
        }
        return null;
    }

    public UserDTO getByUsername(String username) {
        Optional<User> entity = userService.findActiveUserByUsername(username);
        if (entity.isPresent()) {
            UserDTO dto = new UserDTO();
            mapEntityToDto(entity.get(), dto);
            return dto;
        }
        return null;
    }

    public List<UserDTO> getAllUsers() {
        List<UserDTO> users = new ArrayList<>();

        userService.getUsers().forEach(entity -> {
            UserDTO dto = new UserDTO();
            mapEntityToDto(entity, dto);
            users.add(dto);
        });

        return users;
    }
}

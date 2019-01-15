package at.bartendr.backend.service;

import at.bartendr.backend.model.User;
import at.bartendr.backend.model.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service()
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> findActiveUserById(Long id) {
        return userRepository.findByIdAndActiveTrue(id);
    }

    public Optional<User> findActiveUserByUsername(String username) {
        return userRepository.findByUsernameAndActiveTrue(username);
    }

    public List<User> getUsers() {
        return userRepository.findAllByActiveTrue();
    }

    public User save(User entity) {
        return userRepository.save(entity);
    }

    // Deleted users are set inactive
    public void delete(Long id) {
        Optional<User> optEntity = findActiveUserById(id);
        if (optEntity.isPresent()) {
            User entity = optEntity.get();
            entity.setActive(false);
            save(entity);
        }
    }


}

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

    public Optional<User> findInactiveUserById(Long id) {
        return userRepository.findByIdAndActiveFalse(id);
    }

    public Optional<User> findActiveUserByUsername(String username) {
        return userRepository.findAllByUsernameAndActiveTrue(username);
    }

    public List<User> getActiveUsers() {
        return userRepository.findAllByActiveTrue();
    }

    public List<User> getInactiveUsers() {
        return userRepository.findAllByActiveFalse();
    }

    public List<User> getUsers() {
        return userRepository.findAll();
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

    public void reactivate(Long id) {
        Optional<User> optEntity = findInactiveUserById(id);
        if (optEntity.isPresent()) {
            User entity = optEntity.get();
            entity.setActive(true);
            save(entity);
        }
    }


}

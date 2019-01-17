package at.bartendr.backend.service;

import at.bartendr.backend.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service("userDetailsService")   // It has to be annotated with @Service.
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private DrinkRepository drinkRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            at.bartendr.backend.model.User user = userRepository.findByUsername(username);
            if (user.getUsername().equals(username)) {

                // Remember that Spring needs roles to be in this format: "ROLE_" + userRole (i.e. "ROLE_ADMIN")
                // So, we need to set it to that format, so we can verify and compare roles (i.e. hasRole("ADMIN")).
                List<GrantedAuthority> grantedAuthorities = AuthorityUtils
                        .commaSeparatedStringToAuthorityList(user.isAdmin() ? "ROLE_ADMIN" : "ROLE_USER");

                // The "User" class is provided by Spring and represents a model class for user to be returned by UserDetailsService
                // And used by auth manager to verify and check user authentication.
                return new User(user.getUsername(), user.getPassword(), grantedAuthorities);
            }
        } catch (Exception e) {
        }
        // If user not found. Throw this exception.
        throw new UsernameNotFoundException("Username: " + username + " not found");
    }

    @PostConstruct()
    @Transactional
    public void initUsers() {
        if (userRepository.count() == 0) {
            at.bartendr.backend.model.User admin = new at.bartendr.backend.model.User();
            admin.setUsername("admin");
            admin.setPassword(encoder.encode("admin"));
            admin.setAdmin(true);
            admin.setFirstname("Hans-Peter");
            admin.setLastname("Irgendwas");
            admin.setEmail("hans-peter@irgendwas.com");
            userRepository.save(admin);

            at.bartendr.backend.model.User tester = new at.bartendr.backend.model.User();
            tester.setUsername("tester");
            tester.setPassword(encoder.encode("tester"));
            tester.setAdmin(false);
            tester.setFirstname("Peter-Hans");
            tester.setLastname("wasIrgend");
            tester.setEmail("was-irgend@peter-hans.com");
            userRepository.save(tester);
        }
        if (locationRepository.count() == 0) {

            Location pucher = new Location();
            pucher.setName("Cafe Pucher");
            pucher.setPlusCode("3CC5+3Q Graz");
            pucher.setRating(4);
            locationRepository.save(pucher);

            Location tamTam = new Location();
            tamTam.setName("TamTam");
            tamTam.setPlusCode("3C8Q+FR Graz");
            tamTam.setRating(3);
            locationRepository.save(tamTam);

            Location murStüberl = new Location();
            murStüberl.setName("MurStüberl zum Stamperl");
            murStüberl.setPlusCode("3CCP+8V Graz");
            murStüberl.setRating(3);
            locationRepository.save(murStüberl);

            Location poga = new Location();
            poga.setName("Postgarage");
            poga.setPlusCode("3C8H+CF Graz");
            poga.setRating(4);
            locationRepository.save(poga);

        }

        if (drinkRepository.count() == 0) {
            Drink hausBier = new Drink();
            hausBier.setName("Hausbier");
            hausBier.setCategory("Beer");
            if (locationRepository.findByName("Cafe Pucher").isPresent()) {
                hausBier.setLocations(locationRepository.findByName("Cafe Pucher").get());
            }
            hausBier.setAge(Age.atLeast16);
            hausBier.setPrice(3.3f);
            hausBier.setRating(4.4f);
            drinkRepository.save(hausBier);

            Drink freitagsBier = new Drink();
            freitagsBier.setName("Freitags Bier");
            freitagsBier.setCategory("Beer");
            if (locationRepository.findByName("Cafe Pucher").isPresent()) {
                freitagsBier.setLocations(locationRepository.findByName("Cafe Pucher").get());
            }
            freitagsBier.setAge(Age.atLeast16);
            freitagsBier.setPrice(2.9f);
            freitagsBier.setRating(5);
            drinkRepository.save(freitagsBier);

            Drink berlinerLuft = new Drink();
            berlinerLuft.setName("Berliner Luft");
            berlinerLuft.setCategory("High Percentage!");
            if (locationRepository.findByName("TamTam").isPresent()) {
                berlinerLuft.setLocations(locationRepository.findByName("TamTam").get());
            }
            berlinerLuft.setAge(Age.atLeast18);
            berlinerLuft.setPrice(3.5f);
            berlinerLuft.setRating(5);
            drinkRepository.save(berlinerLuft);

            Drink tequilla = new Drink();
            tequilla.setName("Tequilla");
            tequilla.setCategory("High Percentage!");
            if (locationRepository.findByName("Postgarage").isPresent()) {
                tequilla.setLocations(locationRepository.findByName("Postgarage").get());
            }
            tequilla.setAge(Age.atLeast18);
            tequilla.setPrice(3);
            tequilla.setRating(3);
            drinkRepository.save(tequilla);
        }


    }

}
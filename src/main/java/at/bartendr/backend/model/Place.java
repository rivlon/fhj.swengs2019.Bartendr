package at.bartendr.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
public class Place {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    private String plusCode;

    @OneToMany(mappedBy = "place")
    private List<Drink> drinks;

    @Version
    @JsonIgnore
    private long version;

}

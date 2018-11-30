package at.bartendr.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
public class Size {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private int volML;
    private int volFlOz;

    @OneToMany(mappedBy = "size")
    private List<Drink> drinks;

    @Version
    @JsonIgnore
    private long version;
}

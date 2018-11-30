package at.bartendr.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class Drink {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private int temperatureCelsius;
    private boolean isAlcoholic;
    private String color;
    private String character;
    private String style;

    @ManyToOne
    private Place place;

    @ManyToOne
    private Size size;

    @ManyToOne
    private Category category;

    @Version
    @JsonIgnore
    private long version;
}

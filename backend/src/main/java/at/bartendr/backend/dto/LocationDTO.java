package at.bartendr.backend.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.Set;

public class LocationDTO {

    private Long id;
    private String name;
    private String plusCode;
    private float rating;
    private Set<Long> drinks;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPlusCode() {
        return plusCode;
    }

    public void setPlusCode(String plusCode) {
        this.plusCode = plusCode;
    }

    public float getRating() {
        return rating;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }

    public Set<Long> getDrinks() {
        return drinks;
    }

    public void setDrinks(Set<Long> drinks) {
        this.drinks = drinks;
    }

    public LocationDTO() {
    }

    public LocationDTO(Long id, String name, String plusCode, float rating, Set<Long> drinks) {
        this.id = id;
        this.name = name;
        this.plusCode = plusCode;
        this.rating = rating;
        this.drinks = drinks;
    }
}

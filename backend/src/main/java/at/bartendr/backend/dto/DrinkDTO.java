package at.bartendr.backend.dto;

import at.bartendr.backend.model.Age;
import at.bartendr.backend.model.Location;
import at.bartendr.backend.model.Media;

import java.util.Date;
import java.util.Set;

public class DrinkDTO {

    private Long id;
    private String name;
    private String category;
    private float price;
    private Age age;
    private float rating;
    private Location locations;
    private Media picture;

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

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public Age getAge() {
        return age;
    }

    public void setAge(Age age) {
        this.age = age;
    }

    public float getRating() {
        return rating;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }

    public Location getLocations() {
        return locations;
    }

    public void setLocations(Location gender) {
        this.locations = locations;
    }

    public Media getPicture() { return picture;}

    public void setPicture(Media picture) { this.picture = picture;}


    public DrinkDTO() {
    }

    public DrinkDTO(Long id, String name, String category, float price, Age age, float rating, Location location, Media picture) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.age = age;
        this.rating = rating;
        this.locations = location;
        this.picture = picture;
    }
}

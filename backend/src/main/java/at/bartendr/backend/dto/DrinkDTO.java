package at.bartendr.backend.dto;

import at.bartendr.backend.model.Age;
import at.bartendr.backend.model.Media;


public class DrinkDTO {

    private Long id;
    private String name;
    private String category;
    private float price;
    private Age age;
    private float rating;
    private Media picture;
    private Long locationID;

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

    public Long getLocationID() {
        return locationID;
    }

    public void setLocationID(Long locationID) {
        this.locationID = locationID;
    }

    public Media getPicture() { return picture;}

    public void setPicture(Media picture) { this.picture = picture;}


    public DrinkDTO() {
    }


    public DrinkDTO(Long id, String name, String category, float price, Age age, float rating, Long locationID) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.age = age;
        this.rating = rating;
        this.picture = picture;
        this.locationID = locationID;

    }
}

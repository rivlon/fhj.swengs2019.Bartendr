package at.bartendr.backend.dto;

import at.bartendr.backend.model.Age;
import at.bartendr.backend.model.Location;

import java.util.Date;
import java.util.Set;

public class DrinkDTO {

    private long id;
    private String name;
    private String category;
    private float price;
    private Age age;
    private float rating;
    private long locationID;

    public long getId() {
        return id;
    }

    public void setId(long id) {
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

    public long getLocationID() {
        return locationID;
    }

    public void setLocationID(long locationID) {
        this.locationID = locationID;
    }

    public DrinkDTO() {
    }

    public DrinkDTO(long id, String name, String category, float price, Age age, float rating, long locationID) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.age = age;
        this.rating = rating;
        this.locationID = locationID;
    }
}

package at.bartendr.backend.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class Drink {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, length = 25)
    private String name;
    @Column(name = "category")
    private String category;
    @Column(name = "price")
    private float price;
    @Column(name = "age")
    private Age age;
    @Column(name = "rating")
    private float rating;

    @ManyToOne
    private Location locations;

    @Column(name = "picture")
    private Media picture;

    @Version
    @JsonIgnore
    private Long version;

    public Drink() {
    }

    public Drink(String name, String category, float price, Age age, float rating, Location locations, Media picture, Long version) {
        this.name = name;
        this.category = category;
        this.price = price;
        this.age = age;
        this.rating = rating;
        this.locations = locations;
        this.picture = picture;
        this.version = version;
    }

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

    public void setLocations(Location locations) {
        this.locations = locations;
    }

    public Media getPicture() {
        return picture;
    }

    public void setPicture(Media picture) {
        this.picture = picture;
    }

    public Long getVersion() {
        return version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Drink)) return false;
        Drink drink = (Drink) o;
        return Float.compare(drink.getPrice(), getPrice()) == 0 &&
                Float.compare(drink.getRating(), getRating()) == 0 &&
                getVersion() == drink.getVersion() &&
                getId() == drink.getId() &&
                getName().equals(drink.getName()) &&
                Objects.equals(getCategory(), drink.getCategory()) &&
                getAge() == drink.getAge() &&
                Objects.equals(getLocations(), drink.getLocations()) &&
                Objects.equals(getPicture(), drink.getPicture());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName(), getCategory(), getPrice(), getAge(), getRating(), getPicture(), getVersion());
    }

    @Override
    public String toString() {
        return "Drink{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", category='" + category + '\'' +
                ", price=" + price +
                ", age=" + age +
                ", rating=" + rating +
                ", locations=" + locations +
                ", picture=" + picture +
                ", version=" + version +
                '}';
    }
}

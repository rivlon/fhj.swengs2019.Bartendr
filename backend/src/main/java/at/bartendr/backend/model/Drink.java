package at.bartendr.backend.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.util.Objects;

@Entity
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class Drink {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String category;
    private float price;
    private Age age;
    private float rating;

    @ManyToOne
    @JsonIgnoreProperties("drinks")
    private Location locations;

    @Version
    @JsonIgnore
    private long version;

    public Drink() {
    }

    public Drink(String name, String category, float price, Age age, float rating, Location locations, long version) {
        this.name = name;
        this.category = category;
        this.price = price;
        this.age = age;
        this.rating = rating;
        this.locations = locations;
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

    public long getVersion() {
        return version;
    }

    public void setVersion(long version) {
        this.version = version;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Drink)) return false;
        Drink drink = (Drink) o;
        return Float.compare(drink.getPrice(), getPrice()) == 0 &&
                getAge() == drink.getAge() &&
                Float.compare(drink.getRating(), getRating()) == 0 &&
                getVersion() == drink.getVersion() &&
                getId().equals(drink.getId()) &&
                getName().equals(drink.getName()) &&
                getCategory().equals(drink.getCategory()) &&
                Objects.equals(getLocations(), drink.getLocations());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName(), getCategory(), getPrice(), getAge(), getRating(), getLocations(), getVersion());
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
                ", version=" + version +
                '}';
    }
}

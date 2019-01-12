package at.bartendr.backend.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Entity
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    private String plusCode;

    private float rating;

    @OneToMany(mappedBy = "locations")
    private Set<Drink> drinks;

    @Version
    @JsonIgnore
    private long version;

    public Location() {
    }

    public Location(String name, String plusCode, float rating, Set<Drink> drinks, long version) {
        this.name = name;
        this.plusCode = plusCode;
        this.rating = rating;
        this.drinks = drinks;
        this.version = version;
    }

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

    public Set<Drink> getDrinks() {
        return drinks;
    }

    public void setDrinks(Set<Drink> drinks) {
        this.drinks = drinks;
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
        if (!(o instanceof Location)) return false;
        Location location = (Location) o;
        return Float.compare(location.getRating(), getRating()) == 0 &&
                getVersion() == location.getVersion() &&
                getId() == location.getId() &&
                getName().equals(location.getName()) &&
                getPlusCode().equals(location.getPlusCode()) &&
                Objects.equals(getDrinks(), location.getDrinks());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName(), getPlusCode(), getRating(), getDrinks(), getVersion());
    }

    @Override
    public String toString() {
        return "Location{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", plusCode='" + plusCode + '\'' +
                ", rating=" + rating +
                ", drinks=" + drinks +
                ", version=" + version +
                '}';
    }
}

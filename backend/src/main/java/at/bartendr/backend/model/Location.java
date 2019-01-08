package at.bartendr.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String plusCode;

    private int rating;

    @OneToMany(mappedBy = "location")
    private List<Drink> drinks;

    @Version
    @JsonIgnore
    private long version;

    public Location() {
    }

    public Location(String name, String plusCode, int rating, List<Drink> drinks, long version) {
        this.name = name;
        this.plusCode = plusCode;
        this.rating = rating;
        this.drinks = drinks;
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

    public String getPlusCode() {
        return plusCode;
    }

    public void setPlusCode(String plusCode) {
        this.plusCode = plusCode;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public List<Drink> getDrinks() {
        return drinks;
    }

    public void setDrinks(List<Drink> drinks) {
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
        return getRating() == location.getRating() &&
                getVersion() == location.getVersion() &&
                Objects.equals(getId(), location.getId()) &&
                Objects.equals(getName(), location.getName()) &&
                Objects.equals(getPlusCode(), location.getPlusCode()) &&
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

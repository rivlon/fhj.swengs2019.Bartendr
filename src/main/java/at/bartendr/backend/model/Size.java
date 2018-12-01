package at.bartendr.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
public class Size {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private int volML;
    private int volFlOz;

    @OneToMany(mappedBy = "size")
    private List<Drink> drinks;

    @Version
    @JsonIgnore
    private long version;

    public Size() {
    }

    public Size(String name, int volML, int volFlOz) {
        this.name = name;
            this.volML = volML;
            this.volFlOz = volFlOz;
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

    public int getVolML() {
        return volML;
    }

    public void setVolML(int volML) {
        this.volML = volML;
    }

    public int getVolFlOz() {
        return volFlOz;
    }

    public void setVolFlOz(int volFlOz) {
        this.volFlOz = volFlOz;
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
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Size size = (Size) o;
        return id == size.id &&
                volML == size.volML &&
                volFlOz == size.volFlOz &&
                name.equals(size.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, volML, volFlOz);
    }

    @Override
    public String toString() {
        return "Size{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", volML=" + volML +
                ", volFlOz=" + volFlOz +
                ", drinks=" + drinks +
                ", version=" + version +
                '}';
    }
}

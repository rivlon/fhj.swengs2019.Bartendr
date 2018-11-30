package at.bartendr.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class Drink {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private int temperatureCelsius;
    private int temperatureFahrenheit;
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

    public Drink() {
    }

    // apply same hack as in size with boolean flag for unit
    public Drink(String name, int temperature, boolean isAlcoholic, String color, String character, String style, boolean unitCelsius) {
        this.name = name;
        if (unitCelsius) {
            this.temperatureCelsius = temperature;
            this.temperatureFahrenheit = (int) Math.round((temperature * 1.8) + 32);
        } else {
            this.temperatureFahrenheit = temperature;
            this.temperatureCelsius = (int) Math.round((temperature - 32) * 1.8);
        }
        this.isAlcoholic = isAlcoholic;
        this.color = color;
        this.character = character;
        this.style = style;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Drink drink = (Drink) o;
        return id == drink.id &&
                temperatureCelsius == drink.temperatureCelsius &&
                temperatureFahrenheit == drink.temperatureFahrenheit &&
                isAlcoholic == drink.isAlcoholic &&
                name.equals(drink.name) &&
                Objects.equals(color, drink.color) &&
                Objects.equals(character, drink.character) &&
                Objects.equals(style, drink.style) &&
                Objects.equals(place, drink.place) &&
                Objects.equals(size, drink.size) &&
                Objects.equals(category, drink.category);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, temperatureCelsius, temperatureFahrenheit, isAlcoholic, color, character, style, place, size, category);
    }

    public int getTemperatureFahrenheit() {
        return temperatureFahrenheit;
    }

    public void setTemperatureFahrenheit(int temperatureFahrenheit) {
        this.temperatureFahrenheit = temperatureFahrenheit;
    }

    @Override
    public String toString() {
        return "Drink{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", temperatureCelsius=" + temperatureCelsius +
                ", isAlcoholic=" + isAlcoholic +
                ", color='" + color + '\'' +
                ", character='" + character + '\'' +
                ", style='" + style + '\'' +
                ", place=" + place +
                ", size=" + size +
                ", category=" + category +
                ", version=" + version +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getTemperatureCelsius() {
        return temperatureCelsius;
    }

    public void setTemperatureCelsius(int temperatureCelsius) {
        this.temperatureCelsius = temperatureCelsius;
    }

    public boolean isAlcoholic() {
        return isAlcoholic;
    }

    public void setAlcoholic(boolean alcoholic) {
        isAlcoholic = alcoholic;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getCharacter() {
        return character;
    }

    public void setCharacter(String character) {
        this.character = character;
    }

    public String getStyle() {
        return style;
    }

    public void setStyle(String style) {
        this.style = style;
    }

    public Place getPlace() {
        return place;
    }

    public void setPlace(Place place) {
        this.place = place;
    }

    public Size getSize() {
        return size;
    }

    public void setSize(Size size) {
        this.size = size;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public long getVersion() {
        return version;
    }

    public void setVersion(long version) {
        this.version = version;
    }
}

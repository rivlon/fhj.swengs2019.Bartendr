package at.bartendr.backend.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Entity
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private int reqAge;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy")
    private Date reqBDay;

    @OneToMany(mappedBy = "category")
    private List<Drink> drinks;

    @Version
    @JsonIgnore
    private long version;

    public Category() {
    }

    public Category(String name, int reqAge) {
        this.name = name;
        this.reqAge = reqAge;
        // get current date and subtract required age
        // works only on creation though, should probably be done in frontend tbh
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.YEAR, (reqAge * -1));
        this.reqBDay = cal.getTime();
    }

    @Override
    public String toString() {
        return "Category{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", reqAge=" + reqAge +
                ", reqBDay=" + reqBDay +
                ", drinks=" + drinks +
                ", version=" + version +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Category category = (Category) o;
        return id == category.id &&
                reqAge == category.reqAge &&
                name.equals(category.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, reqAge);
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

    public int getReqAge() {
        return reqAge;
    }

    public void setReqAge(int reqAge) {
        this.reqAge = reqAge;
    }

    public Date getReqBDay() {
        return reqBDay;
    }

    public void setReqBDay(Date reqBDay) {
        this.reqBDay = reqBDay;
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
}

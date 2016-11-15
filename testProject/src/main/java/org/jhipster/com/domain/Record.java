package org.jhipster.com.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Record.
 */
@Entity
@Table(name = "record")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Record implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Column(name = "user", nullable = false)
    private String user;

    @NotNull
    @Column(name = "glucose_level", nullable = false)
    private Integer glucoseLevel;

    @Column(name = "mood")
    private String mood;

    @NotNull
    @Column(name = "date_time", nullable = false)
    private ZonedDateTime dateTime;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUser() {
        return user;
    }

    public Record user(String user) {
        this.user = user;
        return this;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public Integer getGlucoseLevel() {
        return glucoseLevel;
    }

    public Record glucoseLevel(Integer glucoseLevel) {
        this.glucoseLevel = glucoseLevel;
        return this;
    }

    public void setGlucoseLevel(Integer glucoseLevel) {
        this.glucoseLevel = glucoseLevel;
    }

    public String getMood() {
        return mood;
    }

    public Record mood(String mood) {
        this.mood = mood;
        return this;
    }

    public void setMood(String mood) {
        this.mood = mood;
    }

    public ZonedDateTime getDateTime() {
        return dateTime;
    }

    public Record dateTime(ZonedDateTime dateTime) {
        this.dateTime = dateTime;
        return this;
    }

    public void setDateTime(ZonedDateTime dateTime) {
        this.dateTime = dateTime;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Record record = (Record) o;
        if(record.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, record.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Record{" +
            "id=" + id +
            ", user='" + user + "'" +
            ", glucoseLevel='" + glucoseLevel + "'" +
            ", mood='" + mood + "'" +
            ", dateTime='" + dateTime + "'" +
            '}';
    }
}

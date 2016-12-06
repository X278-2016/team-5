package com.vanderbilt.myday.domain;

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
    @Column(name = "username", nullable = false)
    private String username;

    @NotNull
    @Column(name = "glucose_level", nullable = false)
    private Double glucoseLevel;

    @Column(name = "mood")
    private String mood;

    @NotNull
    @Column(name = "date", nullable = false)
    private ZonedDateTime date;

    @NotNull
    @Column(name = "location", nullable = false)
    private String location;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public Record username(String username) {
        this.username = username;
        return this;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Double getGlucoseLevel() {
        return glucoseLevel;
    }

    public Record glucoseLevel(Double glucoseLevel) {
        this.glucoseLevel = glucoseLevel;
        return this;
    }

    public void setGlucoseLevel(Double glucoseLevel) {
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

    public ZonedDateTime getDate() {
        return date;
    }

    public Record date(ZonedDateTime date) {
        this.date = date;
        return this;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public String getLocation() {
        return location;
    }

    public Record location(String location) {
        this.location = location;
        return this;
    }

    public void setLocation(String location) {
        this.location = location;
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
        if (record.id == null || id == null) {
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
            ", username='" + username + "'" +
            ", glucoseLevel='" + glucoseLevel + "'" +
            ", mood='" + mood + "'" +
            ", date='" + date + "'" +
            ", location='" + location + "'" +
            '}';
    }
}

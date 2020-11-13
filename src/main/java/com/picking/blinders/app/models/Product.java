package com.picking.blinders.app.models;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table
public class Product implements Comparable<Product> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank(message = "Name can not be blank")
    private String name;


    private int volume;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "station_id")
    private Station station;

    public Product() {
    }

    public Product(@NotBlank(message = "Name can not be blank") String name, int volume, Station station) {
        this.name = name;
        this.volume = volume;
        this.station = station;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getVolume() {
        return volume;
    }

    public void setVolume(int volume) {
        this.volume = volume;
    }

    public Station getStation() {
        return station;
    }

    public void setStation(Station station) {
        this.station = station;
    }

    @Override
    public int compareTo(Product o) {
        int compareVolume = ((Product) o).getVolume();
        if(this.volume == compareVolume){
            return this.name.compareTo(o.name);
        }
        return compareVolume - this.volume;
    }

    public Long getId() {
        return id;
    }
}

package com.picking.blinders.app.models;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table
public class Station {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank(message = "Name can not be blank")
    private String name;

    public Station() {
    }

    public Station(@NotBlank(message = "Name can not be blank") String name) {
        this.name = name;
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
}

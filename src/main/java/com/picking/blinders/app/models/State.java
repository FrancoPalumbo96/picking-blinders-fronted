package com.picking.blinders.app.models;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table
public class State {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank(message = "Name can not be blank")
    private String name;

    public State() {
    }

    public State(@NotBlank(message = "Name can not be blank")String name){
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

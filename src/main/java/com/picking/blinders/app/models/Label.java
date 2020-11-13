package com.picking.blinders.app.models;

import javax.persistence.*;

@Entity
@Table
public class Label {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private boolean printed = false;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "box_id")
    private Box box;

    public Label() {
    }

    public Label(Box box) {
        this.box = box;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public boolean isPrinted() {
        return printed;
    }

    public void setPrinted(boolean printed) {
        this.printed = printed;
    }

    public Box getBox() {
        return box;
    }

    public void setBox(Box box) {
        this.box = box;
    }
}

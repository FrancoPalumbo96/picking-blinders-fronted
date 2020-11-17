package com.picking.blinders.app.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;


@Entity
@Table
public class PickingList {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "box_id")
    private Box box;

    @JsonIgnore
    @OneToMany(mappedBy = "pickingList",
            fetch = FetchType.EAGER,
            cascade = CascadeType.ALL)
    private final Set<PickingListProductQuantity> pickingListProductQuantities = new HashSet<>();

    public PickingList() {
    }

    public PickingList(Box box) {
        this.box = box;
    }

    public void addPickingListProductQuantity(PickingListProductQuantity pickingListProductQuantity) {
        pickingListProductQuantities.add(pickingListProductQuantity);
    }

    public void removePickingListProductQuantity(PickingListProductQuantity pickingListProductQuantity) {
        pickingListProductQuantities.remove(pickingListProductQuantity);
    }

    public Set<PickingListProductQuantity> getPickingListProductQuantities() {
        return pickingListProductQuantities;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Box getBox() {
        return box;
    }

    public void setBox(Box box) {
        this.box = box;
    }
}

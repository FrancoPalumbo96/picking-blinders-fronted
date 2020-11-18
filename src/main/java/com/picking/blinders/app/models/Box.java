package com.picking.blinders.app.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table
public class Box {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private int boxNumber;

    private int totalBoxes;

    private int totalVolume;

    public static int MaxTotalVolume = 15;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "state_id")
    private State state;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "order_id")
    private Order order;

    @OneToMany(mappedBy = "box",
            fetch = FetchType.EAGER,
            cascade = CascadeType.ALL)
    private final Set<PickingList> pickingLists = new HashSet<>();

    public Box(){
    }

    public Box(State state, Order order, int boxNumber, int totalBoxes) {
        this.state = state;
        this.order = order;
        this.boxNumber = boxNumber;
        this.totalBoxes = totalBoxes;
        this.totalVolume = MaxTotalVolume;
    }



    public void addPickingList(PickingList pickingList) {
        pickingLists.add(pickingList);
    }

    public void removePickingList(PickingList pickingList) {
        pickingLists.remove(pickingList);
    }

    public Set<PickingList> getPickingLists() {
        return pickingLists;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public int getBoxNumber() {
        return boxNumber;
    }

    public void setBoxNumber(int boxNumber) {
        this.boxNumber = boxNumber;
    }

    public int getTotalBoxes() {
        return totalBoxes;
    }

    public void setTotalBoxes(int totalBoxes) {
        this.totalBoxes = totalBoxes;
    }

    public int getTotalVolume() {
        return totalVolume;
    }

    public void setTotalVolume(int totalVolume) {
        this.totalVolume = totalVolume;
    }
}

package com.picking.blinders.app.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank(message = "Zone can not be blank")
    private String zone;

    @JsonIgnore
    //TODO FetchType creo que conviene Lazy, pero en insuarance estamos usando Eager
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "client_id")
    private Client client;

    @OneToMany(mappedBy = "order",
            fetch = FetchType.EAGER,
            cascade = CascadeType.ALL)
    private final Set<ProductQuantity> productQuantities = new HashSet<>();

    @OneToMany(mappedBy = "order",
            fetch = FetchType.EAGER,
            cascade = CascadeType.ALL)
    private final Set<Box> boxes = new HashSet<>();

    public Order() {
    }

    public Order(@NotBlank(message = "Zone can not be blank") String zone, Client client) {
        this.zone = zone;
        this.client = client;
    }

    public void addProductQuantity(ProductQuantity productQuantity) {
        productQuantities.add(productQuantity);
    }

    public void removeProductQuantity(ProductQuantity productQuantity) {
        productQuantities.remove(productQuantity);
    }

    public Set<ProductQuantity> getProductQuantities() {
        return productQuantities;
    }

    public void addBox(Box box) {
        boxes.add(box);
    }

    public void removeBox(Box box) {
        boxes.remove(box);
    }

    public Set<Box> getBoxes() {
        return boxes;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getZone() {
        return zone;
    }

    public void setZone(String zone) {
        this.zone = zone;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }
}

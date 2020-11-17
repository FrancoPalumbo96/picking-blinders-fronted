package com.picking.blinders.app.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table
public class PickingListProductQuantity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private int quantity;

    private int missingQuantity;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "pickingList_id")
    private PickingList pickingList;

    public PickingListProductQuantity() {
    }

    public PickingListProductQuantity(int quantity, int missingQuantity, Product product, PickingList pickingList) {
        this.quantity = quantity;
        this.missingQuantity = missingQuantity;
        this.product = product;
        this.pickingList = pickingList;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getMissingQuantity() {
        return missingQuantity;
    }

    public void setMissingQuantity(int missingQuantity) {
        this.missingQuantity = missingQuantity;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public PickingList getPickingList() {
        return pickingList;
    }

    public void setPickingList(PickingList pickingList) {
        this.pickingList = pickingList;
    }
}
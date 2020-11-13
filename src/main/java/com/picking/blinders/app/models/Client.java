package com.picking.blinders.app.models;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank(message = "Name can not be blank")
    private String firstName;

    @NotBlank(message = "LastName can not be blank")
    private String lastName;

    @NotBlank(message = "Mail can not be blank")
    private String mail;

    /*@NotBlank(message = "Address can not be blank")
    private String address;*/

    @NotBlank(message = "DNI can not be blank")
    private String dni;

    @NotBlank(message = "PhoneNumber can not be blank")
    private String phoneNumber;

    @NotBlank(message = "CUIT can not be blank")
    private String CUIT;

    @OneToMany(mappedBy = "client",
            fetch = FetchType.EAGER,
            cascade = CascadeType.ALL)
    private final Set<Order> orders = new HashSet<>();

   /* @JoinColumn(name = "client_id")
    private Cliente direccion;*/

    public Client() {
    }

    public Client(@NotBlank(message = "Name can not be blank") String firstName, @NotBlank(message = "LastName can not be blank") String lastName, @NotBlank(message = "Mail can not be blank") String mail, @NotBlank(message = "DNI can not be blank") String dni, @NotBlank(message = "PhoneNumber can not be blank") String phoneNumber, @NotBlank(message = "CUIT can not be blank") String CUIT) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.mail = mail;
        this.dni = dni;
        this.phoneNumber = phoneNumber;
        this.CUIT = CUIT;
    }

    public void addOrder(Order order) {
        orders.add(order);
    }

    public void removeOrder(Order order) {
        orders.remove(order);
    }

    public Set<Order> getOrders() {
        return orders;
    }

    public Long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getCUIT() {
        return CUIT;
    }

    public void setCUIT(String CUIT) {
        this.CUIT = CUIT;
    }
}

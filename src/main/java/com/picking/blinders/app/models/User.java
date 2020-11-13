package com.picking.blinders.app.models;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotBlank(message = "Name can not be blank")
    private String name;

    @NotBlank(message = "Email can not be blank")
    @Column(unique = true)
    private String email;

    @NotBlank(message = "Password can not be blank")
    private String password;

    @NotBlank(message = "DNI can not be blank")
    private String dni;

    @NotBlank(message = "Phone can not be blank")
    private String phoneNumber;

    public User() {
    }

    public User(String name, String email, String password, String dni, String phoneNumber) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.dni = dni;
        this.phoneNumber = phoneNumber;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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
}

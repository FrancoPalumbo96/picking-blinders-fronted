package com.picking.blinders.app.resources;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Value;

@Value
public class UserResource {
    private final Long id;
    private final String name;
    private final String email;
    private final String dni;
    private final String phoneNumber;

    public UserResource(
            @JsonProperty("id") Long id,
            @JsonProperty("name") String name,
            @JsonProperty("email") String email,
            @JsonProperty("dni") String dni,
            @JsonProperty("phoneNumber") String phoneNumber
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.dni = dni;
        this.phoneNumber = phoneNumber;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getDni() {
        return dni;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }
}

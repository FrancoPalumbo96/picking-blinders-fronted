package com.picking.blinders.app.controllers;

import com.picking.blinders.app.exceptions.ResourceNotFoundException;
import com.picking.blinders.app.models.User;
import com.picking.blinders.app.repositories.UserRepository;
import com.picking.blinders.app.resources.UserResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable(value = "id") Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found for this id :: " + userId));
        return ResponseEntity.ok().body(user);
    }

    @GetMapping
    public ResponseEntity<List<UserResource>> getUsers() {
        List<User> users = (List<User>) userRepository.findAll();
        List<UserResource> userResources = new ArrayList<>();
        for (User user: users) {
            userResources.add(new UserResource(user.getId(), user.getName(), user.getEmail(), user.getDni(), user.getPhoneNumber()));
        }
        return ResponseEntity.ok().body(userResources);
    }
}

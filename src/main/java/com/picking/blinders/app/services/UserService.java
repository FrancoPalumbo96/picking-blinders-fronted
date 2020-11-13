package com.picking.blinders.app.services;

import com.picking.blinders.app.exceptions.ResourceNotFoundException;
import com.picking.blinders.app.models.User;
import com.picking.blinders.app.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User findById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found."));
    }

    public List<User> findAll() {
        return (List<User>) userRepository.findAll();
    }

    public User updateUser(Long id, User user) {
        User oldUser = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found."));
        User newUser = new User(user.getName(), user.getEmail(), oldUser.getPassword(), user.getDni(), user.getPhoneNumber());

        newUser.setId(oldUser.getId());
        return userRepository.save(newUser);
    }

    public void deleteUserById(Long id) {
        findById(id);
        userRepository.deleteById(id);
    }
}

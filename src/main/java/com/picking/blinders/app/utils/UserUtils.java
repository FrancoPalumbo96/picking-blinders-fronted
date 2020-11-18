package com.picking.blinders.app.utils;

import com.picking.blinders.app.models.User;
import com.picking.blinders.app.resources.UserResource;

import java.util.ArrayList;
import java.util.List;

public class UserUtils {
    public static List<UserResource> makeUsers(List<User> users) {
        List<UserResource> userResources = new ArrayList<>();
        for (User user : users) userResources.add(makeUser(user));
        return userResources;
    }
    public static UserResource makeUser(User user) {
        if (user == null) return null;

        return new UserResource(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getDni(),
                user.getPhoneNumber()
        );
    }
}

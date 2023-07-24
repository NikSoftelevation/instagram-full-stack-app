package com.springboot.instagram.api.service;

import com.springboot.instagram.api.model.User;

import java.util.List;

public interface UserService {
    public User registerUser(User user);

    public User findUserByUserId(int userId);

    public User findUserByProfile(String token);

    public User findUserByUsername(String username);

    public String followUser(int reqUserId, int followUserId);

    public String unFollowUser(int reqUserId, int followUserId);

    public List<User> findUserByIds(List<Integer> userIds);

    public List<User> searchUser(String query);

    public User updateUserDetails(User updatedUser, User existingUser);
}

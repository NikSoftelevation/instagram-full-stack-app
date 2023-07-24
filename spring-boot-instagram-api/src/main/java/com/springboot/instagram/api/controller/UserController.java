package com.springboot.instagram.api.controller;

import com.springboot.instagram.api.exception.UserException;
import com.springboot.instagram.api.model.User;
import com.springboot.instagram.api.payload.MessageResponse;
import com.springboot.instagram.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<User> createUser(@RequestBody User user) throws UserException {

        return new ResponseEntity<>(userService.registerUser(user), HttpStatus.CREATED);
    }

    @GetMapping("/userId/{userId}")
    public ResponseEntity<User> findUserByUserId(@RequestParam("userId") int userId) throws UserException {

        return new ResponseEntity<>(userService.findUserByUserId(userId), HttpStatus.OK);
    }

    @GetMapping("/profile/req")
    public ResponseEntity<User> findUserByProfile(@RequestHeader("Authorization") String token) {

        return new ResponseEntity<>(userService.findUserByProfile(token), HttpStatus.ACCEPTED);
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<User> findUserByUsername(@PathVariable("username") String username) {

        return new ResponseEntity<>(userService.findUserByUsername(username), HttpStatus.ACCEPTED);
    }

    @PutMapping("/follow/{followUserId}")
    public ResponseEntity<MessageResponse> followUser(@PathVariable("followUserId") int followUserId, @RequestHeader("Authorization") String token) throws UserException {

        User user = userService.findUserByProfile(token);

        String message = userService.followUser(user.getId(), followUserId);

        MessageResponse response = new MessageResponse(message);

        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PutMapping("/unfollow/{userId}")
    public ResponseEntity<MessageResponse> unfollowUser(@PathVariable("userId") int userId, @RequestHeader("Authorization") String token) throws UserException {

        String message = userService.unFollowUser(userService.findUserByProfile(token).getId(), userId);

        MessageResponse response = new MessageResponse(message);

        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @GetMapping("/ids/{userIds}")
    public ResponseEntity<List<User>> findUserByIds(@PathVariable("userIds") List<Integer> userIds) throws UserException {

        List<User> userByIds = userService.findUserByIds(userIds);

        return new ResponseEntity<>(userByIds, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<User>> searchUser(@RequestParam("query") String query) throws UserException {

        List<User> searchUserList = userService.searchUser(query);

        return new ResponseEntity<>(searchUserList, HttpStatus.OK);
    }

    @PutMapping("/account/edit")
    public ResponseEntity<User> updateUser(@RequestBody User user, @RequestHeader("Authorization") String token) {

        User reqUser = userService.findUserByProfile(token);

        User updateUserDetails = userService.updateUserDetails(user, reqUser);

        return new ResponseEntity<>(updateUserDetails, HttpStatus.ACCEPTED);
    }
}
package com.springboot.instagram.api.controller;

import com.springboot.instagram.api.exception.UserException;
import com.springboot.instagram.api.model.User;
import com.springboot.instagram.api.repository.UserRepository;
import com.springboot.instagram.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class AuthController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/signup")
    public ResponseEntity<User> registerUserHandler(@RequestBody User user) throws UserException {
        return new ResponseEntity<>(userService.registerUser(user), HttpStatus.OK);
    }

    @GetMapping("/signin")
    public ResponseEntity<User> signInHandler(Authentication authentication) throws BadCredentialsException {

        Optional<User> opt = userRepository.findByEmail(authentication.getName());

        if (opt.isPresent()) {
            return new ResponseEntity<>(opt.get(), HttpStatus.ACCEPTED);
        }
        throw new BadCredentialsException("Invalid username or password");
    }
}
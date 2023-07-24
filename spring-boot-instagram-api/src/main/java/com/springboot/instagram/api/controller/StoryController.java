package com.springboot.instagram.api.controller;

import com.springboot.instagram.api.model.Story;
import com.springboot.instagram.api.model.User;
import com.springboot.instagram.api.service.StoryService;
import com.springboot.instagram.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stories")
public class StoryController {

    @Autowired
    private StoryService storyService;
    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<Story> createStory(@RequestBody Story story, @RequestHeader("Authorization") String token) {

        User user = userService.findUserByProfile(token);

        return new ResponseEntity<>(storyService.createStory(story, user.getId()), HttpStatus.CREATED);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Story>> findAllStoriesByUserId(@PathVariable("userId") int userId) {

        User userByUserId = userService.findUserByUserId(userId);

        List<Story> stories = storyService.findStoryByUserId(userByUserId.getId());

        return new ResponseEntity<>(stories, HttpStatus.OK);
    }
}

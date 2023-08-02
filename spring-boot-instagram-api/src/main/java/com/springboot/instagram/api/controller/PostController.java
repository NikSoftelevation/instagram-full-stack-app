package com.springboot.instagram.api.controller;

import com.springboot.instagram.api.exception.PostException;
import com.springboot.instagram.api.exception.UserException;
import com.springboot.instagram.api.model.Post;
import com.springboot.instagram.api.model.User;
import com.springboot.instagram.api.payload.MessageResponse;
import com.springboot.instagram.api.service.PostService;
import com.springboot.instagram.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private UserService userService;

    @Autowired
    private PostService postService;

    @PostMapping("/create")
    public ResponseEntity<Post> createPost(@RequestBody Post post, @RequestHeader("Authorization") String token) throws UserException {

        User user = userService.findUserByProfile(token);

        return new ResponseEntity<>(postService.createdPost(post, user.getId()), HttpStatus.CREATED);
    }

    @GetMapping("/all/{userId}")
    public ResponseEntity<List<Post>> findPostsByUserId(@PathVariable("userId") int userId) throws UserException {

        return new ResponseEntity<>(postService.findPostByUserId(userId), HttpStatus.ACCEPTED);
    }

    @GetMapping("/following/{userIds}")
    public ResponseEntity<List<Post>> findAllPostsByUserIds(@PathVariable("userIds") List<Integer> userIds) throws UserException, PostException {

        return new ResponseEntity<>(postService.findAllPostsByUserIds(userIds), HttpStatus.OK);

    }

    @GetMapping("/{postId}")
    public ResponseEntity<Post> findPostByPostId(@PathVariable("postId") int postId) throws PostException {

        return new ResponseEntity<>(postService.findPostById(postId), HttpStatus.OK);
    }

    @PutMapping("/like/{postId}")
    public ResponseEntity<Post> likePostHandler(@PathVariable("postId") int postId, @RequestHeader("Authorization") String token) throws UserException {

        User user = userService.findUserByProfile(token);

        return new ResponseEntity<>(postService.likePost(user.getId(), postId), HttpStatus.OK);
    }

    @PutMapping("/unlike/{postId}")
    public ResponseEntity<Post> unlikePostHandler(@PathVariable("postId") int postId, @RequestHeader("Authorization") String token) {

        User user = userService.findUserByProfile(token);

        return new ResponseEntity<>(postService.unslikePost(user.getId(), postId), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{postId}")
    public ResponseEntity<MessageResponse> deletePost(@PathVariable("postId") int postId, @RequestHeader("Authorization") String token) throws UserException, PostException {

        User user = userService.findUserByProfile(token);

        String message = postService.deletePost(user.getId(), postId);

        MessageResponse response = new MessageResponse(message);

        return new ResponseEntity<>(response, HttpStatus.GONE);

    }

    @PutMapping("/save_post/{postId}")
    public ResponseEntity<MessageResponse> savedPostHandler(@RequestParam("postId") int postId, @RequestHeader("Authorization") String token) {

        User user = userService.findUserByProfile(token);

        String message = postService.savedPost(user.getId(), postId);

        MessageResponse response = new MessageResponse(message);

        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PutMapping("/unsaved_post/{postId}")
    public ResponseEntity<MessageResponse> unsavedPostHandler(@RequestParam("postId") int postId, @RequestHeader("Authorization") String token) {

        User user = userService.findUserByProfile(token);

        String message = postService.unSavedPost(user.getId(), postId);

        MessageResponse response = new MessageResponse(message);

        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }
}

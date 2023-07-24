package com.springboot.instagram.api.controller;

import com.springboot.instagram.api.model.Comments;
import com.springboot.instagram.api.model.User;
import com.springboot.instagram.api.service.CommentsService;
import com.springboot.instagram.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/comments")
public class CommentsController {

    @Autowired
    private CommentsService commentsService;
    @Autowired
    private UserService userService;
    ;

    @PostMapping("/create/{postId}")
    public ResponseEntity<Comments> createComment(@RequestBody Comments comments, @RequestHeader("Authorization") String token, @RequestParam("postId") int postId) {

        User user = userService.findUserByProfile(token);

        Comments createdComment = commentsService.createComment(comments, user.getId(), postId);

        return new ResponseEntity<>(createdComment, HttpStatus.CREATED);
    }

    @GetMapping("/{commentId}")
    public ResponseEntity<Comments> findCommentByCommentId(@PathVariable("commentId") int commentId) {

        return new ResponseEntity<>(commentsService.findCommentByCommentId(commentId), HttpStatus.ACCEPTED);
    }

    @PutMapping("/like/{commentId}")
    public ResponseEntity<Comments> likedCommentHandler(@RequestHeader("Authorization") String token, @RequestParam("commentId") int commentId) {

        User user = userService.findUserByProfile(token);

        return new ResponseEntity<>(commentsService.likeComment(commentId, user.getId()), HttpStatus.ACCEPTED);
    }

    @PutMapping("/unlike/{commentId}")
    public ResponseEntity<Comments> unlikeCommentHandler(@RequestHeader("Authorization") String token, @RequestParam("commentId") int commentId) {

        User user = userService.findUserByProfile(token);

        return new ResponseEntity<>(commentsService.unlikeComment(commentId, user.getId()), HttpStatus.ACCEPTED);
    }
}

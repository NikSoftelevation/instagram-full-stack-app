package com.springboot.instagram.api.service.impl;

import com.springboot.instagram.api.dto.UserDto;
import com.springboot.instagram.api.exception.CommentsException;
import com.springboot.instagram.api.exception.PostException;
import com.springboot.instagram.api.exception.UserException;
import com.springboot.instagram.api.model.Comments;
import com.springboot.instagram.api.model.Post;
import com.springboot.instagram.api.model.User;
import com.springboot.instagram.api.repository.CommentsRepository;
import com.springboot.instagram.api.repository.PostRepository;
import com.springboot.instagram.api.service.CommentsService;
import com.springboot.instagram.api.service.PostService;
import com.springboot.instagram.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class CommentsServiceImpl implements CommentsService {

    @Autowired
    private CommentsRepository commentsRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserService userService;
    private PostService postService;

    @Override
    public Comments createComment(Comments comments, int userId, int postId) throws UserException, PostException {

        User userByUserId = userService.findUserByUserId(userId);

        Post post = postService.findPostById(postId);

        UserDto userDto = new UserDto();
        userDto.setEmail(userByUserId.getEmail());
        userDto.setId(userByUserId.getId());
        userDto.setName(userByUserId.getName());
        userDto.setUserImage(userByUserId.getImage());
        userDto.setUsername(userByUserId.getUsername());

        comments.setUser(userDto);
        comments.setCreatedAt(LocalDateTime.now());

        Comments createdComment = commentsRepository.save(comments);

        post.getComments().add(createdComment);

        postRepository.save(post);

        return createdComment;
    }

    @Override
    public Comments findCommentByCommentId(int commentId) throws CommentsException {

        Optional<Comments> optionalComments = commentsRepository.findById(commentId);

        if (optionalComments.isPresent()) {
            return optionalComments.get();
        }

        throw new CommentsException("Comment doesn't exist with commentId " + commentId);
    }

    @Override
    public Comments likeComment(int commentId, int userId) throws UserException, CommentsException {

        User user = userService.findUserByUserId(userId);

        Comments comments = findCommentByCommentId(commentId);

        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setEmail(user.getEmail());
        userDto.setUsername(user.getUsername());
        userDto.setUserImage(user.getImage());
        userDto.setName(user.getName());

        comments.getLikedByUsers().add(userDto);

        return commentsRepository.save(comments);
    }

    @Override
    public Comments unlikeComment(int commentId, int userId) throws UserException, CommentsException {

        User user = userService.findUserByUserId(userId);

        Comments comments = findCommentByCommentId(commentId);

        UserDto userDto = new UserDto();

        userDto.setName(user.getName());
        userDto.setUsername(user.getUsername());
        userDto.setUserImage(user.getImage());
        userDto.setId(user.getId());
        userDto.setEmail(user.getEmail());

        comments.getLikedByUsers().remove(userDto);

        return commentsRepository.save(comments);
    }
}

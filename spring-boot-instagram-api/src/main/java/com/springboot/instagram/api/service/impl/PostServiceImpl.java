package com.springboot.instagram.api.service.impl;

import com.springboot.instagram.api.dto.UserDto;
import com.springboot.instagram.api.exception.PostException;
import com.springboot.instagram.api.exception.UserException;
import com.springboot.instagram.api.model.Post;
import com.springboot.instagram.api.model.User;
import com.springboot.instagram.api.repository.PostRepository;
import com.springboot.instagram.api.repository.UserRepository;
import com.springboot.instagram.api.service.PostService;
import com.springboot.instagram.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostServiceImpl implements PostService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserService userService;

    @Override
    public Post createdPost(Post post, int userId) throws UserException {

        User user = userService.findUserByUserId(userId);

        UserDto userDto = new UserDto();
        userDto.setEmail(user.getEmail());
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setUserImage(user.getImage());
        userDto.setUsername(user.getUsername());

        post.setUser(userDto);

        return postRepository.save(post);
    }

    @Override
    public String deletePost(int userId, int postId) throws UserException, PostException {

        Post post = findPostById(postId);

        User userByUserId = userService.findUserByUserId(userId);

        if (post.getUser().equals(userByUserId.getId())) {

            postRepository.deleteById(postId);

            return "Post deleted successfully";

        }
        throw new PostException("You can't delete other user's post");

    }

    @Override
    public List<Post> findPostByUserId(int userId) throws UserException {

        List<Post> posts = postRepository.findByUserId(userId);

        if (posts.size() == 0) {
            throw new UserException("This user does not have any posts yet");
        }

        return posts;
    }

    @Override
    public Post findPostById(int postId) throws PostException {

        Optional<Post> optPost = postRepository.findById(postId);

        if (optPost.isPresent()) {
            return optPost.get();
        }

        throw new PostException("no post found with postId " + postId);
    }

    @Override
    public List<Post> findAllPostsByUserIds(List<Integer> userIds) throws UserException, PostException {

        List<Post> allPostByUserIds = postRepository.findAllPostByUserIds(userIds);

        if (allPostByUserIds.size() == 0) {

            throw new PostException("no post available");
        }

        return allPostByUserIds;
    }

    @Override
    public String savedPost(int userId, int postId) throws UserException, PostException {

        Post post = findPostById(postId);

        User userByUserId = userService.findUserByUserId(userId);

        if (!userByUserId.getSavedPost().contains(post)) {

            userByUserId.getSavedPost().add(post);

            userRepository.save(userByUserId);

        }

        return "Post saved successfully";
    }

    @Override
    public String unSavedPost(int userId, int postId) throws UserException, PostException {

        Post post = findPostById(postId);

        User userByUserId = userService.findUserByUserId(userId);

        if (userByUserId.getSavedPost().contains(post)) {

            userByUserId.getSavedPost().remove(post);

            userRepository.save(userByUserId);

        }
        return "Post unsaved successfully";
    }

    @Override
    public Post likePost(int userId, int postId) throws UserException, PostException {

        Post post = findPostById(postId);

        User user = userService.findUserByUserId(userId);

        UserDto userDto = new UserDto();
        userDto.setUsername(user.getUsername());
        userDto.setEmail(user.getEmail());
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setUserImage(user.getImage());

        post.getLikedByUsers().add(userDto);

        return postRepository.save(post);
    }

    @Override
    public Post unslikePost(int userId, int postId) throws UserException, PostException {

        Post post = findPostById(postId);

        User user = userService.findUserByUserId(userId);

        UserDto userDto = new UserDto();
        userDto.setUsername(user.getUsername());
        userDto.setEmail(user.getEmail());
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setUserImage(user.getImage());

        post.getLikedByUsers().remove(userDto);

        return postRepository.save(post);
    }
}
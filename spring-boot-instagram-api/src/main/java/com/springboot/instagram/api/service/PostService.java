package com.springboot.instagram.api.service;

import com.springboot.instagram.api.exception.PostException;
import com.springboot.instagram.api.exception.UserException;
import com.springboot.instagram.api.model.Post;

import java.util.List;

public interface PostService {
    public Post createdPost(Post post, int userId) throws UserException;

    public String deletePost(int userId, int postId) throws UserException, PostException;

    public List<Post> findPostByUserId(int userId) throws UserException;

    public Post findPostById(int postId) throws PostException;

    public List<Post> findAllPostsByUserIds(List<Integer> userIds) throws UserException, PostException;

    public String savedPost(int userId, int postId) throws UserException, PostException;

    public String unSavedPost(int userId, int postId) throws UserException, PostException;

    public Post likePost(int userId, int postId) throws UserException, PostException;

    public Post unslikePost(int userId, int postId) throws UserException, PostException;

}

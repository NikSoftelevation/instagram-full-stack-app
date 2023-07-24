package com.springboot.instagram.api.service;

import com.springboot.instagram.api.exception.CommentsException;
import com.springboot.instagram.api.exception.PostException;
import com.springboot.instagram.api.exception.UserException;
import com.springboot.instagram.api.model.Comments;

public interface CommentsService {

    public Comments createComment(Comments comments, int userId, int postId) throws UserException, PostException;

    public Comments findCommentByCommentId(int commentId) throws CommentsException;

    public Comments likeComment(int commentId, int userId) throws UserException, CommentsException;

    public Comments unlikeComment(int commentId, int userId) throws UserException, CommentsException;
}

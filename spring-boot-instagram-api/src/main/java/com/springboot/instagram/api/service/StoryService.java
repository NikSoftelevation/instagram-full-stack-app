package com.springboot.instagram.api.service;

import com.springboot.instagram.api.exception.StoryException;
import com.springboot.instagram.api.exception.UserException;
import com.springboot.instagram.api.model.Story;

import java.util.List;

public interface StoryService {

    public Story createStory(Story story, int userId) throws UserException;

    public List<Story> findStoryByUserId(int userId) throws UserException, StoryException;
}
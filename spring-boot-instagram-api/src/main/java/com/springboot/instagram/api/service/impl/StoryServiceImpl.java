package com.springboot.instagram.api.service.impl;

import com.springboot.instagram.api.dto.UserDto;
import com.springboot.instagram.api.exception.StoryException;
import com.springboot.instagram.api.exception.UserException;
import com.springboot.instagram.api.model.Story;
import com.springboot.instagram.api.model.User;
import com.springboot.instagram.api.repository.StoryRepository;
import com.springboot.instagram.api.repository.UserRepository;
import com.springboot.instagram.api.service.StoryService;
import com.springboot.instagram.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class StoryServiceImpl implements StoryService {
    @Autowired
    private StoryRepository storyRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;

    @Override
    public Story createStory(Story story, int userId) throws UserException {

        User user = userService.findUserByUserId(userId);

        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setEmail(user.getEmail());
        userDto.setUsername(user.getUsername());
        userDto.setUserImage(user.getImage());
        userDto.setName(user.getName());

        story.setUser(userDto);
        story.setTimeStamp(LocalDateTime.now());

        user.getStories().add(story);

        return storyRepository.save(story);
    }

    @Override
    public List<Story> findStoryByUserId(int userId) throws UserException, StoryException {

        User userByUserId = userService.findUserByUserId(userId);

        List<Story> stories = userByUserId.getStories();

        if (stories.size() == 0) {
            throw new UserException("This user doesn't have any story");
        }
        return stories;
    }
}

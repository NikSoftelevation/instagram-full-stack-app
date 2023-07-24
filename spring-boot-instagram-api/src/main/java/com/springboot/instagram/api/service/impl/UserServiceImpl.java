package com.springboot.instagram.api.service.impl;

import com.springboot.instagram.api.jwt.JwtTokenClaims;
import com.springboot.instagram.api.jwt.JwtTokenProvider;
import com.springboot.instagram.api.dto.UserDto;
import com.springboot.instagram.api.exception.UserException;
import com.springboot.instagram.api.model.User;
import com.springboot.instagram.api.repository.UserRepository;
import com.springboot.instagram.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UserRepository userRepository;

    @Override
    public User registerUser(User user) {

        Optional<User> isEmailExist = userRepository.findByEmail(user.getEmail());

        if (isEmailExist.isPresent()) {

            throw new UserException("Email is already in use");

        }
        Optional<User> isUserExists = userRepository.findByUsername(user.getUsername());
        if (isUserExists.isPresent()) {
            throw new UserException("This Username is already taken");
        }
        if (user.getEmail() == null || user.getPassword() == null || user.getUsername() == null || user.getName() == null) {
            throw new UserException("All fields are required");
        }
        User newUser = new User();
        newUser.setEmail(user.getEmail());
        newUser.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        newUser.setUsername(user.getUsername());
        newUser.setName(user.getName());

        return userRepository.save(newUser);
    }

    @Override
    public User findUserByUserId(int userId) {

        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isPresent()) {
            return optionalUser.get();
        }

        throw new UserException("User does not exist with userId");
    }

    @Override
    public User findUserByProfile(String token) throws UserException {

        token = token.substring(7);

        JwtTokenClaims jwtTokenClaims = jwtTokenProvider.getClaimsFromToken(token);

        String email = jwtTokenClaims.getUsername();

        Optional<User> opt = userRepository.findByEmail(email);

        if (opt.isPresent()) {
            return opt.get();
        }
        throw new UserException("Invalid Token");
    }

    @Override
    public User findUserByUsername(String username) throws UserException {
        Optional<User> optionalUser = userRepository.findByUsername(username);

        if (optionalUser.isPresent()) {
            return optionalUser.get();
        }
        throw new UserException("No user found with username " + username);
    }

    @Override
    public String followUser(int reqUserId, int followUserId) {

        User reqUser = findUserByUserId(reqUserId);
        User followUser = findUserByUserId(followUserId);

        UserDto follower = new UserDto();
        follower.setEmail(reqUser.getEmail());
        follower.setId(reqUser.getId());
        follower.setUserImage(reqUser.getImage());
        follower.setUsername(reqUser.getUsername());
        follower.setName(reqUser.getName());

        UserDto following = new UserDto();
        following.setEmail(followUser.getEmail());
        following.setId(followUser.getId());
        following.setUserImage(followUser.getImage());
        following.setUsername(followUser.getUsername());
        following.setName(followUser.getName());

        reqUser.getFollowing().add(following);
        followUser.getFollower().add(follower);

        userRepository.save(followUser);
        userRepository.save(reqUser);

        return "You are following " + followUser.getUsername();
    }

    @Override
    public String unFollowUser(int reqUserId, int followUserId) {

        User reqUser = findUserByUserId(reqUserId);
        User followUser = findUserByUserId(followUserId);

        UserDto follower = new UserDto();
        follower.setEmail(reqUser.getEmail());
        follower.setId(reqUser.getId());
        follower.setUserImage(reqUser.getImage());
        follower.setUsername(reqUser.getUsername());
        follower.setName(reqUser.getName());

        UserDto following = new UserDto();
        following.setEmail(followUser.getEmail());
        following.setId(followUser.getId());
        following.setUserImage(followUser.getImage());
        following.setUsername(followUser.getUsername());
        following.setName(follower.getName());

        reqUser.getFollowing().add(follower);
        followUser.getFollower().add(follower);

        userRepository.save(followUser);
        userRepository.save(reqUser);


        return "You have unfollowed " + followUser.getUsername();
    }

    @Override
    public List<User> findUserByIds(List<Integer> userIds) {

        List<User> allUsersByUserIds = userRepository.findAllUsersByUserIds(userIds);

        return allUsersByUserIds;
    }

    @Override
    public List<User> searchUser(String query) {

        List<User> users = userRepository.findByQuery(query);
        if (users.size() == 0) {
            throw new UserException("User not found");
        }

        return users;
    }

    @Override
    public User updateUserDetails(User updatedUser, User existingUser) throws UserException {
        if (updatedUser.getEmail() != null) {
            existingUser.setEmail(updatedUser.getEmail());
        }
        if (updatedUser.getBio() != null) {
            existingUser.setBio(updatedUser.getBio());
        }
        if (updatedUser.getName() != null) {
            existingUser.setName(updatedUser.getName());
        }
        if (updatedUser.getUsername() != null) {
            existingUser.setUsername(updatedUser.getUsername());
        }
        if (updatedUser.getMobile() != null) {
            existingUser.setMobile(updatedUser.getMobile());
        }
        if (updatedUser.getGender() != null) {
            existingUser.setGender(updatedUser.getGender());
        }
        if (updatedUser.getWebsite() != null) {
            existingUser.setWebsite(updatedUser.getWebsite());
        }
        if (updatedUser.getImage() != null) {
            existingUser.setImage(updatedUser.getImage());
        }
        if (updatedUser.getId() == existingUser.getId()) {
            return userRepository.save(existingUser);
        }
        throw new UserException("You can't update this user");
    }
}

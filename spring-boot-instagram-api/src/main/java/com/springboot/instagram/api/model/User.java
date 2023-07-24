package com.springboot.instagram.api.model;

import com.springboot.instagram.api.dto.UserDto;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String username;
    private String name;
    private String email;
    private String mobile;
    private String website;
    private String bio;
    private String gender;
    private String image;
    private String password;

    @Embedded
    @ElementCollection
    private Set<UserDto> follower = new HashSet<>();

    @Embedded
    @ElementCollection
    private Set<UserDto> following = new HashSet<>();

    @OneToMany(cascade=CascadeType.ALL,fetch=FetchType.EAGER)
    private List<Story> stories = new ArrayList<>();

    @ManyToMany
    private List<Post> savedPost = new ArrayList<>();
}

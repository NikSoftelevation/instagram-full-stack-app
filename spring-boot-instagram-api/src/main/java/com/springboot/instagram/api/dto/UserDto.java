package com.springboot.instagram.api.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private int id;
    private String username;
    private String email;
    private String name;
    private String userImage;
}

package com.springboot.instagram.api.jwt;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JwtTokenClaims {
    public String username;
}

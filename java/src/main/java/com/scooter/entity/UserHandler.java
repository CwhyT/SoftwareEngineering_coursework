package com.scooter.entity;

import lombok.Data;

import javax.persistence.Transient;

@Data

public class UserHandler {

    @Transient
    private Integer loginId;
}

package com.scooter.repository;

import com.scooter.entity.UserFeedback;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * <p>
 * 用户问题反馈表 Mapper 接口
 * </p>
 */
public interface UserFeedbackRepository extends JpaRepository<UserFeedback, Integer> {

}

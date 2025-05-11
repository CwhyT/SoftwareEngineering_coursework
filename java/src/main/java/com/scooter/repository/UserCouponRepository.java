package com.scooter.repository;

import com.scooter.entity.UserCoupon;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * <p>
 * 用户优惠券中间表 Mapper 接口
 * </p>
 */
public interface UserCouponRepository extends JpaRepository<UserCoupon, Integer> {

}

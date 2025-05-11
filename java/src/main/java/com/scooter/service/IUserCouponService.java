package com.scooter.service;

import com.scooter.entity.UserCoupon;

import java.util.List;

/**
 * <p>
 * 用户优惠券中间表 服务类
 * </p>
 */
public interface IUserCouponService {

    UserCoupon save(UserCoupon userCoupon) throws Exception;

    UserCoupon update(UserCoupon userCoupon) throws Exception;

    UserCoupon getInfo(UserCoupon userCoupon) throws Exception;

    UserCoupon delete(UserCoupon userCoupon)throws Exception;

    List<UserCoupon> getList(UserCoupon userCoupon) throws Exception;
}

package com.scooter.service;

import com.scooter.entity.UserFeedback;

import java.util.List;

/**
 * <p>
 * 用户问题反馈表 服务类
 * </p>
 */
public interface IUserFeedbackService {

    UserFeedback save(UserFeedback userCoupon) throws Exception;

    UserFeedback update(UserFeedback userCoupon) throws Exception;

    UserFeedback getInfo(UserFeedback userCoupon) throws Exception;

    UserFeedback delete(UserFeedback userCoupon)throws Exception;

    List<UserFeedback> getList(UserFeedback userCoupon) throws Exception;

}

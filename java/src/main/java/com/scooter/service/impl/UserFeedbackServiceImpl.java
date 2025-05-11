package com.scooter.service.impl;

import com.scooter.entity.UserCoupon;
import com.scooter.entity.UserFeedback;
import com.scooter.repository.UserFeedbackRepository;
import com.scooter.service.IUserFeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * <p>
 * 用户问题反馈表 服务实现类
 * </p>
 *
 * @author 
 * @since 2025-05-09
 */
@Service
public class UserFeedbackServiceImpl implements IUserFeedbackService {


    @Autowired
    private UserFeedbackRepository userFeedbackRepository;
    @Override
    public UserFeedback save(UserFeedback userCoupon) throws Exception {
        try {
            userCoupon.setStatus(0);
            userCoupon.setResponseStatus(0);
            userCoupon.setUserId(userCoupon.getLoginId());
            return userFeedbackRepository.save(userCoupon);
        } catch (Exception e) {
            throw new Exception(e);
        }
    }

    @Override
    public UserFeedback update(UserFeedback userCoupon) throws Exception {
        userCoupon.setUpdateTime(LocalDateTime.now());
        try {
            return userFeedbackRepository.save(userCoupon);
        } catch (Exception e) {
            throw new Exception(e);
        }
    }

    @Override
    public UserFeedback getInfo(UserFeedback userCoupon) throws Exception {
        try {
            Optional<UserFeedback> byId = userFeedbackRepository.findById(userCoupon.getId());
            return byId.get();
        } catch (Exception e) {
            throw new Exception(e);
        }
    }

    @Override
    public UserFeedback delete(UserFeedback userCoupon) throws Exception {
        try {
            userFeedbackRepository.deleteById(userCoupon.getId());
            return new UserFeedback();
        } catch (Exception e) {
            throw new Exception(e);
        }
    }

    @Override
    public List<UserFeedback> getList(UserFeedback userCoupon) throws Exception {
        try {
            List<UserFeedback> all = userFeedbackRepository.findAll();
            if (userCoupon.getLoginId() == 3){
                return all;
            }
            return all.stream()
                    .filter(e -> e.getUserId().equals(userCoupon.getLoginId()))
                    .sorted(Comparator.comparing(UserFeedback::getCreateTime).reversed())
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new Exception(e);
        }
    }
}

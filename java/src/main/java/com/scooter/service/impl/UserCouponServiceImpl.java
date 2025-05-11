package com.scooter.service.impl;

import com.scooter.entity.UserCoupon;
import com.scooter.repository.UserCouponRepository;
import com.scooter.service.IUserCouponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * <p>
 * 用户优惠券中间表 服务实现类
 * </p>
 */
@Service
public class UserCouponServiceImpl  implements IUserCouponService {


    @Autowired
    private UserCouponRepository userCouponRepository;
    @Override
    public UserCoupon save(UserCoupon userCoupon) throws Exception {
        try {
//            userCoupon.setUserId(userCoupon.getLoginId());
            userCoupon.setStatus(0);
            return userCouponRepository.save(userCoupon);
        } catch (Exception e) {
            throw new Exception(e);
        }
    }

    @Override
    public UserCoupon update(UserCoupon userCoupon) throws Exception {
        userCoupon.setUpdateTime(LocalDateTime.now());
        try {
            return userCouponRepository.save(userCoupon);
        } catch (Exception e) {
            throw new Exception(e);
        }
    }

    @Override
    public UserCoupon getInfo(UserCoupon userCoupon) throws Exception {
        try {
            Optional<UserCoupon> byId = userCouponRepository.findById(userCoupon.getId());
            return byId.get();
        } catch (Exception e) {
            throw new Exception(e);
        }
    }

    @Override
    public UserCoupon delete(UserCoupon userCoupon) throws Exception {
        try {
            userCouponRepository.deleteById(userCoupon.getId());
            return new UserCoupon();
        } catch (Exception e) {
            throw new Exception(e);
        }
    }

    @Override
    public List<UserCoupon> getList(UserCoupon userCoupon) throws Exception {
        try {
            List<UserCoupon> all = userCouponRepository.findAll();
            if (userCoupon.getLoginId() == 3){
                return all;
            }
            return all.stream()
                    .filter(e -> e.getUserId().equals(userCoupon.getLoginId()))
                    .sorted(Comparator.comparing(UserCoupon::getCreateTime).reversed())
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new Exception(e);
        }
    }
}

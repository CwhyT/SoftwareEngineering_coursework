package com.scooter.controller;


import com.scooter.entity.UserCoupon;
import com.scooter.service.IUserCouponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 用户优惠券中间表 前端控制器
 * </p>
 */
@RestController
@RequestMapping("/api/user-coupon")
public class UserCouponController {


    @Autowired
    private IUserCouponService userCouponService;

    @GetMapping("/save")
    public ResponseEntity<?> save(UserCoupon userCoupon) {
        Map<String, Object> result = new HashMap<>();
        try {
            UserCoupon save = userCouponService.save(userCoupon);
            result.put("data", save);
            result.put("success", true);
            result.put("message", "保存成功！");
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", e.getMessage());
            return ResponseEntity.ok(result);
        }
    }

    @GetMapping("/update")
    public ResponseEntity<?> update(UserCoupon userCoupon) {
        Map<String, Object> result = new HashMap<>();
        try {
            UserCoupon save = userCouponService.update(userCoupon);
            result.put("data", save);
            result.put("success", true);
            result.put("message", "保存成功！");
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", e.getMessage());
            return ResponseEntity.ok(result);
        }
    }

    @GetMapping("/getInfo")
    public ResponseEntity<?> getInfo(UserCoupon userCoupon) {
        Map<String, Object> result = new HashMap<>();
        try {
            UserCoupon save = userCouponService.getInfo(userCoupon);
            result.put("data", save);
            result.put("success", true);
            result.put("message", "保存成功！");
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", e.getMessage());
            return ResponseEntity.ok(result);
        }
    }

    @GetMapping("/delete")
    public ResponseEntity<?> delete(UserCoupon userCoupon) {
        Map<String, Object> result = new HashMap<>();
        try {
            userCouponService.delete(userCoupon);
//            result.put("data", save);
            result.put("success", true);
            result.put("message", "保存成功！");
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", e.getMessage());
            return ResponseEntity.ok(result);
        }
    }

    @GetMapping("/getList")
    public ResponseEntity<?> getList(UserCoupon userCoupon) {
        Map<String, Object> result = new HashMap<>();
        try {
            List<UserCoupon> list = userCouponService.getList(userCoupon);
            result.put("data", list);
            result.put("success", true);
            result.put("message", "保存成功！");
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", e.getMessage());
            return ResponseEntity.ok(result);
        }
    }
}

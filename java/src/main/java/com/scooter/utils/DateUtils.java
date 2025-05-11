package com.scooter.utils;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class DateUtils {

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    /**
     * 获取最近7天的日期列表（包含今天）
     * @return 最近7天的日期列表，格式为"yyyy-MM-dd"，按日期从早到晚排序
     */
    public static List<String> getLast7Days() {
        List<String> dateList = new ArrayList<>();
        LocalDate today = LocalDate.now();

        for (int i = 6; i >= 0; i--) {
            LocalDate date = today.minusDays(i);
            dateList.add(date.format(DATE_FORMATTER));
        }

        return dateList;
    }

    /**
     * 获取最近一个月的日期列表（包含今天）
     * @return 最近30天的日期列表，格式为"yyyy-MM-dd"，按日期从早到晚排序
     */
    public static List<String> getLastMonth() {
        List<String> dateList = new ArrayList<>();
        LocalDate today = LocalDate.now();

        for (int i = 29; i >= 0; i--) {
            LocalDate date = today.minusDays(i);
            dateList.add(date.format(DATE_FORMATTER));
        }

        return dateList;
    }

    // 测试方法
    public static void main(String[] args) {
        System.out.println("最近7天日期:");
        System.out.println(getLast7Days());

        System.out.println("\n最近30天日期:");
        System.out.println(getLastMonth());
    }
}

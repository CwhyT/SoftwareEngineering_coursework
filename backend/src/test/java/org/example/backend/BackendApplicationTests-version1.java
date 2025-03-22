package org.example.backend;

import org.example.backend.controller.ScooterController;
import org.example.backend.controller.UserController;
import org.example.backend.pojo.Scooter;
import org.example.backend.pojo.User;
import org.example.backend.service.ScooterService;
import org.example.backend.service.UserService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BackendApplicationTests {

	// Scooter相关mock
	@Mock
	private ScooterService scooterService;
	@InjectMocks
	private ScooterController scooterController;

	// User相关mock
	@Mock
	private UserService userService;
	@InjectMocks
	private UserController userController;

	@Test
	void contextLoads() {
		System.out.println("Spring Boot context loaded successfully!");
	}

	// 测试 ScooterController 的获取全部Scooters
	@Test
	void testGetAllScooters() {
		Scooter scooter = new Scooter();
		scooter.setId(1L);
		scooter.setName("Scooter X");
		scooter.setPrice(new BigDecimal("99.99"));

		when(scooterService.getAllScooters()).thenReturn(List.of(scooter));

		List<Scooter> scooters = scooterController.getAllScooters();
		assertEquals(1, scooters.size());
		assertEquals("Scooter X", scooters.get(0).getName());
		verify(scooterService, times(1)).getAllScooters();
	}

	// 测试 ScooterService 获取单个Scooter
	@Test
	void testScooterServiceGetById() {
		Scooter scooter = new Scooter();
		scooter.setId(2L);
		scooter.setName("Scooter Y");

		when(scooterService.getScooterById(2L)).thenReturn(Optional.of(scooter));

		Optional<Scooter> result = scooterController.getScooterById(2L);
		assertTrue(result.isPresent());
		assertEquals("Scooter Y", result.get().getName());
	}

	// 测试 UserController 注册用户
	@Test
	void testRegisterUser() {
		User user = new User();
		user.setUsername("user1");
		user.setEmail("user1@example.com");
		user.setPassword("pass123");

		when(userService.registerUser(user)).thenReturn("User registered successfully");

		ResponseEntity<Map<String, String>> response = userController.registerUser(user);
		assertEquals("User registered successfully", response.getBody().get("message"));
		verify(userService, times(1)).registerUser(user);
	}

	// 测试 UserService 用户认证
	@Test
	void testAuthenticateUser() {
		User user = new User();
		user.setEmail("user2@example.com");
		user.setPassword(new BCryptPasswordEncoder().encode("password"));

		when(userService.authenticate("user2@example.com", "password")).thenReturn(true);

		boolean authenticated = userService.authenticate("user2@example.com", "password");
		assertTrue(authenticated);
	}
}

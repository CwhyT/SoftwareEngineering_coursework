# Scooter Rental System

## Project Overview

The Scooter Rental System is a full-stack application that allows users to browse, rent, and manage electric scooters. The system consists of a Vue frontend and a Spring Boot backend, providing a complete scooter rental service, including user registration/login, scooter browsing, order management, payment processing, and more.

## Online Demo

The project is deployed and accessible online at:
- **URL**: [http://47.108.49.173:8099/](http://47.108.49.173:8099/)

You can visit this URL to see the application in action without setting up your local environment.

## Technology Stack

### Frontend
- Vue 3
- Vite
- Element Plus
- Axios
- Pinia
- Vue Router
- ECharts

### Backend
- Java 11
- Spring Boot 2.7.0
- Spring Security
- Spring Data JPA
- MySQL 8.0
- JWT Authentication
- Maven

## System Requirements

- Node.js >= 16.0.0 < 24.0.0
- Java JDK 11
- MySQL 8.0+
- Maven 3.6+

## Installation Steps

### Prerequisites

1. Ensure Node.js, Java JDK 11, and MySQL 8.0 are installed
2. Make sure MySQL service is running
3. Ensure Maven is correctly installed and configured

### Database Configuration

1. Log into MySQL:

```bash
mysql -u root -p
```

2. Create the database:

```sql
CREATE DATABASE scooter_rental CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Backend Installation and Configuration

1. Clone the project repository (if not already done)

2. Navigate to the java directory:

```bash
cd java
```

3. Edit the configuration file `src/main/resources/application.yml`, modify the database connection information:

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/scooter_rental?useSSL=false&serverTimezone=Asia/Shanghai&allowPublicKeyRetrieval=true&createDatabaseIfNotExist=true
    username: root  # Change to your MySQL username
    password: 123456  # Change to your MySQL password
    driver-class-name: com.mysql.cj.jdbc.Driver
```

4. Compile the project using Maven:

```bash
mvn clean install
```

### Frontend Installation and Configuration

1. Navigate to the vue directory:

```bash
cd ../vue
```

2. Install dependencies:

```bash
npm install
```

3. To modify the API address, edit the `.env` file or create a `.env.local` file:

```
VITE_API_BASE_URL=http://localhost:8082/api
```

## Starting the System

### Starting the Backend

1. Navigate to the java directory:

```bash
cd java
```

2. Start the Spring Boot application:

```bash
mvn spring-boot:run
```

The backend will run on port 8082.

### Starting the Frontend

1. Navigate to the vue directory:

```bash
cd ../vue
```

2. Start the development server:

```bash
npm run dev
```

The frontend will run on port 5173 or 5174, the specific address will be displayed in the terminal.

3. Access the frontend application in a browser, typically at: `http://localhost:5174/`

## Database Structure

The system includes the following main data tables:
- users - User information
- scooters - Scooter information
- stores - Store information
- orders - Order information
- payment_methods - Payment methods
- user_coupon - User coupons
- user_feedback - User feedback

## Main Features

1. User registration and login
2. Scooter browsing and search
3. Scooter rental
4. Order management
5. Payment processing
6. User feedback
7. Data statistics and analysis

## System Configuration

### Email Service Configuration

Configure the email service in `application.yml`:

```yaml
spring:
  mail:
    host: smtp.qq.com
    port: 465
    username: your-email@qq.com
    password: your-smtp-password
    properties:
      mail:
        smtp:
          auth: true
          ssl:
            enable: true
```

### JWT Configuration

Configure JWT in `application.yml`:

```yaml
jwt:
  secret: your-jwt-secret-key
  expiration: 86400000 # 24 hours
```

## Production Deployment

### Frontend Build

```bash
cd vue
npm run build
```

The built files will be in the `dist` directory and can be deployed to any web server.

### Backend Deployment

Build the JAR file using Maven:

```bash
cd java
mvn clean package
```

Then run the JAR file:

```bash
java -jar target/scooter-rental-1.0.0.jar
```

## Common Issues

1. **Database Connection Failure**
   - Make sure the MySQL service is running
   - Verify the database credentials in the application.yml file
   - Check if the database exists and has been created correctly

2. **Port Conflicts**
   - If port 8082 is already in use, modify the port in application.yml
   - If the frontend port is in use, Vite will automatically try the next available port

3. **Dependency Issues**
   - Ensure all dependencies are correctly installed using `npm install` for frontend
   - For backend, run `mvn clean install` to resolve dependency issues

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Spring Boot for the backend framework
- Vue.js for the frontend framework
- Element Plus for the UI components
- All other open source libraries used in this project 
package Klm1.KLMLineMaintenanceServer;

import Klm1.KLMLineMaintenanceServer.controllers.UserController;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class KlmLineMaintenanceServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(KlmLineMaintenanceServerApplication.class, args);
    UserController userController = new UserController();
    System.out.println(userController.getUsers());
	}


}

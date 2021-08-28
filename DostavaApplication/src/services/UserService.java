package services;

import java.io.IOException;

import com.google.gson.JsonSyntaxException;

import beans.Customer;
import beans.Deliverer;
import beans.Manager;
import beans.User;
import dao.UserDAO;
import dto.RegistrationDTO;

public class UserService {
	
	private UserDAO userDAO;
	
	public UserService(UserDAO userDAO) {
		this.userDAO = userDAO;
	}
	
	public User register(RegistrationDTO registrationForm) throws JsonSyntaxException, IOException {
		User registeredUser = userDAO.getByID(registrationForm.getUsername());
		if( registeredUser == null) {
			switch(registrationForm.getRole()) {
			case Customer:
				registeredUser = new Customer(registrationForm.getUsername(), registrationForm.getPassword(),
						registrationForm.getName(), registrationForm.getSurname(), registrationForm.getGender(),
						registrationForm.getBirthdate(), registrationForm.getRole());
				break;
			case Manager:
				registeredUser = new Manager(registrationForm.getUsername(), registrationForm.getPassword(),
						registrationForm.getName(), registrationForm.getSurname(), registrationForm.getGender(),
						registrationForm.getBirthdate(), registrationForm.getRole());
				break;
			case Deliverer:
				registeredUser = new Deliverer(registrationForm.getUsername(), registrationForm.getPassword(),
						registrationForm.getName(), registrationForm.getSurname(), registrationForm.getGender(),
						registrationForm.getBirthdate(), registrationForm.getRole());
				break;
			default:
				break;
			}
			userDAO.save(registeredUser);
		}
		return registeredUser;
	}

}

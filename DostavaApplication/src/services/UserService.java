package services;

import java.io.IOException;

import com.google.gson.JsonSyntaxException;

import beans.Customer;
import beans.Deliverer;
import beans.Manager;
import beans.User;
import dao.UserDAO;
import dto.LogInDTO;
import dto.RegistrationDTO;

public class UserService {
	
	private UserDAO userDAO;
	
	public UserService(UserDAO userDAO) {
		this.userDAO = userDAO;
	}
	
	public User register(RegistrationDTO registrationForm) throws JsonSyntaxException, IOException {
		User newRegistration = null;
		User registeredUser = userDAO.getByID(registrationForm.getUsername());
		if( registeredUser == null) {
			switch(registrationForm.getRole()) {
			case Customer:
				newRegistration = new Customer(registrationForm.getUsername(), registrationForm.getPassword(),
						registrationForm.getName(), registrationForm.getSurname(), registrationForm.getGender(),
						registrationForm.getBirthdate(), registrationForm.getRole());
				break;
			case Manager:
				newRegistration = new Manager(registrationForm.getUsername(), registrationForm.getPassword(),
						registrationForm.getName(), registrationForm.getSurname(), registrationForm.getGender(),
						registrationForm.getBirthdate(), registrationForm.getRole());
				break;
			case Deliverer:
				newRegistration = new Deliverer(registrationForm.getUsername(), registrationForm.getPassword(),
						registrationForm.getName(), registrationForm.getSurname(), registrationForm.getGender(),
						registrationForm.getBirthdate(), registrationForm.getRole());
				break;
			default:
				break;
			}
			userDAO.save(newRegistration);
		}
		return newRegistration;
	}

	public User logIn(LogInDTO logInForm) throws JsonSyntaxException, IOException{
		User registeredUser = userDAO.getByID(logInForm.getUsername());
		if(registeredUser == null || !registeredUser.getPassword().equals(logInForm.getPassword())){
			registeredUser = null;
		}
		return registeredUser;
	}

}

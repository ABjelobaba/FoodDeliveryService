package beans;

import java.util.Date;

public class User implements IEntity<String> {
	private String username;
	private String password;
	private String name;
	private String surname;
	private Gender gender;
	private Date birthdate;
	private Role role;
	private boolean deleted;
	private boolean blocked;
	
	public User(String username, String password, String name, String surname, Gender gender, Date birthdate,
			Role role) {
		super();
		this.username = username;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.gender = gender;
		this.birthdate = birthdate;
		this.role = role;
		this.deleted = false;
		this.blocked = false;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public Gender getGender() {
		return gender;
	}

	public void setGender(Gender gender) {
		this.gender = gender;
	}

	public Date getBirthdate() {
		return birthdate;
	}

	public void setBirthdate(Date birthdate) {
		this.birthdate = birthdate;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	public boolean isBlocked() {
		return blocked;
	}

	public void setBlocked(boolean blocked) {
		this.blocked = blocked;
	}

	@Override
	public String getID() {
		return this.username;
	}

	@Override
	public void setID(String id) {
		this.username = id;
	}

	@Override
	public boolean isEqual(String id) {
		return this.username.equals(id);
	}
	
	
	
}

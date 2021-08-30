package beans;

import java.util.Date;

public class Administrator extends User{

    public Administrator(String username, String password, String name, String surname, Gender gender, Date birthdate,
            Role role) {
        super(username, password, name, surname, gender, birthdate, role);
    }
}

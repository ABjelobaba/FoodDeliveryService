package beans;

public interface IEntity<ID> {
	ID getID();
	void setID(ID id);
	boolean isDeleted();
	void setDeleted(boolean value);
}

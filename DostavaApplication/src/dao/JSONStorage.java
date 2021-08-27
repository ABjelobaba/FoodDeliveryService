package dao;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;
import java.lang.reflect.Type;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;

import beans.IEntity;

public class JSONStorage<T extends IEntity<ID>, ID> implements IDao<T, ID> {
	private String fileLocation;
	private Type classType;
	private Gson gson;

	public JSONStorage(String fileLocation, Type classType, Gson gson) {
		super();
		this.fileLocation = fileLocation;
		this.classType = classType;
		this.gson = gson;
	}

	@Override
	public List<T> getAllNotDeleted() throws JsonSyntaxException, IOException {
		ArrayList<T> notDeleted = new ArrayList<T>();
		
		for (T entity : getAll()) {
			if (!entity.isDeleted()) {
				notDeleted.add(entity);
			}
		}
		return notDeleted;
	}
	
	@Override
	public List<T> getAll() throws JsonSyntaxException, IOException {
		ArrayList<T> allEntities = gson.fromJson(
				(Files.readAllLines(Paths.get(fileLocation), Charset.defaultCharset()).size() == 0) ? "" : 
					Files.readAllLines(Paths.get(fileLocation), Charset.defaultCharset()).get(0), classType);
		
		if (allEntities == null) {
			allEntities = new ArrayList<T>();
		}
		
		return  allEntities;
	}

	@Override
	public T getByID(ID id) throws JsonSyntaxException, IOException {
		T entity = null;
		ArrayList<T> allEntities = (ArrayList<T>) getAll();
		
		if(!allEntities.isEmpty())
		{
			for(T en : allEntities) {
				if(en.isEqual(id)) {
					entity = en;
					break;
				}
			}
		}
		
		return entity;
	}

	@Override
	public T save(T entity) throws JsonSyntaxException, IOException {
		ArrayList<T> allEntities = (ArrayList<T>) getAll();
		allEntities.add(entity);
		saveAll(allEntities);
		
		return entity;
	}

	@Override
	public T update(T entity) throws JsonSyntaxException, IOException {
		ArrayList<T> allEntities = (ArrayList<T>) getAll();
		
		for (int i = 0; i < allEntities.size(); i++) {
			if(allEntities.get(i).isEqual(entity.getID())) {
				allEntities.set(i, entity);
				break;
			}
		}
		saveAll(allEntities);
		
		return entity;
	}

	@Override
	public boolean delete(T entity) throws JsonSyntaxException, IOException {
		boolean isSuccessful = false;
		
		for(T en : getAll()) {
			if(en.isEqual(entity.getID())) {
				en.setDeleted(true);
				update(en);
				isSuccessful = true;
				break;
			}
		}
		return isSuccessful;
	}

	@Override
	public void saveAll(List<T> entities) throws FileNotFoundException {
		PrintWriter writer = new PrintWriter(fileLocation);
		String allEntities = gson.toJson(entities, classType);
		writer.println(allEntities);
		writer.close();	
	}

}

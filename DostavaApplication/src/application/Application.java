package application;

import static spark.Spark.delete;
import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.put;
import static spark.Spark.staticFiles;

import java.io.File;
import java.io.IOException;


public class Application {
	public static void main(String[] args) throws IOException {

		port(8080);
		staticFiles.externalLocation(new File("./static").getCanonicalPath());


		get("/test", (req, res) -> {
			return "Works";
		});
		
	}
}

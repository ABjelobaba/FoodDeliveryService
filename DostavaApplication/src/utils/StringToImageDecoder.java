package utils;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Base64;

public class StringToImageDecoder {
	
	public void decodeBase64ToImage(String data, String imageLocation) throws FileNotFoundException, IOException {
		String parts[] = data.split(",");
		//System.out.println(parts[0]);
		byte[] decodedData = Base64.getDecoder().decode(parts[1]);
		
		try (OutputStream out = new FileOutputStream(imageLocation)) {
			out.write(decodedData);
		}
		
	}

}

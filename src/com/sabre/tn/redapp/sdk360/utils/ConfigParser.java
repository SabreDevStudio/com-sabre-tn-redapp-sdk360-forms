package com.sabre.tn.redapp.sdk360.utils;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import com.sabre.tn.redapp.sdk360.Activator;


public class ConfigParser {
	
	//reads JSON files and serves as "key/value" getter for data
	public static Object getJSONValue(String key){
		
		JSONParser jp = new JSONParser();
		
		File xmlFile = Activator.getDefault().getDataFile(Activator.PLUGIN_ID, "/resources/configs.json");

		try(FileReader fr = new FileReader(xmlFile)){
			JSONObject obj = (JSONObject)jp.parse(fr);
			
			JSONObject objRet = null;
			
			
			if(obj.containsKey(key)){
				objRet =  (JSONObject) obj.get(key);
			}

			
			
			//Activator.getDefault().getLoggerService().info(arrRet.toJSONString());
			Activator.getDefault().getLoggerService().info(objRet.toJSONString());

			return objRet;
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        } catch (Exception e) {
			e.printStackTrace();
		}
		
		return null;
	}

}

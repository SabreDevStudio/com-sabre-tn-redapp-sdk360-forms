package com.sabre.tn.redapp.sdk360.ticketmaster;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Optional;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import com.sabre.stl.pos.srw.nextgen.flow.ext.v2.FlowExtPointCommand;
import com.sabre.stl.pos.srw.nextgen.flow.ext.v2.FlowExtPointDataOperation;
import com.sabre.stl.pos.srw.nextgen.flow.ext.v2.FlowExtPointResponse;
import com.sabre.stl.pos.srw.nextgen.flow.ext.v2.FlowExtPointResponseWrapper;
import com.sabre.tn.redapp.sdk360.Activator;
import com.sabre.tn.redapp.sdk360.data.EventType;
import com.sabre.tn.redapp.sdk360.data.EventsType;
import com.sabre.tn.redapp.sdk360.data.RequestType;


import static com.sabre.stl.pos.srw.nextgen.flow.ext.utils.FlowExtPointCommandUtils.addError;
import static com.sabre.stl.pos.srw.nextgen.flow.ext.utils.FlowExtPointErrorFactory.createMajorError;


public class CustomSvcHandler implements ICustomSvcHandler {

	@Override
	public FlowExtPointCommand execute(FlowExtPointCommand extPointCommand) {

			
		String operation = "";
		Optional <RequestType> svcRQ = fetchRequest(extPointCommand, RequestType.class);
		if(svcRQ.isPresent()){
			operation = svcRQ.get().getOperation();
		}
		
		switch(operation){
			case "search":
				return processSearchService(extPointCommand, svcRQ.get());
			case "display":
			
			default:
				return null;

		}

		
		
	}
	
	private FlowExtPointCommand processSearchService(FlowExtPointCommand extPointCommand, RequestType rq){
		try {
			//prepare HTTP connection to ticketmaster API
			URL apiEndPoint = new URL(getTicketMasterURL().concat(rq.getQueryParameters().isEmpty()?"":"&".concat(rq.getQueryParameters())));
			HttpURLConnection conn = (HttpURLConnection) apiEndPoint.openConnection();
			
			//conn.setRequestMethod("GET");
			
			//send request
			
			//get response
			String resStr="";
			String inputLine="";
			
			BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			
			while((inputLine = in.readLine()) !=null){
				resStr = resStr.concat(inputLine);
			}
			in.close();
			
			//log the service response
			Activator.getDefault().getLoggerService().info(resStr);
			
			//try to parse the JSON payload
			JSONParser jp = new JSONParser();
			JSONObject ob = (JSONObject)jp.parse(resStr);
			
			//create the response object to be sent to FrontEnd
			EventsType retEvents = new EventsType();
			
			if(ob.containsKey("_embedded")){
				JSONObject rs1 = (JSONObject) ob.get("_embedded");
				if(rs1.containsKey("events")){
					JSONArray rs2 = (JSONArray) rs1.get("events");
					for (Object evt : rs2) {
						retEvents.getEvents().add(parseEvtObject((JSONObject)evt));
						
					}
					
					// rs2.forEach(evt -> retEvents.getEvents().add(parseEvtObject((JSONObject)evt)));
				}
			}
			
			Activator.getDefault().getLoggerService().info(retEvents.toString());

			FlowExtPointResponse data = new FlowExtPointResponse();

			
			data.setStructure(retEvents);
			
			FlowExtPointResponseWrapper rswp = new FlowExtPointResponseWrapper();
			rswp.setResponse(data);
			rswp.setOperation(FlowExtPointDataOperation.ADD);
			
			extPointCommand.getResponses().add(rswp);
			

			
			
			
		} catch (Exception e) {

			Activator.getDefault().getLoggerService().severe(e.getMessage());
			addError(extPointCommand,createMajorError("error processing service: ".concat(e.getMessage()) ));

			
		}
		
		return extPointCommand;
		
	}
	
	private EventType parseEvtObject(JSONObject obj){
		
		EventType evt;
		try{
			evt = new EventType();
			if(obj.containsKey("name")) evt.setName(obj.get("name").toString());
			if(obj.containsKey("id")) evt.setId(obj.get("id").toString());
			if(obj.containsKey("type")) evt.setType(obj.get("type").toString());
			if(obj.containsKey("url")) evt.setUrl(obj.get("url").toString());
			if(obj.containsKey("locale")) evt.setLocale(obj.get("locale").toString());
			
			return evt;
		}catch(Exception e){
			e.printStackTrace();
		}
		
		return null;
	}
	
	private String getTicketMasterURL(){
		String ep = "https://app.ticketmaster.com/discovery/v2/events.json?";
		String apiKey = "apikey=OnA9MYybaCF4XnIpuS8BXXe9hmeBg0mx";
		return ep.concat(apiKey);
	}
	
    private <T> Optional <T> fetchRequest(FlowExtPointCommand extPointCommand, Class <T> type)
    {
        return extPointCommand.getRequests().stream().map(wrapper -> wrapper.getRequest())
            .filter(type::isInstance).map(type::cast).findFirst();
    }
    
    private FlowExtPointResponseWrapper wrapResponse(Object response)
    {
        FlowExtPointResponseWrapper wrapper = new FlowExtPointResponseWrapper();
        wrapper.setResponse(new FlowExtPointResponse());
        wrapper.getResponse().setStructure(response);
        wrapper.setOperation(FlowExtPointDataOperation.ADD);
        return wrapper;
    }	

}

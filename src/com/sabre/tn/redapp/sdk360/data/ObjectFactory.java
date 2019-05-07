package com.sabre.tn.redapp.sdk360.data;

import javax.xml.bind.annotation.XmlRegistry;

@XmlRegistry
public class ObjectFactory {
	
	public ObjectFactory() {
	}
	
	public EventType createEventType() {
		return new EventType();
	}
	
	public EventsType createEventsType(){
		return new EventsType();
	}
	
	public RequestType createRequestType(){
		return new RequestType();
	}

}

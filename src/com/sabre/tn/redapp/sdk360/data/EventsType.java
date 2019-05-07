package com.sabre.tn.redapp.sdk360.data;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

@XmlRootElement(name = "EventsType", namespace = "http://redapp.sabre.com/sdk360")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "EventsType", namespace = "http://redapp.sabre.com/sdk360", propOrder = {
		"events" })
public class EventsType {
	
	
	@XmlElement(name = "events", required = true)
	List<EventType> events;
	
	public List<EventType> getEvents() {
		if(events==null)
			events = new ArrayList<EventType>();
		
		return events;
	}
	
	public void setEvents(List<EventType> events) {
		this.events = events;
	}
	
}

package com.sabre.tn.redapp.sdk360.data;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "eventType", namespace = "http://redapp.sabre.com/sdk360", propOrder = { "name",
		"type","id", "url", "locale" })
public class EventType {
	
	@XmlElement(name = "name", required = true)
	String name;

	@XmlElement(name = "type", required = false)
	String type;

	@XmlElement(name = "id", required = false)
	String id;
	
	@XmlElement(name = "url", required = false)
	String url;

	@XmlElement(name = "locale", required = false)
	String locale;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getLocale() {
		return locale;
	}
	public void setLocale(String locale) {
		this.locale = locale;
	}

}

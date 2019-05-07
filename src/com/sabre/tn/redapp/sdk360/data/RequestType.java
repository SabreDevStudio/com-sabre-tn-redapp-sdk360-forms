package com.sabre.tn.redapp.sdk360.data;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

@XmlRootElement(name = "RequestType", namespace = "http://redapp.sabre.com/sdk360")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "RequestType", namespace = "http://redapp.sabre.com/sdk360", propOrder = {"operation", "queryParameters" })
public class RequestType {

	@XmlElement(namespace = "http://redapp.sabre.com/sdk360", required = true)
	String operation = "";


	@XmlElement(namespace = "http://redapp.sabre.com/sdk360", required = true)
	String queryParameters = "";

	public String getQueryParameters() {
		return queryParameters;
	}

	public void setQueryParameters(String queryParameters) {
		this.queryParameters = queryParameters;
	}
	
	
	public String getOperation() {
		return operation;
	}

	public void setOperation(String operation) {
		this.operation = operation;
	}

}

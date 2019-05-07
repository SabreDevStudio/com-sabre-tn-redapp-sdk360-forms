package com.sabre.tn.redapp.sdk360.ticketmaster;

import com.sabre.stl.pos.srw.nextgen.flow.ext.v2.FlowExtPointCommand;

public interface ICustomSvcHandler {
	FlowExtPointCommand execute(FlowExtPointCommand extPointCommand);

	
}

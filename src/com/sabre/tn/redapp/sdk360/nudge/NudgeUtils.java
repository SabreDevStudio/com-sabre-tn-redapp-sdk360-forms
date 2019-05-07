package com.sabre.tn.redapp.sdk360.nudge;

import java.util.Optional;

import com.sabre.stl.pos.srw.nextgen.flow.ext.v2.FlowExtPointCommand;
import com.sabre.stl.pos.srw.nextgen.flow.ext.v2.FlowExtPointDataOperation;
import com.sabre.stl.pos.srw.nextgen.flow.ext.v2.FlowExtPointResponse;
import com.sabre.stl.pos.srw.nextgen.flow.ext.v2.FlowExtPointResponseWrapper;

public class NudgeUtils {

    public static <T> Optional <T> fetchRequest(FlowExtPointCommand extPointCommand, Class <T> type)
    {
        return extPointCommand.getRequests().stream().map(wrapper -> wrapper.getRequest())
            .filter(type::isInstance).map(type::cast).findFirst();
    }
    
    public static FlowExtPointResponseWrapper wrapResponse(Object response)
    {
        FlowExtPointResponseWrapper wrapper = new FlowExtPointResponseWrapper();
        wrapper.setResponse(new FlowExtPointResponse());
        wrapper.getResponse().setStructure(response);
        wrapper.setOperation(FlowExtPointDataOperation.ADD);
        return wrapper;
    }
	
}

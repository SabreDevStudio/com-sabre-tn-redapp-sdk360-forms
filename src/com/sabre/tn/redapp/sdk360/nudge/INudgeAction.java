package com.sabre.tn.redapp.sdk360.nudge;

import com.sabre.stl.pos.srw.nextgen.flow.ext.v2.FlowExtPointCommand;

public interface INudgeAction {
	
	FlowExtPointCommand execute(FlowExtPointCommand extPointCommand);

}

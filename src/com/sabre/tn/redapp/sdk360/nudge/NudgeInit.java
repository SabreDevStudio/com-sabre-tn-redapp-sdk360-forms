package com.sabre.tn.redapp.sdk360.nudge;

import java.util.Optional;

import org.json.simple.JSONObject;

import com.sabre.stl.pos.srw.nextgen.flow.ext.v2.FlowExtPointCommand;
import com.sabre.stl.pos.srw.nextgen.redapp.nudge.v1.RedAppNudgeAction;
import com.sabre.stl.pos.srw.nextgen.redapp.nudge.v1.RedAppNudgeInitEntry;
import com.sabre.stl.pos.srw.nextgen.redapp.nudge.v1.RedAppNudgeInitRQ;
import com.sabre.stl.pos.srw.nextgen.redapp.nudge.v1.RedAppNudgeInitRS;
import com.sabre.stl.pos.srw.nextgen.redapp.nudge.v1.RedAppNudgeItem;
import com.sabre.tn.redapp.sdk360.utils.ConfigParser;

public class NudgeInit implements INudgeInit {

	@Override
	public FlowExtPointCommand execute(FlowExtPointCommand extPointCommand) {
		Optional<RedAppNudgeInitRQ> rq = NudgeUtils.fetchRequest(extPointCommand, RedAppNudgeInitRQ.class);
		
		if(rq.isPresent()){
			for (RedAppNudgeInitEntry item : rq.get().getEntries()) {
				
				String destinationIATA = item.getDestination();
				
				JSONObject jsConf = (JSONObject) ConfigParser.getJSONValue("nudge-conf-".concat(destinationIATA.toLowerCase()));
				
				if(!jsConf.isEmpty()){
					
					
					//configure message to show on the Nudge
					RedAppNudgeItem it = new RedAppNudgeItem();
			
					if(jsConf.containsKey("icon")){
						it.setIcon(jsConf.get("icon").toString());
					}
					
					if(jsConf.containsKey("msg")){
						it.setMessage(jsConf.get("msg").toString());
					}
					
					//configure action for the Nudge
					RedAppNudgeAction ac = new RedAppNudgeAction();
					
					//Create a nudge response object
					RedAppNudgeInitRS rs = new RedAppNudgeInitRS();
					
					//add nudge item to the response
					rs.getItem().add(it);
					
					//pass the nudge back on the command flow
					extPointCommand.getResponses().add(NudgeUtils.wrapResponse(rs));
					
					
					return extPointCommand;
				}
				
			}
		}
		
		return null;
	}

}

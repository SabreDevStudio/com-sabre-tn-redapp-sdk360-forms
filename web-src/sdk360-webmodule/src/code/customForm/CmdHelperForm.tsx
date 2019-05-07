import * as React from 'react';
import {CommandFlow} from "sabre-ngv-app/app/common/data/dto/CommandFlow";
import {cf, getService} from "../Context";
import {NgvPromise} from "sabre-ngv-app/_types";
import {LayerService} from "sabre-ngv-core/services/LayerService";
import {ExternalServiceConnector} from "sabre-ngv-app/app/services/impl/ExternalServiceConnector";
import {RequestTypeAsRequestData} from "./RequestTypeAsRequestData";

export interface myState {
    operationId : string,
    queryFilter : string,
    displayedText : string,
    clicked : boolean,
    backgroundColor : string
}

export class CmdHelperForm extends React.Component<{}, myState> {

    constructor() {
        super();
        this.state = {
            operationId : "search",
            queryFilter: "",
            displayedText : "Look for TicketMaster events according to",
            clicked : false,
            backgroundColor : "white"
        }
    }

    handleClick = () => {

        console.log('Handling click on react component');

        if(this.state.clicked) {
            this.setState({
                backgroundColor : "white"
            })
        } else {
            this.setState({
                backgroundColor : "black"
            })
        }
        this.setState({clicked : !this.state.clicked})
    };

    callAction = () => {
        // let flights : NgvPromise<CommandFlow> = cf('1LGWKRK').send();

       // let extSvc = getService(ExternalServiceConnector);
      //  extSvc.callService('https://app.ticketmaster.com/discovery/v2/events.json?apikey=OnA9MYybaCF4XnIpuS8BXXe9hmeBg0mx', 'GET', '', {  }).done(this.updateModel);
     
        // const state =  select();

        // let rq = new RequestTypeAsRequestData(this.state).getRequestStructure();
        // console.log("i just got here'");
        // console.log(rq);
    let commandFlow = cf('NGV://REDAPP/SERVICE/com.sabre.tn.redapp.sdk360.ticketmaster.ICustomSvcHandler:execute')
        .addRequestDataObject(new RequestTypeAsRequestData(this.state))
        .send();
    // clean and close form after submit
    // yield put({type: 'cancel'});
     
        /*
        flights.done(()=>{
			if(cf.getDataStructs()[0]['d.Screen']['d.Text'].includes('SIGN IN')) {
                getService(LayerService).showInModal(new MessageView({
                    model: { message: `Command failed, not signed in`}
                }), {title : "PNR Status"} , {display: 'areaView'});
            } else {
				console.log("LGW KRK should be displayed")
			}
        })
        */
    };

    cancel = () => {

    };

    updateModel(data: Object){

        let response = JSON.parse(data.toString());
        console.log(response);
    }

    render() {

        const css = {
            backgroundColor : this.state.backgroundColor
        };

        return (
            <div>
                <div style={css} onClick={this.handleClick}>{this.state.displayedText}</div>
                <hr/>
                <div className="form-group">
                    <div className="row">
                        <label>label</label><input type="text" name="txtFilter" />
                    </div>
                </div>
                <div className="action-buttons">
                    <button className="btn btn-outline btn-success" onClick={this.cancel}>Cancel</button>

                    <button className="btn btn-success" onClick={this.callAction}>Submit</button>
                </div>
            </div>
        )
    }

}
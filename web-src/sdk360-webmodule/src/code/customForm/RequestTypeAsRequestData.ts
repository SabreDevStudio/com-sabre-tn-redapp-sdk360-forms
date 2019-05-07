import {RequestType} from './RequestType';
import {RequestData} from 'sabre-ngv-app/app/common/data/dto/request/RequestData';


export class RequestTypeAsRequestData extends RequestData<RequestType> {
    constructor(private payload: any) {
        super();
    }

    getRequestStructure(): RequestType {
        console.log("rapa");
        console.log(this.payload);
        console.log(this.payload.operationId);
        console.log(this.payload['operationId']);
        return {
            'sdk360data.RequestType': [{
                'sdk360data.operation': this.payload['operationId'],
                'sdk360data.queryParameters': "this.payload['queryFilter']"
            }]
        };

    }
}
import {AbstractModel} from 'sabre-ngv-app/app/AbstractModel'
import {EnhancedResponseData} from 'sabre-ngv-app/app/common/data/dto/EnhancedResponseData';
import {DataOptions} from 'sabre-ngv-app/app/common/data/dto/DataOptions';
import {Initial} from 'sabre-ngv-core/decorators/classes/Initial';
import {AbstractModelOptions} from 'sabre-ngv-app/app/AbstractModelOptions';
import {EventType} from './EventType';

@Initial<DataOptions>({
    dataRoot: '[d.Structure][o.ExtensionPoint_Summary][sdk360data.EventsType][0]'
})

@Initial<AbstractModelOptions>({
    autoPropagateData: true,
    nonLazyMembers: [
        'events'
    ]
})

export class EventsType extends EnhancedResponseData {

    getEvents() {
        return this.fromRoot().get<Array<JSON>>('[events]').value().map(function (item: Object) {
            return new EventType(item);
        });
    }
}

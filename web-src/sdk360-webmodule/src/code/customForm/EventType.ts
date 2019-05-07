import {AbstractModel} from 'sabre-ngv-app/app/AbstractModel'
import {Initial} from 'sabre-ngv-core/decorators/classes/Initial';
import {AbstractModelOptions} from 'sabre-ngv-app/app/AbstractModelOptions';
import {DataOptions} from 'sabre-ngv-app/app/common/data/dto/DataOptions';

@Initial<AbstractModelOptions>({
    autoPropagateData: true,
    nonLazyMembers: [
        'id',
        'name',
        'type',
        'url',
        "locale"
    ]
})

export class EventType extends AbstractModel {

    constructor(public result: any) {
        super(result);
    };

    getId(): string {
        return <string>this.get('id');
    }

    getName(): string {
        return <string>this.get('name');
    }

    getType(): string {
        return <string>this.get('type');
    }
 
    getUrl(): string {
        return <string>this.get('url');
    }

    getLocale(): string {
        return <string>this.get('locale');
    }

}

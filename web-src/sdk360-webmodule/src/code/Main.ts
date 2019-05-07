import {Module} from 'sabre-ngv-core/modules/Module';

import {ExtensionPointService} from 'sabre-ngv-xp/services/ExtensionPointService';
import {WidgetXPConfig} from 'sabre-ngv-xp/configs/WidgetXPConfig';
import {DtoService} from "sabre-ngv-app/app/services/impl/DtoService";
import {getService} from './Context';
import CmdHelperButton from './customForm/CmdHelperButton';


import {DrawerService} from "sabre-ngv-app/app/services/impl/DrawerService";
import {EventsType as EventsTypeModel} from './customForm/EventsType';
import {SearchResultsView} from './customForm/SearchResultsView';


export class Main extends Module {
    init(): void {
        super.init();
        // initialize your module here
        this.setup();
    }

    private setup(){
        const xp = getService(ExtensionPointService);
        xp.addConfig('novice-buttons', new WidgetXPConfig(CmdHelperButton, -1000));

        const dto = getService(DtoService);       

        dto.registerDataModel('[.Structure][.ExtensionPoint_Summary][sdk360data.EventsType][0]', EventsTypeModel);
        dto.registerDataView(EventsTypeModel, SearchResultsView); 

        const drawer = getService(DrawerService);
        drawer.addConfig('search-result', {
            details: [
                {
                    caption: ('Event Information'),
                    print: '{{#with drawer-context-model}}' +
                    '<span class="drawer-detail-caption">' + ('ID') + ': </span>' +
                    '<span class="drawer-detail-value">' + '{{id}}' + '</span>' +
                    '{{/with}}'
                },
                {
                    print: '{{#with drawer-context-model}}' +
                    '<span class="drawer-detail-caption">' + ('NAME') + ': </span>' +
                    '<span class="drawer-detail-value">' + '{{name}}' + '</span>' +
                    '{{/with}}'
                }
            ]
        });        
    }
}

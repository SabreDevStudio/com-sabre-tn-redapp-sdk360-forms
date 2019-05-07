import {EventsType} from './EventsType';
import {Drawer} from "sabre-ngv-app/app/widgets/drawer/views/Drawer";
import {Initial} from 'sabre-ngv-core/decorators/classes/Initial';
import {DrawerOptions} from "sabre-ngv-app/app/widgets/drawer/views/DrawerOptions";
import {AbstractViewOptions} from "sabre-ngv-app/app/AbstractViewOptions";
import {EventType} from './EventType';

@Initial<DrawerOptions>({
    drawerGroups: ['search-result']
})
export class SearchResultsDrawer extends Drawer<EventType> {
    initialize(options?: AbstractViewOptions): void {
        super.initialize(options);
    }
}
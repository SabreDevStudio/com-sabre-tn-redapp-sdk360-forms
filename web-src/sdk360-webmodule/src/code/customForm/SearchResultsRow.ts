import {AbstractView} from "sabre-ngv-app/app/AbstractView";
import {AbstractModel} from "sabre-ngv-app/app/AbstractModel";
import {SearchResultsDrawer} from './SearchResultsDrawer';
import {Template} from 'sabre-ngv-core/decorators/classes/view/Template';
import {CssClass} from 'sabre-ngv-core/decorators/classes/view/CssClass';
import {WithDrawer} from "sabre-ngv-app/app/widgets/drawer/mixins/WithDrawer";
import {WithDrawerOptions} from "sabre-ngv-app/app/widgets/drawer/mixins/WithDrawerOptions"
import {Initial} from 'sabre-ngv-core/decorators/classes/Initial';
import {Mixin} from 'sabre-ngv-core/decorators/classes/Mixin';
import {EventType} from './EventType';
import {AbstractViewOptions} from "sabre-ngv-app/app/AbstractViewOptions";
import {ViewDescriptor} from "sabre-ngv-app/_types";

@Mixin(WithDrawer)
@Initial<WithDrawerOptions>({
    drawerDescriptor: SearchResultsDrawer
})

@Template('sdk360-webmodule:SearchResultsNoviceRow')
@CssClass('flight-row flight-novice-row')
export class SearchResultsRow extends AbstractView<EventType> implements WithDrawer<SearchResultsDrawer> {
    drawerDescriptor: ViewDescriptor<SearchResultsDrawer>;
    openDrawer: () => void;
    closeDrawer: () => void;
    toggleDrawer: () => void;
    getDrawer: () => SearchResultsDrawer;
}
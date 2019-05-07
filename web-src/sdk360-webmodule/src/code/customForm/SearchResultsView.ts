import {EventsType} from './EventsType';
import {ListView} from "sabre-ngv-app/app/widgets/container/ListView";
import {SearchResultsRow} from './SearchResultsRow';
import {Initial} from 'sabre-ngv-core/decorators/classes/Initial';
import {ListViewOptions} from "sabre-ngv-app/app/widgets/container/ListViewOptions";
import {Mixin} from 'sabre-ngv-core/decorators/classes/Mixin';
import {WithHighlightableChildren} from "sabre-ngv-app/app/common/mixins/WithHighlightableChildren";
import {Template} from 'sabre-ngv-core/decorators/classes/view/Template';
import {CssClass} from 'sabre-ngv-core/decorators/classes/view/CssClass';

@Mixin(WithHighlightableChildren)
@CssClass('novice-output-mode-widget')
@Template('sdk360-webmodule:SearchResultsNovice')
@Initial<ListViewOptions>({
    itemsProperty: 'model.events',
    itemDescriptor: SearchResultsRow
})

export class SearchResultsView extends ListView<EventsType, SearchResultsRow> {

    constructor(options?: any) {
        super(options);
    }
}

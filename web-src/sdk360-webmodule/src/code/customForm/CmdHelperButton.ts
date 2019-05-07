import {CssClass} from 'sabre-ngv-core/decorators/classes/view/CssClass';
import {Initial} from 'sabre-ngv-core/decorators/classes/Initial';

import AbstractBootstrapPopoverButton from 'sabre-ngv-UIComponents/commandHelperButton/components/AbstractBootstrapPopoverButton';
import StatelessComponent from "sabre-ngv-UIComponents/baseComponent/components/StatelessComponent";
import {ChildComponentContent} from 'sabre-ngv-UIComponents/commandHelperButton/interfaces/ChildComponentContent';
import {CmdHelperForm} from "./CmdHelperForm";


@CssClass('btn btn-default')
@Initial<any>({
    caption: '<i class="fa fa-edit"></i> <span class="hidden-xs dn-x-hidden-0-8">Events And Tickets</span>',
    type: 'default'
})
export default class CmdHelperButton extends AbstractBootstrapPopoverButton {

    private content = new StatelessComponent(
        {
            componentName: 'CmdHelperButton',
            rootReactComponent: CmdHelperForm
        }
    );


    protected getContent(): ChildComponentContent {
        return (this.content as ChildComponentContent);
    }

    /**
     * Initialize Button
     */
    initialize(options: any): void {
        super.initialize(options);

        this.registerContentEvents();
    }

    /**
     * An example event handler to demonstrate proper side effect handling in React layer.
     *
     * We implement here child(React) => parent(app) communication pattern
     * with Redux-Saga middleware triggering an event on parent's event bus
     * when given Redux Action gets dispatched.
     */
    private registerContentEvents() {
        this.eventBus.on('close-form', this.handleCloseEvent.bind(this));
    }

    private handleCloseEvent(): void {
        this.content.unmount();
        this.togglePopover();
        this.content.dispose();
    }
}

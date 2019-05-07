var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
///<amd-module name="sdk360-webmodule/Context" />
/// <ngv scope="public" />
define("sdk360-webmodule/Context", ["require", "exports", "sabre-ngv-core/modules/ModuleContext"], function (require, exports, ModuleContext_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // Cannot use IModuleContext['something'] for types - it seems to break generics
    // types are copied from IModuleContext
    /** @internal **/
    exports.context = new ModuleContext_1.ModuleContext();
    /** @internal **/
    exports.cf = exports.context.cf.bind(exports.context);
    /** @internal **/
    exports.registerService = exports.context.registerService.bind(exports.context);
    /** @internal **/
    exports.getService = exports.context.getService.bind(exports.context);
});
define("sdk360-webmodule/customForm/RequestType", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("sdk360-webmodule/customForm/RequestTypeAsRequestData", ["require", "exports", "sabre-ngv-app/app/common/data/dto/request/RequestData"], function (require, exports, RequestData_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RequestTypeAsRequestData = (function (_super) {
        __extends(RequestTypeAsRequestData, _super);
        function RequestTypeAsRequestData(payload) {
            var _this = _super.call(this) || this;
            _this.payload = payload;
            return _this;
        }
        RequestTypeAsRequestData.prototype.getRequestStructure = function () {
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
        };
        return RequestTypeAsRequestData;
    }(RequestData_1.RequestData));
    exports.RequestTypeAsRequestData = RequestTypeAsRequestData;
});
define("sdk360-webmodule/customForm/CmdHelperForm", ["require", "exports", "react", "sdk360-webmodule/Context", "sdk360-webmodule/customForm/RequestTypeAsRequestData"], function (require, exports, React, Context_1, RequestTypeAsRequestData_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CmdHelperForm = (function (_super) {
        __extends(CmdHelperForm, _super);
        function CmdHelperForm() {
            var _this = _super.call(this) || this;
            _this.handleClick = function () {
                console.log('Handling click on react component');
                if (_this.state.clicked) {
                    _this.setState({
                        backgroundColor: "white"
                    });
                }
                else {
                    _this.setState({
                        backgroundColor: "black"
                    });
                }
                _this.setState({ clicked: !_this.state.clicked });
            };
            _this.callAction = function () {
                // let flights : NgvPromise<CommandFlow> = cf('1LGWKRK').send();
                // let extSvc = getService(ExternalServiceConnector);
                //  extSvc.callService('https://app.ticketmaster.com/discovery/v2/events.json?apikey=OnA9MYybaCF4XnIpuS8BXXe9hmeBg0mx', 'GET', '', {  }).done(this.updateModel);
                // const state =  select();
                // let rq = new RequestTypeAsRequestData(this.state).getRequestStructure();
                // console.log("i just got here'");
                // console.log(rq);
                var commandFlow = Context_1.cf('NGV://REDAPP/SERVICE/com.sabre.tn.redapp.sdk360.ticketmaster.ICustomSvcHandler:execute')
                    .addRequestDataObject(new RequestTypeAsRequestData_1.RequestTypeAsRequestData(_this.state))
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
            _this.cancel = function () {
            };
            _this.state = {
                operationId: "search",
                queryFilter: "",
                displayedText: "Look for TicketMaster events according to",
                clicked: false,
                backgroundColor: "white"
            };
            return _this;
        }
        CmdHelperForm.prototype.updateModel = function (data) {
            var response = JSON.parse(data.toString());
            console.log(response);
        };
        CmdHelperForm.prototype.render = function () {
            var css = {
                backgroundColor: this.state.backgroundColor
            };
            return (React.createElement("div", null,
                React.createElement("div", { style: css, onClick: this.handleClick }, this.state.displayedText),
                React.createElement("hr", null),
                React.createElement("div", { className: "form-group" },
                    React.createElement("div", { className: "row" },
                        React.createElement("label", null, "label"),
                        React.createElement("input", { type: "text", name: "txtFilter" }))),
                React.createElement("div", { className: "action-buttons" },
                    React.createElement("button", { className: "btn btn-outline btn-success", onClick: this.cancel }, "Cancel"),
                    React.createElement("button", { className: "btn btn-success", onClick: this.callAction }, "Submit"))));
        };
        return CmdHelperForm;
    }(React.Component));
    exports.CmdHelperForm = CmdHelperForm;
});
define("sdk360-webmodule/customForm/CmdHelperButton", ["require", "exports", "sabre-ngv-core/decorators/classes/view/CssClass", "sabre-ngv-core/decorators/classes/Initial", "sabre-ngv-UIComponents/commandHelperButton/components/AbstractBootstrapPopoverButton", "sabre-ngv-UIComponents/baseComponent/components/StatelessComponent", "sdk360-webmodule/customForm/CmdHelperForm"], function (require, exports, CssClass_1, Initial_1, AbstractBootstrapPopoverButton_1, StatelessComponent_1, CmdHelperForm_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CmdHelperButton = (function (_super) {
        __extends(CmdHelperButton, _super);
        function CmdHelperButton() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.content = new StatelessComponent_1.default({
                componentName: 'CmdHelperButton',
                rootReactComponent: CmdHelperForm_1.CmdHelperForm
            });
            return _this;
        }
        CmdHelperButton.prototype.getContent = function () {
            return this.content;
        };
        /**
         * Initialize Button
         */
        CmdHelperButton.prototype.initialize = function (options) {
            _super.prototype.initialize.call(this, options);
            this.registerContentEvents();
        };
        /**
         * An example event handler to demonstrate proper side effect handling in React layer.
         *
         * We implement here child(React) => parent(app) communication pattern
         * with Redux-Saga middleware triggering an event on parent's event bus
         * when given Redux Action gets dispatched.
         */
        CmdHelperButton.prototype.registerContentEvents = function () {
            this.eventBus.on('close-form', this.handleCloseEvent.bind(this));
        };
        CmdHelperButton.prototype.handleCloseEvent = function () {
            this.content.unmount();
            this.togglePopover();
            this.content.dispose();
        };
        return CmdHelperButton;
    }(AbstractBootstrapPopoverButton_1.default));
    CmdHelperButton = __decorate([
        CssClass_1.CssClass('btn btn-default'),
        Initial_1.Initial({
            caption: '<i class="fa fa-edit"></i> <span class="hidden-xs dn-x-hidden-0-8">Events And Tickets</span>',
            type: 'default'
        })
    ], CmdHelperButton);
    exports.default = CmdHelperButton;
});
define("sdk360-webmodule/customForm/EventType", ["require", "exports", "sabre-ngv-app/app/AbstractModel", "sabre-ngv-core/decorators/classes/Initial"], function (require, exports, AbstractModel_1, Initial_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventType = (function (_super) {
        __extends(EventType, _super);
        function EventType(result) {
            var _this = _super.call(this, result) || this;
            _this.result = result;
            return _this;
        }
        ;
        EventType.prototype.getId = function () {
            return this.get('id');
        };
        EventType.prototype.getName = function () {
            return this.get('name');
        };
        EventType.prototype.getType = function () {
            return this.get('type');
        };
        EventType.prototype.getUrl = function () {
            return this.get('url');
        };
        EventType.prototype.getLocale = function () {
            return this.get('locale');
        };
        return EventType;
    }(AbstractModel_1.AbstractModel));
    EventType = __decorate([
        Initial_2.Initial({
            autoPropagateData: true,
            nonLazyMembers: [
                'id',
                'name',
                'type',
                'url',
                "locale"
            ]
        }),
        __metadata("design:paramtypes", [Object])
    ], EventType);
    exports.EventType = EventType;
});
define("sdk360-webmodule/customForm/EventsType", ["require", "exports", "sabre-ngv-app/app/common/data/dto/EnhancedResponseData", "sabre-ngv-core/decorators/classes/Initial", "sdk360-webmodule/customForm/EventType"], function (require, exports, EnhancedResponseData_1, Initial_3, EventType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventsType = (function (_super) {
        __extends(EventsType, _super);
        function EventsType() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EventsType.prototype.getEvents = function () {
            return this.fromRoot().get('[events]').value().map(function (item) {
                return new EventType_1.EventType(item);
            });
        };
        return EventsType;
    }(EnhancedResponseData_1.EnhancedResponseData));
    EventsType = __decorate([
        Initial_3.Initial({
            dataRoot: '[d.Structure][o.ExtensionPoint_Summary][sdk360data.EventsType][0]'
        }),
        Initial_3.Initial({
            autoPropagateData: true,
            nonLazyMembers: [
                'events'
            ]
        })
    ], EventsType);
    exports.EventsType = EventsType;
});
define("sdk360-webmodule/customForm/SearchResultsDrawer", ["require", "exports", "sabre-ngv-app/app/widgets/drawer/views/Drawer", "sabre-ngv-core/decorators/classes/Initial"], function (require, exports, Drawer_1, Initial_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SearchResultsDrawer = (function (_super) {
        __extends(SearchResultsDrawer, _super);
        function SearchResultsDrawer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SearchResultsDrawer.prototype.initialize = function (options) {
            _super.prototype.initialize.call(this, options);
        };
        return SearchResultsDrawer;
    }(Drawer_1.Drawer));
    SearchResultsDrawer = __decorate([
        Initial_4.Initial({
            drawerGroups: ['search-result']
        })
    ], SearchResultsDrawer);
    exports.SearchResultsDrawer = SearchResultsDrawer;
});
define("sdk360-webmodule/customForm/SearchResultsRow", ["require", "exports", "sabre-ngv-app/app/AbstractView", "sdk360-webmodule/customForm/SearchResultsDrawer", "sabre-ngv-core/decorators/classes/view/Template", "sabre-ngv-core/decorators/classes/view/CssClass", "sabre-ngv-app/app/widgets/drawer/mixins/WithDrawer", "sabre-ngv-core/decorators/classes/Initial", "sabre-ngv-core/decorators/classes/Mixin"], function (require, exports, AbstractView_1, SearchResultsDrawer_1, Template_1, CssClass_2, WithDrawer_1, Initial_5, Mixin_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SearchResultsRow = (function (_super) {
        __extends(SearchResultsRow, _super);
        function SearchResultsRow() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SearchResultsRow;
    }(AbstractView_1.AbstractView));
    SearchResultsRow = __decorate([
        Mixin_1.Mixin(WithDrawer_1.WithDrawer),
        Initial_5.Initial({
            drawerDescriptor: SearchResultsDrawer_1.SearchResultsDrawer
        }),
        Template_1.Template('sdk360-webmodule:SearchResultsNoviceRow'),
        CssClass_2.CssClass('flight-row flight-novice-row')
    ], SearchResultsRow);
    exports.SearchResultsRow = SearchResultsRow;
});
define("sdk360-webmodule/customForm/SearchResultsView", ["require", "exports", "sabre-ngv-app/app/widgets/container/ListView", "sdk360-webmodule/customForm/SearchResultsRow", "sabre-ngv-core/decorators/classes/Initial", "sabre-ngv-core/decorators/classes/Mixin", "sabre-ngv-app/app/common/mixins/WithHighlightableChildren", "sabre-ngv-core/decorators/classes/view/Template", "sabre-ngv-core/decorators/classes/view/CssClass"], function (require, exports, ListView_1, SearchResultsRow_1, Initial_6, Mixin_2, WithHighlightableChildren_1, Template_2, CssClass_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SearchResultsView = (function (_super) {
        __extends(SearchResultsView, _super);
        function SearchResultsView(options) {
            return _super.call(this, options) || this;
        }
        return SearchResultsView;
    }(ListView_1.ListView));
    SearchResultsView = __decorate([
        Mixin_2.Mixin(WithHighlightableChildren_1.WithHighlightableChildren),
        CssClass_3.CssClass('novice-output-mode-widget'),
        Template_2.Template('sdk360-webmodule:SearchResultsNovice'),
        Initial_6.Initial({
            itemsProperty: 'model.events',
            itemDescriptor: SearchResultsRow_1.SearchResultsRow
        }),
        __metadata("design:paramtypes", [Object])
    ], SearchResultsView);
    exports.SearchResultsView = SearchResultsView;
});
define("sdk360-webmodule/Main", ["require", "exports", "sabre-ngv-core/modules/Module", "sabre-ngv-xp/services/ExtensionPointService", "sabre-ngv-xp/configs/WidgetXPConfig", "sabre-ngv-app/app/services/impl/DtoService", "sdk360-webmodule/Context", "sdk360-webmodule/customForm/CmdHelperButton", "sabre-ngv-app/app/services/impl/DrawerService", "sdk360-webmodule/customForm/EventsType", "sdk360-webmodule/customForm/SearchResultsView"], function (require, exports, Module_1, ExtensionPointService_1, WidgetXPConfig_1, DtoService_1, Context_2, CmdHelperButton_1, DrawerService_1, EventsType_1, SearchResultsView_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Main = (function (_super) {
        __extends(Main, _super);
        function Main() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Main.prototype.init = function () {
            _super.prototype.init.call(this);
            // initialize your module here
            this.setup();
        };
        Main.prototype.setup = function () {
            var xp = Context_2.getService(ExtensionPointService_1.ExtensionPointService);
            xp.addConfig('novice-buttons', new WidgetXPConfig_1.WidgetXPConfig(CmdHelperButton_1.default, -1000));
            var dto = Context_2.getService(DtoService_1.DtoService);
            dto.registerDataModel('[.Structure][.ExtensionPoint_Summary][sdk360data.EventsType][0]', EventsType_1.EventsType);
            dto.registerDataView(EventsType_1.EventsType, SearchResultsView_1.SearchResultsView);
            var drawer = Context_2.getService(DrawerService_1.DrawerService);
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
        };
        return Main;
    }(Module_1.Module));
    exports.Main = Main;
});
///<amd-module name="sdk360-webmodule" />
define("sdk360-webmodule", ["require", "exports", "sdk360-webmodule/Main", "sdk360-webmodule/Context"], function (require, exports, Main_1, Context_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Module_sdk360_webmodule = (function (_super) {
        __extends(Module_sdk360_webmodule, _super);
        function Module_sdk360_webmodule(manifest) {
            var _this = _super.call(this, manifest) || this;
            Context_3.context.setModule(_this);
            return _this;
        }
        return Module_sdk360_webmodule;
    }(Main_1.Main));
    exports.default = Module_sdk360_webmodule;
});

//# sourceMappingURL=module.js.map

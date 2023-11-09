"use strict";
// Copyright (c) 2020, QuantStack, Mariana Meireles and ipycytoscape Contributors
//
// Distributed under the terms of the Modified BSD License.
//
// The full license is in the file LICENSE, distributed with this software.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CytoscapeView = exports.CytoscapeModel = void 0;
var base_1 = require("@jupyter-widgets/base");
// eslint-disable-next-line @typescript-eslint/no-var-requires
var widgets = require('@jupyter-widgets/base');
var version_1 = require("./version");
// Import the CSS
require("../css/widget.css");
var cytoscape_1 = require("cytoscape");
// @ts-ignore
var cytoscape_cola_1 = require("cytoscape-cola");
// @ts-ignore
var cytoscape_popper_1 = require("cytoscape-popper");
// @ts-ignore
var tippy_js_1 = require("tippy.js");
// @ts-ignore
var cytoscape_dagre_1 = require("cytoscape-dagre");
// @ts-ignore
var cytoscape_klay_1 = require("cytoscape-klay");
require("tippy.js/themes/material.css");
cytoscape_1.default.use(cytoscape_popper_1.default);
cytoscape_1.default.use(cytoscape_dagre_1.default);
cytoscape_1.default.use(cytoscape_klay_1.default);
cytoscape_1.default.use(cytoscape_cola_1.default);
var CytoscapeModel = /** @class */ (function (_super) {
    __extends(CytoscapeModel, _super);
    function CytoscapeModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CytoscapeModel.prototype.defaults = function () {
        return __assign(__assign({}, _super.prototype.defaults.call(this)), { _model_name: CytoscapeModel.model_name, _model_module: CytoscapeModel.model_module, _model_module_version: CytoscapeModel.model_module_version, _view_name: CytoscapeModel.view_name, _view_module: CytoscapeModel.view_module, _view_module_version: CytoscapeModel.view_module_version, auto_unselectify: true, box_selection_enabled: false, cytoscape_layout: {}, cytoscape_style: [], elements: [], zoom: 0, rendered_position: {}, tooltip_source: '', graph: null });
    };
    CytoscapeModel.prototype.initialize = function (attributes, options) {
        _super.prototype.initialize.call(this, attributes, options);
        this.on('msg:custom', this.processMessage.bind(this));
    };
    CytoscapeModel.prototype.processMessage = function (command, buffers) {
        var _this = this;
        if (command.name === 'layout') {
            this.forEachView(function (view) {
                view.cytoscape_obj.layout(_this.get('cytoscape_layout')).run();
            });
        }
    };
    CytoscapeModel.prototype.forEachView = function (callback) {
        for (var view_id in this.views) {
            this.views[view_id].then(function (view) {
                callback(view);
            });
        }
    };
    CytoscapeModel.serializers = __assign({ graph: { deserialize: widgets.unpack_models } }, base_1.DOMWidgetModel.serializers);
    CytoscapeModel.model_name = 'CytoscapeModel';
    CytoscapeModel.model_module = version_1.MODULE_NAME;
    CytoscapeModel.model_module_version = version_1.MODULE_VERSION;
    CytoscapeModel.view_name = 'CytoscapeView';
    CytoscapeModel.view_module = version_1.MODULE_NAME;
    CytoscapeModel.view_module_version = version_1.MODULE_VERSION;
    return CytoscapeModel;
}(base_1.DOMWidgetModel));
exports.CytoscapeModel = CytoscapeModel;
var CytoscapeView = /** @class */ (function (_super) {
    __extends(CytoscapeView, _super);
    function CytoscapeView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.is_rendered = false;
        _this.nodeViews = [];
        _this.edgeViews = [];
        _this.monitored = {};
        return _this;
    }
    CytoscapeView.prototype.render = function () {
        var _this = this;
        this.el.classList.add('custom-widget');
        this.displayed.then(function () {
            _this.init_render();
            _this.cytoscape_obj.startBatch();
            _this.nodeViews = new widgets.ViewList(_this.addNodeModel, _this.removeNodeView, _this);
            _this.nodeViews.update(_this.model.get('graph').get('nodes'));
            _this.edgeViews = new widgets.ViewList(_this.addEdgeModel, _this.removeEdgeView, _this);
            _this.edgeViews.update(_this.model.get('graph').get('edges'));
            _this.cytoscape_obj.endBatch();
            _this.cytoscape_obj
                .elements()
                .layout(_this.model.get('cytoscape_layout'))
                .run();
        });
        this.model
            .get('graph')
            .on_some_change(['nodes', 'edges'], this._updateViewLists, this);
        //Python attributes that must be sync. with frontend
        this.model.on('change:min_zoom', this._updateMinZoom, this);
        this.model.on('change:max_zoom', this._updateMaxZoom, this);
        this.model.on('change:zooming_enabled', this._updateZoomingEnabled, this);
        this.model.on('change:user_zooming_enabled', this._updateUserZoomingEnabled, this);
        this.model.on('change:panning_enabled', this._updatePanningEnabled, this);
        this.model.on('change:user_panning_enabled', this._updateUserPanningEnabled, this);
        this.model.on('change:box_selection_enabled', this._updateBoxSelectionEnabled, this);
        this.model.on('change:selection_type', this._updateSelectionType, this);
        this.model.on('change:touch_tap_threshold', this.value_changed, this);
        this.model.on('change:desktop_tap_threshold', this.value_changed, this);
        this.model.on('change:autolock', this._updateAutolock, this);
        this.model.on('change:auto_ungrabify', this._updateAutoUngrabify, this);
        this.model.on('change:auto_unselectify', this._updateAutoUnselectify, this);
        this.model.on('change:cytoscape_layout', this._updateLayout, this);
        this.model.on('change:cytoscape_style', this._updateStyle, this);
        this.model.on('change:elements', this.value_changed, this);
        this.model.on('change:pixel_ratio', this.value_changed, this);
        this.model.on('change:_interaction_handlers', this.listenForUserEvents, this);
        var layout = this.model.get('layout');
        if (layout !== null) {
            layout.on_some_change(['width', 'height'], this._resize, this);
        }
    };
    CytoscapeView.prototype.value_changed = function () {
        if (this.is_rendered) {
            // Rerendering creates a new cytoscape object, so we will need to re-add
            // interaction handlers. Set `monitored` to empty to trigger this.
            this.monitored = {};
            this.init_render();
        }
    };
    CytoscapeView.prototype._updateViewLists = function () {
        this.nodeViews.update(this.model.get('graph').get('nodes'));
        this.edgeViews.update(this.model.get('graph').get('edges'));
        this.cytoscape_obj
            .elements()
            .layout(this.model.get('cytoscape_layout'))
            .run();
        console.log('whole cytoscape relayout');
    };
    CytoscapeView.prototype.listenForUserEvents = function () {
        var _this = this;
        var new_monitored = this.model.get('_interaction_handlers');
        // If the plot hasn't been displayed yet, we can't add handlers yet. By
        // returning immediately, we avoid marking them as set, so we'll end up
        // setting them when the graph is finally displayed.
        if (!this.cytoscape_obj) {
            return;
        }
        var _loop_1 = function (widgtype) {
            if (Object.prototype.hasOwnProperty.call(new_monitored, widgtype)) {
                var _loop_2 = function (i) {
                    var evnttype = new_monitored[widgtype][i];
                    if (this_1.monitored[widgtype]) {
                        if (this_1.monitored[widgtype].includes(evnttype)) {
                            return { value: void 0 };
                        }
                        else {
                            this_1.monitored[widgtype].push(evnttype);
                        }
                    }
                    else {
                        this_1.monitored[widgtype] = [evnttype];
                    }
                    this_1.cytoscape_obj.on(evnttype, widgtype, function (e) {
                        _this.send({
                            event: evnttype,
                            widget: widgtype,
                            data: e.target.json(),
                        });
                    });
                };
                for (var i = 0; i < new_monitored[widgtype].length; i++) {
                    var state_2 = _loop_2(i);
                    if (typeof state_2 === "object")
                        return state_2;
                }
            }
        };
        var this_1 = this;
        for (var widgtype in new_monitored) {
            var state_1 = _loop_1(widgtype);
            if (typeof state_1 === "object")
                return state_1.value;
        }
    };
    CytoscapeView.prototype.init_render = function () {
        var _this = this;
        if (this.model.get('graph') !== null) {
            this.is_rendered = true;
            this.cytoscape_obj = (0, cytoscape_1.default)({
                container: this.el,
                minZoom: this.model.get('min_zoom'),
                maxZoom: this.model.get('max_zoom'),
                zoomingEnabled: this.model.get('zooming_enabled'),
                userZoomingEnabled: this.model.get('user_zooming_enabled'),
                panningEnabled: this.model.get('panning_enabled'),
                boxSelectionEnabled: this.model.get('box_selection_enabled'),
                selectionType: this.model.get('selection_type'),
                touchTapThreshold: this.model.get('touch_tap_threshold'),
                desktopTapThreshold: this.model.get('desktop_tap_threshold'),
                autolock: this.model.get('autolock'),
                autoungrabify: this.model.get('auto_ungrabify'),
                autounselectify: this.model.get('auto_unselectify'),
                headless: this.model.get('headless'),
                styleEnabled: this.model.get('style_enabled'),
                hideEdgesOnViewport: this.model.get('hide_edges_on_viewport'),
                textureOnViewport: this.model.get('texture_on_viewport'),
                motionBlur: this.model.get('motion_blur'),
                motionBlurOpacity: this.model.get('motion_blur_opacity'),
                wheelSensitivity: this.model.get('wheel_sensitivity'),
                pixelRatio: this.model.get('pixel_ratio'),
                style: this.model.get('cytoscape_style'),
                elements: [],
            });
            // we need to set listeners at initial render in case interaction was
            // added before the graph was displayed.
            // const monitored = this.model.get('monitored');
            this.listenForUserEvents();
            this.cytoscape_obj.on('click', function (e) {
                var node = e.target;
                var ref = node.popperRef();
                var dummyDomEle = document.createElement('div');
                var tooltip_source = _this.model.get('tooltip_source');
                if (node.data()[tooltip_source]) {
                    var tip = (0, tippy_js_1.default)(dummyDomEle, {
                        //TODO: add a pretty tippy
                        trigger: 'manual',
                        lazy: false,
                        arrow: true,
                        theme: 'material',
                        placement: 'bottom',
                        content: function () {
                            var content = document.createElement('div');
                            content.innerHTML = node
                                .data()[tooltip_source].replace(/(?:\r\n|\r|\n)/g, '<br>');
                            return content;
                        },
                        onCreate: function (instance) {
                            if (instance && instance.popperInstance) {
                                instance.popperInstance.reference = ref;
                            }
                        },
                    });
                    tip.show();
                }
            });
        }
    };
    CytoscapeView.prototype._updateMinZoom = function () {
        this.cytoscape_obj.minZoom(this.model.get('min_zoom'));
    };
    CytoscapeView.prototype._updateMaxZoom = function () {
        this.cytoscape_obj.maxZoom(this.model.get('max_zoom'));
    };
    CytoscapeView.prototype._updateZoomingEnabled = function () {
        this.cytoscape_obj.zoomingEnabled(this.model.get('zooming_enabled'));
    };
    CytoscapeView.prototype._updateUserZoomingEnabled = function () {
        this.cytoscape_obj.userZoomingEnabled(this.model.get('user_zooming_enabled'));
    };
    CytoscapeView.prototype._updatePanningEnabled = function () {
        this.cytoscape_obj.panningEnabled(this.model.get('panning_enabled'));
    };
    CytoscapeView.prototype._updateUserPanningEnabled = function () {
        this.cytoscape_obj.userPanningEnabled(this.model.get('user_panning_enabled'));
    };
    CytoscapeView.prototype._updateBoxSelectionEnabled = function () {
        this.cytoscape_obj.boxSelectionEnabled(this.model.get('box_selection_enabled'));
    };
    CytoscapeView.prototype._updateSelectionType = function () {
        // I think that @types may have gotten this wrong?
        this.cytoscape_obj.selectionType(this.model.get('selection_type'));
    };
    CytoscapeView.prototype._updateAutolock = function () {
        this.cytoscape_obj.autolock(this.model.get('autolock'));
    };
    CytoscapeView.prototype._updateAutoUngrabify = function () {
        this.cytoscape_obj.autoungrabify(this.model.get('auto_ungrabify'));
    };
    CytoscapeView.prototype._updateAutoUnselectify = function () {
        this.cytoscape_obj.autounselectify(this.model.get('auto_unselectify'));
    };
    CytoscapeView.prototype._updateLayout = function () {
        this.cytoscape_obj.layout(this.model.get('cytoscape_layout')).run();
    };
    CytoscapeView.prototype._updateStyle = function () {
        this.cytoscape_obj.style(this.model.get('cytoscape_style'));
    };
    CytoscapeView.prototype._resize = function () {
        if (this.cytoscape_obj) {
            this.cytoscape_obj.resize();
            this.cytoscape_obj.fit();
        }
    };
    /**
     * Add the listeners for traits that are common to nodes and edges
     */
    CytoscapeView.prototype._addElementListeners = function (ele, view) {
        ele.on('select', function (event) {
            view.model.set('selected', true);
            view.model.save_changes();
        });
        ele.on('unselect', function (event) {
            view.model.set('selected', false);
            view.model.save_changes();
        });
        ele.on('remove', function (event) {
            view.model.set('removed', true);
            view.model.save_changes();
        });
    };
    CytoscapeView.prototype.addNodeModel = function (NodeModel) {
        return __awaiter(this, void 0, void 0, function () {
            var node, child;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        node = this.cytoscape_obj.add(NodeModel.asCyObj());
                        return [4 /*yield*/, this.create_child_view(NodeModel, {
                                cytoscapeView: this,
                            })];
                    case 1:
                        child = _a.sent();
                        this._addElementListeners(node, child);
                        node.on('grab', function (event) {
                            child.model.set('grabbed', true);
                            child.model.save_changes();
                        });
                        node.on('free', function (event) {
                            child.model.set('grabbed', false);
                            child.model.save_changes();
                        });
                        return [2 /*return*/, child];
                }
            });
        });
    };
    CytoscapeView.prototype.removeNodeView = function (nodeView) {
        nodeView.model.set('removed', true);
        nodeView.remove();
    };
    CytoscapeView.prototype.addEdgeModel = function (EdgeModel) {
        return __awaiter(this, void 0, void 0, function () {
            var edge, child;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        edge = this.cytoscape_obj.add(EdgeModel.asCyObj());
                        return [4 /*yield*/, this.create_child_view(EdgeModel, {
                                cytoscapeView: this,
                            })];
                    case 1:
                        child = _a.sent();
                        this._addElementListeners(edge, child);
                        return [2 /*return*/, child];
                }
            });
        });
    };
    CytoscapeView.prototype.removeEdgeView = function (edgeView) {
        edgeView.model.set('removed', true);
        edgeView.remove();
    };
    return CytoscapeView;
}(base_1.DOMWidgetView));
exports.CytoscapeView = CytoscapeView;

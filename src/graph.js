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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EdgeView = exports.NodeView = exports.ElementView = exports.GraphModel = exports.EdgeModel = exports.NodeModel = exports.ElementModel = void 0;
var base_1 = require("@jupyter-widgets/base");
// eslint-disable-next-line @typescript-eslint/no-var-requires
var widgets = require('@jupyter-widgets/base');
var version_1 = require("./version");
var ElementModel = /** @class */ (function (_super) {
    __extends(ElementModel, _super);
    function ElementModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ElementModel.prototype.defaults = function () {
        return __assign(__assign({}, _super.prototype.defaults.call(this)), { removed: false, selected: false, selectable: true, classes: '', data: {} });
    };
    ElementModel.prototype.asCyObj = function () {
        return {
            data: this.get('data'),
            selectable: this.get('selectable'),
            classes: this.get('classes'),
        };
    };
    return ElementModel;
}(base_1.WidgetModel));
exports.ElementModel = ElementModel;
var NodeModel = /** @class */ (function (_super) {
    __extends(NodeModel, _super);
    function NodeModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NodeModel.prototype.defaults = function () {
        return __assign(__assign({}, _super.prototype.defaults.call(this)), { _model_name: NodeModel.model_name, _model_module: NodeModel.model_module, _model_module_version: NodeModel.model_module_version, _view_name: NodeModel.view_name, _view_module: NodeModel.view_module, _view_module_version: NodeModel.view_module_version, group: 'nodes', position: {}, locked: false, grabbable: false, pannable: false });
    };
    NodeModel.prototype.asCyObj = function () {
        return __assign(__assign({}, _super.prototype.asCyObj.call(this)), { group: this.get('group'), position: this.get('position'), locked: this.get('locked'), grabbable: this.get('grabbable'), pannable: this.get('pannable') });
    };
    NodeModel.model_name = 'NodeModel';
    NodeModel.model_module = version_1.MODULE_NAME;
    NodeModel.model_module_version = version_1.MODULE_VERSION;
    NodeModel.view_name = 'NodeView';
    NodeModel.view_module = version_1.MODULE_NAME;
    NodeModel.view_module_version = version_1.MODULE_VERSION;
    return NodeModel;
}(ElementModel));
exports.NodeModel = NodeModel;
var EdgeModel = /** @class */ (function (_super) {
    __extends(EdgeModel, _super);
    function EdgeModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EdgeModel.prototype.defaults = function () {
        return __assign(__assign({}, _super.prototype.defaults.call(this)), { _model_name: EdgeModel.model_name, _model_module: EdgeModel.model_module, _model_module_version: EdgeModel.model_module_version, _view_name: EdgeModel.view_name, _view_module: EdgeModel.view_module, _view_module_version: EdgeModel.view_module_version, group: 'edges', pannable: true });
    };
    EdgeModel.prototype.asCyObj = function () {
        return __assign(__assign({}, _super.prototype.asCyObj.call(this)), { group: this.get('group'), pannable: this.get('pannable') });
    };
    EdgeModel.model_name = 'EdgeModel';
    EdgeModel.model_module = version_1.MODULE_NAME;
    EdgeModel.model_module_version = version_1.MODULE_VERSION;
    EdgeModel.view_name = 'EdgeView';
    EdgeModel.view_module = version_1.MODULE_NAME;
    EdgeModel.view_module_version = version_1.MODULE_VERSION;
    return EdgeModel;
}(ElementModel));
exports.EdgeModel = EdgeModel;
var GraphModel = /** @class */ (function (_super) {
    __extends(GraphModel, _super);
    function GraphModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GraphModel.prototype.defaults = function () {
        return __assign(__assign({}, _super.prototype.defaults.call(this)), { _model_name: 'GraphModel', _model_module: GraphModel.model_module, _model_module_version: GraphModel.model_module_version, nodes: [], edges: [] });
    };
    GraphModel.serializers = __assign({ nodes: { deserialize: widgets.unpack_models }, edges: { deserialize: widgets.unpack_models } }, base_1.WidgetModel.serializers);
    GraphModel.model_module = version_1.MODULE_NAME;
    GraphModel.model_module_version = version_1.MODULE_VERSION;
    return GraphModel;
}(base_1.WidgetModel));
exports.GraphModel = GraphModel;
var ElementView = /** @class */ (function (_super) {
    __extends(ElementView, _super);
    function ElementView(params) {
        var _this = _super.call(this, {
            model: params.model,
            options: params.options,
        }) || this;
        _this.cytoscapeView = _this.options.cytoscapeView;
        var cyId = _this.model.get('data')['id'];
        _this.elem = _this.cytoscapeView.cytoscape_obj.getElementById(cyId);
        _this.model.on('change:removed', function () {
            _this.elem.remove();
        });
        _this.model.on('change:classes', function () {
            _this.elem.classes(_this.model.get('classes'));
        });
        _this.model.on('change:data', function () {
            _this.elem.data(_this.model.get('data'));
        });
        _this.model.on('change:pannable', function () {
            // I think @types/cytoscape is missing panify and unpanify
            _this.model.get('pannable')
                ? _this.elem.panify()
                : _this.elem.unpanify();
        });
        _this.model.on('change:selectable', function () {
            _this.model.get('selectable')
                ? _this.elem.selectify()
                : _this.elem.unselectify();
        });
        _this.model.on('change:selected', function () {
            _this.model.get('selected')
                ? _this.elem.selectify()
                : _this.elem.unselectify();
        });
        return _this;
    }
    ElementView.prototype.valueChanged = function () {
        this.cytoscapeView.value_changed();
    };
    return ElementView;
}(base_1.WidgetView));
exports.ElementView = ElementView;
var NodeView = /** @class */ (function (_super) {
    __extends(NodeView, _super);
    function NodeView(params) {
        var _this = _super.call(this, {
            model: params.model,
            options: params.options,
        }) || this;
        _this.node = _this.elem;
        _this.model.on('change:position', function () {
            _this.node.position(_this.model.get('position'));
        });
        _this.model.on('change:locked', function () {
            _this.model.get('locked') ? _this.node.lock() : _this.node.unlock();
        });
        _this.model.on('change:grabbable', function () {
            _this.model.get('grabbable') ? _this.node.grabify() : _this.node.ungrabify();
        });
        return _this;
    }
    return NodeView;
}(ElementView));
exports.NodeView = NodeView;
var EdgeView = /** @class */ (function (_super) {
    __extends(EdgeView, _super);
    //   private edge: EdgeSingular;
    function EdgeView(params) {
        return _super.call(this, {
            model: params.model,
            options: params.options,
        }) || this;
        // this.edge = this.elem as EdgeSingular;
    }
    return EdgeView;
}(ElementView));
exports.EdgeView = EdgeView;

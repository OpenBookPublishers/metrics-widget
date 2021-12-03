"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.MeasuresGraph = void 0;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var MetricsWidget = /*#__PURE__*/function (_Component) {
  _inherits(MetricsWidget, _Component);

  var _super = _createSuper(MetricsWidget);

  function MetricsWidget(props) {
    var _this;

    _classCallCheck(this, MetricsWidget);

    _this = _super.call(this, props);
    _this.toggleTabMeasures = _this.toggleTabMeasures.bind(_assertThisInitialized(_this));
    _this.toggleTabTime = _this.toggleTabTime.bind(_assertThisInitialized(_this));
    _this.toggleTabGeo = _this.toggleTabGeo.bind(_assertThisInitialized(_this));
    _this.state = {
      tab: "measures"
    };
    return _this;
  }

  _createClass(MetricsWidget, [{
    key: "toggleTabMeasures",
    value: function toggleTabMeasures() {
      this.setState({
        tab: "measures"
      });
    }
  }, {
    key: "toggleTabTime",
    value: function toggleTabTime() {
      this.setState({
        tab: "time"
      });
    }
  }, {
    key: "toggleTabGeo",
    value: function toggleTabGeo() {
      this.setState({
        tab: "geo"
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("ul", null, /*#__PURE__*/_react["default"].createElement("li", {
        onClick: this.toggleTabMeasures
      }, "Measures"), /*#__PURE__*/_react["default"].createElement("li", {
        onClick: this.toggleTabTime
      }, "Time"), /*#__PURE__*/_react["default"].createElement("li", {
        onClick: this.toggleTabGeo
      }, "Geo")), /*#__PURE__*/_react["default"].createElement("div", null, this.state.tab === 'measures' && /*#__PURE__*/_react["default"].createElement(MeasuresGraph, null)));
    }
  }]);

  return MetricsWidget;
}(_react.Component);

exports["default"] = MetricsWidget;

var MeasuresGraph = /*#__PURE__*/function (_React$Component) {
  _inherits(MeasuresGraph, _React$Component);

  var _super2 = _createSuper(MeasuresGraph);

  function MeasuresGraph(props) {
    var _this2;

    _classCallCheck(this, MeasuresGraph);

    _this2 = _super2.call(this, props);
    _this2.state = {
      data: [],
      dataIsLoaded: false
    };
    return _this2;
  }

  _createClass(MeasuresGraph, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this3 = this;

      fetch("https://metrics.api.openbookpublishers.com/events?aggregation=measure_uri&filter=work_uri:info:doi:10.11647/obp.0020").then(function (res) {
        return res.json();
      }).then(function (json) {
        console.log(json);

        _this3.setState({
          data: json.data,
          dataIsLoaded: true
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          dataIsLoaded = _this$state.dataIsLoaded,
          data = _this$state.data;
      console.log(data);
      if (!dataIsLoaded) return /*#__PURE__*/_react["default"].createElement("div", null, "More Loading...");
      return /*#__PURE__*/_react["default"].createElement("ul", null, data.map(function (element) {
        return /*#__PURE__*/_react["default"].createElement("li", null, element.value);
      }));
    }
  }]);

  return MeasuresGraph;
}(_react["default"].Component);

exports.MeasuresGraph = MeasuresGraph;

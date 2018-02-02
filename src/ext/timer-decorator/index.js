/**
 * Created by lijinchao(joshua) on 17/5/19.
 */
import React, { Component } from "react";

const timerDecorator = (ComposedComponent) => {

  class Wrapper extends Component {
    componentWillMount() {
      let self = this;
      let setter = function (_setter, _clearer, array) {
        return function (callback, delta) {
          let id = _setter(function () {
            _clearer.call(this, id);
            callback.apply(this, arguments);
          }.bind(this), delta);
          if (!this[array]) {
            this[array] = [id];
          } else {
            this[array].push(id);
          }
          return id;
        }.bind(self);
      };

      let clearer = function (_clearer, array) {
        return function (id) {
          if (this[array]) {
            let index = this[array].indexOf(id);
            if (index !== -1) {
              this[array].splice(index, 1);
            }
          }
          _clearer(id);
        }.bind(self);
      };

      let _timeouts = "TimerMixin_timeouts";
      let _clearTimeout = clearer(clearTimeout, _timeouts);
      let _setTimeout = setter(setTimeout, _clearTimeout, _timeouts);

      let _intervals = "TimerMixin_intervals";
      let _clearInterval = clearer(clearInterval, _intervals);
      let _setInterval = setter(setInterval, function () {/* noop */
      }, _intervals);

      let _immediates = "TimerMixin_immediates";
      let _clearImmediate = clearer(clearImmediate, _immediates);
      let _setImmediate = setter(setImmediate, _clearImmediate, _immediates);

      let _rafs = "TimerMixin_rafs";
      let _cancelAnimationFrame = clearer(cancelAnimationFrame, _rafs);
      let _requestAnimationFrame = setter(requestAnimationFrame, _cancelAnimationFrame, _rafs);

      this._clearTimeout = _clearTimeout;
      this._setTimeout = _setTimeout;
      this._clearInterval = _clearInterval;
      this._setInterval = _setInterval;

      this._clearImmediate = _clearImmediate;
      this._setImmediate = _setImmediate;

      this._cancelAnimationFrame = _cancelAnimationFrame;
      this._requestAnimationFrame = _requestAnimationFrame;

    }

    componentWillUnmount() {

      let _timeouts = "TimerMixin_timeouts";
      let _intervals = "TimerMixin_intervals";
      let _immediates = "TimerMixin_immediates";
      let _rafs = "TimerMixin_rafs";

      this[_timeouts] && this[_timeouts].forEach(function (id) {
        clearTimeout(id);
      });
      this[_timeouts] = null;
      this[_intervals] && this[_intervals].forEach(function (id) {
        clearInterval(id);
      });
      this[_intervals] = null;
      this[_immediates] && this[_immediates].forEach(function (id) {
        clearImmediate(id);
      });
      this[_immediates] = null;
      this[_rafs] && this[_rafs].forEach(function (id) {
        cancelAnimationFrame(id);
      });
      this[_rafs] = null;
    }

    render() {
      let funcs = {
        setTimeout: this._setTimeout,
        clearTimeout: this._clearTimeout,

        setInterval: this._setInterval,
        clearInterval: this._clearInterval,

        setImmediate: this._setImmediate,
        clearImmediate: this._clearImmediate,

        requestAnimationFrame: this._requestAnimationFrame,
        cancelAnimationFrame: this._cancelAnimationFrame,
      };
      return (
        <ComposedComponent
          {...funcs}
          {...this.props}
        />
      );
    }
  }

  const wrappedComponentName = ComposedComponent.displayName
    || ComposedComponent.name
    || "Component";

  Wrapper.displayName = `timerDecorator(${wrappedComponentName})`;
  return Wrapper;
};


export default timerDecorator;

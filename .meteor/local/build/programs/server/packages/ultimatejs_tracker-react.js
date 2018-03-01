(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var _ = Package.underscore._;
var ECMAScript = Package.ecmascript.ECMAScript;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var TrackerReact;

var require = meteorInstall({"node_modules":{"meteor":{"ultimatejs:tracker-react":{"main.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/ultimatejs_tracker-react/main.js                                                                        //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.export({
  TrackerReactMixin: () => TrackerReactMixin
});
let Tracker;
module.watch(require("./Tracker"), {
  default(v) {
    Tracker = v;
  }

}, 0);
module.exportDefault(TrackerReact = function (Component, opt) {
  // No reactive computations needed for Server Side Rendering
  if (Meteor.isServer) return Component;

  class TrackerReactComponent extends Component {
    constructor(...args) {
      super(...args); /*
                       Overloading the constructors `componentWillUnmount` method to ensure that computations are stopped and a
                       forceUpdate prevented, without overwriting the prototype. This is a potential bug, as of React 14.7 the
                       componentWillUnmount() method does not fire, if the top level component has one. It gets overwritten. This
                       implementation is however similar to what a transpiler would do anyway.
                        GitHub Issue: https://github.com/facebook/react/issues/6162
                       */

      if (!this.constructor.prototype._isExtended) {
        this.constructor.prototype._isExtended = true;
        let superComponentWillUnmount = this.constructor.prototype.componentWillUnmount;

        this.constructor.prototype.componentWillUnmount = function (...args) {
          if (superComponentWillUnmount) {
            superComponentWillUnmount.call(this, ...args);
          }

          this._renderComputation.stop();

          this._renderComputation = null;
        };
      }

      this.autorunRender();
    }

    autorunRender() {
      let oldRender = this.render;

      this.render = () => {
        // Simple method we can offer in the `Meteor.Component` API
        return this.autorunOnce('_renderComputation', oldRender);
      };
    }

    autorunOnce(name, dataFunc) {
      return Tracker.once(name, this, dataFunc, this.forceUpdate);
    }

  }

  return TrackerReactComponent;
});
const TrackerReactMixin = {
  componentWillMount() {
    // No reactive computations needed for Server Side Rendering
    if (Meteor.isServer) return;
    this.autorunRender();
  },

  componentWillUnmount() {
    // No reactive computations needed for Server Side Rendering
    if (Meteor.isServer) return;

    this._renderComputation.stop();

    this._renderComputation = null;
  },

  autorunRender() {
    let oldRender = this.render;

    this.render = () => {
      // Simple method we can offer in the `Meteor.Component` API
      return this.autorunOnce('_renderComputation', oldRender);
    };
  },

  autorunOnce(name, dataFunc) {
    return Tracker.once(name, this, dataFunc, this.forceUpdate);
  }

};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Tracker.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/ultimatejs_tracker-react/Tracker.js                                                                     //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
let Tracker;
module.watch(require("meteor/tracker"), {
  Tracker(v) {
    Tracker = v;
  }

}, 0);

/**
 * Create "one-time" reactive computations with Tracker
 * @param name {string} Component Reactive Data Property for Computation
 * @param context {*} Target Component Instance
 * @param dataFunc {*} Data Context
 * @param updateFunc {*} Component ForceUpdate Method - To re-trigger render function
 * @returns {*} Symbol(react.element) - Result data-element composition
 */Tracker.once = function (name, context, dataFunc, updateFunc) {
  let data; // Stop it just in case the autorun never re-ran

  if (context[name] && !context[name].stopped) context[name].stop(); // NOTE: we may want to run this code in `setTimeout(func, 0)` so it doesn't impact the rendering phase at all

  context[name] = Tracker.nonreactive(() => {
    return Tracker.autorun(c => {
      if (c.firstRun) {
        data = dataFunc.call(context);
      } else {
        // Stop autorun here so rendering "phase" doesn't have extra work of also stopping autoruns; likely not too
        // important though.
        if (context[name]) context[name].stop(); // where `forceUpdate` will be called in above implementation

        updateFunc.call(context);
      }
    });
  });
  return data;
};

module.exportDefault(Tracker);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
var exports = require("./node_modules/meteor/ultimatejs:tracker-react/main.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['ultimatejs:tracker-react'] = exports;

})();

//# sourceURL=meteor://💻app/packages/ultimatejs_tracker-react.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvdWx0aW1hdGVqczp0cmFja2VyLXJlYWN0L21haW4uanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3BhY2thZ2VzL3VsdGltYXRlanM6dHJhY2tlci1yZWFjdC9UcmFja2VyLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydCIsIlRyYWNrZXJSZWFjdE1peGluIiwiVHJhY2tlciIsIndhdGNoIiwicmVxdWlyZSIsImRlZmF1bHQiLCJ2IiwiZXhwb3J0RGVmYXVsdCIsIlRyYWNrZXJSZWFjdCIsIkNvbXBvbmVudCIsIm9wdCIsIk1ldGVvciIsImlzU2VydmVyIiwiVHJhY2tlclJlYWN0Q29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJhcmdzIiwicHJvdG90eXBlIiwiX2lzRXh0ZW5kZWQiLCJzdXBlckNvbXBvbmVudFdpbGxVbm1vdW50IiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJjYWxsIiwiX3JlbmRlckNvbXB1dGF0aW9uIiwic3RvcCIsImF1dG9ydW5SZW5kZXIiLCJvbGRSZW5kZXIiLCJyZW5kZXIiLCJhdXRvcnVuT25jZSIsIm5hbWUiLCJkYXRhRnVuYyIsIm9uY2UiLCJmb3JjZVVwZGF0ZSIsImNvbXBvbmVudFdpbGxNb3VudCIsImNvbnRleHQiLCJ1cGRhdGVGdW5jIiwiZGF0YSIsInN0b3BwZWQiLCJub25yZWFjdGl2ZSIsImF1dG9ydW4iLCJjIiwiZmlyc3RSdW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsT0FBT0MsTUFBUCxDQUFjO0FBQUNDLHFCQUFrQixNQUFJQTtBQUF2QixDQUFkO0FBQXlELElBQUlDLE9BQUo7QUFBWUgsT0FBT0ksS0FBUCxDQUFhQyxRQUFRLFdBQVIsQ0FBYixFQUFrQztBQUFDQyxVQUFRQyxDQUFSLEVBQVU7QUFBQ0osY0FBUUksQ0FBUjtBQUFVOztBQUF0QixDQUFsQyxFQUEwRCxDQUExRDtBQUFyRVAsT0FBT1EsYUFBUCxDQXdCZUMs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UUwsSUFBUixJQUFnQnpCLFFBQVFrQyxXQUFSLENBQW9CLE1BQU07QUFDeEMsV0FBT2xDLFFBQVFtQyxPQUFSLENBQWdCQyxLQUFLO0FBQzFCLFVBQUlBLEVBQUVDLFFBQU4sRUFBZ0I7QUFFZEwsZUFBT04sU0FBU1IsSUFBVCxDQUFjWSxPQUFkLENBQVA7QUFFRCxPQUpELE1BSU87QUFFTDtBQUNBO0FBQ0EsWUFBSUEsUUFBUUwsSUFBUixDQUFKLEVBQW1CSyxRQUFRTCxJQUFSLEVBQWNMLElBQWQsR0FKZCxDQU1MOztBQUNBVyxtQkFBV2IsSUFBWCxDQUFnQlksT0FBaEI7QUFDRDtBQUNGLEtBZE0sQ0FBUDtBQWVELEdBaEJlLENBQWhCO0FBa0JBLFNBQU9FLElBQVA7QUFDRCxDQTFCRDs7QUFYQW5DLE9BQU9RLGFBQVAsQ0F1Q2VMLE9BdkNmLEUiLCJmaWxlIjoiL3BhY2thZ2VzL3VsdGltYXRlanNfdHJhY2tlci1yZWFjdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVHJhY2tlciBpcyBhdmFpbGFibGUgYXMgYSBnbG9iYWwgdmFyaWFibGUgYnV0IGlzIGV4dGVuZGVkIGZvciBvbmUgdGltZSBjb21wdXRhdGlvbnMvaW52YWxpZGF0aW9uLlxuICogSW1wbGVtZW50YXRpb246IFNlZSAuL1RyYWNrZXIuanNcbiAqL1xuaW1wb3J0IFRyYWNrZXIgZnJvbSAnLi9UcmFja2VyJztcblxuLyoqXG4gKiBhdXRvcnVuUmVuZGVyKCk6IFRoZSBtYWdpYyBiZWhpbmQgdGhpcyBjb21wdXRhdGlvbiBpcyBpdCBvbmx5IGV2ZXIgcnVucyBvbmNlIGFmdGVyIGVhY2ggdGltZSBgcmVuZGVyYCBpcyBjYWxsZWQuXG4gKiBXaGVuIGl0IGRvZXMgcnVuIHRoYXQgMm5kIHRpbWUsIGl0J3MgdXNlZCBqdXN0IHRvIGZvcmNlIGFuIHVwZGF0ZS4gVGhlIHJlYWN0aXZlIGZ1bmN0aW9uIGl0IHdyYXBzIGlzbid0IGV2ZW4gY2FsbGVkLlxuICogVGhlbiBvbiB0aGUgdXBkYXRlLCB0aGUgY3ljbGUgcmVwZWF0cywgYW5kIHRoZSBjb21wdXRhdGlvbiBpcyBzdG9wcGVkLCBhbmQgYSBuZXcgb25lIGlzIG1hZGUuXG4gKlxuICogQWxzbywgYmVjYXVzZSB0aGUgYXV0b3J1biBpcyByZWNyZWF0ZWQgb24gYWxsIFJlYWN0LXRyaWdnZXJlZCByZS1yZW5kZXJzLCBhbnkgbmV3IGNvZGUtcGF0aHMgcG9zc2libHlcbiAqIHRha2VuIGluIGByZW5kZXJgIHdpbGwgYXV0b21hdGljYWxseSBiZWdpbiB0cmFja2luZyByZWFjdGl2ZSBkZXBlbmRlbmNpZXMsIHRoZXJlYnkgTUVSR0lORyBib3RoIG1vZGVscyBvZiByZWFjdGl2aXR5OlxuICogTWV0ZW9yJ3MgdmFyaW91cyByZWFjdGl2ZSBkYXRhIHNvdXJjZXMgQU5EIFJlYWN0J3MgZnVuY3Rpb25hbCArIHVuaWRpcmVjdGlvbmFsIHJlLXJ1bm5pbmcgb2ZcbiAqIGV2ZXJ5dGhpbmcgaW4gY29tcG9uZW50IGJyYW5jaGVzIHdpdGggc3RhdGUgY2hhbmdlcy5cbiAqL1xuXG5cbi8qKlxuICogRGVmYXVsdC4gUHJvdmlkZXMgYSByZWFjdCBjb21wb25lbnQgZm9yIGluaGVyaXRhbmNlIGFzIGEgY2xlYW4gYWx0ZXJuYXRpdmUgdG8gbWl4aW5zLlxuICogSW1wbGVtZW50YXRpb246XG4gKiAgICBcImNsYXNzIE15QXBwIGV4dGVuZHMgVHJhY2tlclJlYWN0KFJlYWN0LkNvbXBvbmVudCkgeyAoLi4uKVwiXG4gKiBAcGFyYW0gQ29tcG9uZW50IHsqfSBSZWFjdCBDb21wb25lbnRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgVHJhY2tlclJlYWN0ID0gZnVuY3Rpb24gKENvbXBvbmVudCwgb3B0KSB7XG4gIC8vIE5vIHJlYWN0aXZlIGNvbXB1dGF0aW9ucyBuZWVkZWQgZm9yIFNlcnZlciBTaWRlIFJlbmRlcmluZ1xuICBpZiAoTWV0ZW9yLmlzU2VydmVyKSByZXR1cm4gQ29tcG9uZW50O1xuXG4gIGNsYXNzIFRyYWNrZXJSZWFjdENvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgICBzdXBlciguLi5hcmdzKTtcblxuICAgICAgLypcbiAgICAgICBPdmVybG9hZGluZyB0aGUgY29uc3RydWN0b3JzIGBjb21wb25lbnRXaWxsVW5tb3VudGAgbWV0aG9kIHRvIGVuc3VyZSB0aGF0IGNvbXB1dGF0aW9ucyBhcmUgc3RvcHBlZCBhbmQgYVxuICAgICAgIGZvcmNlVXBkYXRlIHByZXZlbnRlZCwgd2l0aG91dCBvdmVyd3JpdGluZyB0aGUgcHJvdG90eXBlLiBUaGlzIGlzIGEgcG90ZW50aWFsIGJ1ZywgYXMgb2YgUmVhY3QgMTQuNyB0aGVcbiAgICAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIG1ldGhvZCBkb2VzIG5vdCBmaXJlLCBpZiB0aGUgdG9wIGxldmVsIGNvbXBvbmVudCBoYXMgb25lLiBJdCBnZXRzIG92ZXJ3cml0dGVuLiBUaGlzXG4gICAgICAgaW1wbGVtZW50YXRpb24gaXMgaG93ZXZlciBzaW1pbGFyIHRvIHdoYXQgYSB0cmFuc3BpbGVyIHdvdWxkIGRvIGFueXdheS5cblxuICAgICAgIEdpdEh1YiBJc3N1ZTogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L2lzc3Vlcy82MTYyXG4gICAgICAgKi9cbiAgICAgIGlmICghdGhpcy5jb25zdHJ1Y3Rvci5wcm90b3R5cGUuX2lzRXh0ZW5kZWQpIHtcbiAgICAgICAgdGhpcy5jb25zdHJ1Y3Rvci5wcm90b3R5cGUuX2lzRXh0ZW5kZWQgPSB0cnVlO1xuICAgICAgICBsZXQgc3VwZXJDb21wb25lbnRXaWxsVW5tb3VudCA9IHRoaXMuY29uc3RydWN0b3IucHJvdG90eXBlLmNvbXBvbmVudFdpbGxVbm1vdW50O1xuXG4gICAgICAgIHRoaXMuY29uc3RydWN0b3IucHJvdG90eXBlLmNvbXBvbmVudFdpbGxVbm1vdW50ID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICAgICAgICBpZiAoc3VwZXJDb21wb25lbnRXaWxsVW5tb3VudCkge1xuICAgICAgICAgICAgc3VwZXJDb21wb25lbnRXaWxsVW5tb3VudC5jYWxsKHRoaXMsIC4uLmFyZ3MpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuX3JlbmRlckNvbXB1dGF0aW9uLnN0b3AoKTtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJDb21wdXRhdGlvbiA9IG51bGw7XG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIHRoaXMuYXV0b3J1blJlbmRlcigpO1xuICAgIH1cblxuICAgIGF1dG9ydW5SZW5kZXIoKSB7XG4gICAgICBsZXQgb2xkUmVuZGVyID0gdGhpcy5yZW5kZXI7XG5cbiAgICAgIHRoaXMucmVuZGVyID0gKCkgPT4ge1xuICAgICAgICAvLyBTaW1wbGUgbWV0aG9kIHdlIGNhbiBvZmZlciBpbiB0aGUgYE1ldGVvci5Db21wb25lbnRgIEFQSVxuICAgICAgICByZXR1cm4gdGhpcy5hdXRvcnVuT25jZSgnX3JlbmRlckNvbXB1dGF0aW9uJywgb2xkUmVuZGVyKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgYXV0b3J1bk9uY2UobmFtZSwgZGF0YUZ1bmMpIHtcbiAgICAgIHJldHVybiBUcmFja2VyLm9uY2UobmFtZSwgdGhpcywgZGF0YUZ1bmMsIHRoaXMuZm9yY2VVcGRhdGUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBUcmFja2VyUmVhY3RDb21wb25lbnQ7XG59O1xuXG5cbi8qKlxuICogTWl4aW4uIFVzZSB3aXRoIEVTNyAvIFR5cGVTY3JpcHQgRGVjb3JhdG9yIG9yIE1peGluLU1vZHVsZS5cbiAqIEltcGxlbWVudGF0aW9uOlxuICogICBcIkBUcmFja2VyUmVhY3RNaXhpblxuICogICAgY2xhc3MgTXlBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQgeyAoLi4uKVwiXG4gKiBAdHlwZSB7e2NvbXBvbmVudFdpbGxNb3VudDogKGZ1bmN0aW9uKCkpLCBjb21wb25lbnRXaWxsVW5tb3VudDogKGZ1bmN0aW9uKCkpLCBhdXRvcnVuUmVuZGVyOiAoZnVuY3Rpb24oKSksXG4gKiAgIGF1dG9ydW5PbmNlOiAoZnVuY3Rpb24oKj0sICo9KSl9fVxuICovXG5leHBvcnQgY29uc3QgVHJhY2tlclJlYWN0TWl4aW4gPSB7XG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAvLyBObyByZWFjdGl2ZSBjb21wdXRhdGlvbnMgbmVlZGVkIGZvciBTZXJ2ZXIgU2lkZSBSZW5kZXJpbmdcbiAgICBpZiAoTWV0ZW9yLmlzU2VydmVyKSByZXR1cm47XG5cbiAgICB0aGlzLmF1dG9ydW5SZW5kZXIoKTtcbiAgfSxcbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgLy8gTm8gcmVhY3RpdmUgY29tcHV0YXRpb25zIG5lZWRlZCBmb3IgU2VydmVyIFNpZGUgUmVuZGVyaW5nXG4gICAgaWYgKE1ldGVvci5pc1NlcnZlcikgcmV0dXJuO1xuXG4gICAgdGhpcy5fcmVuZGVyQ29tcHV0YXRpb24uc3RvcCgpO1xuICAgIHRoaXMuX3JlbmRlckNvbXB1dGF0aW9uID0gbnVsbDtcbiAgfSxcbiAgYXV0b3J1blJlbmRlcigpIHtcbiAgICBsZXQgb2xkUmVuZGVyID0gdGhpcy5yZW5kZXI7XG5cbiAgICB0aGlzLnJlbmRlciA9ICgpID0+IHtcbiAgICAgIC8vIFNpbXBsZSBtZXRob2Qgd2UgY2FuIG9mZmVyIGluIHRoZSBgTWV0ZW9yLkNvbXBvbmVudGAgQVBJXG4gICAgICByZXR1cm4gdGhpcy5hdXRvcnVuT25jZSgnX3JlbmRlckNvbXB1dGF0aW9uJywgb2xkUmVuZGVyKTtcbiAgICB9O1xuICB9LFxuICBhdXRvcnVuT25jZShuYW1lLCBkYXRhRnVuYykge1xuICAgIHJldHVybiBUcmFja2VyLm9uY2UobmFtZSwgdGhpcywgZGF0YUZ1bmMsIHRoaXMuZm9yY2VVcGRhdGUpO1xuICB9XG59O1xuIiwiLy8gQWxzbyBhdmFpbGFibGUgYXMgYSBnbG9iYWxcbmltcG9ydCB7VHJhY2tlcn0gZnJvbSAnbWV0ZW9yL3RyYWNrZXInO1xuXG4vKipcbiAqIENyZWF0ZSBcIm9uZS10aW1lXCIgcmVhY3RpdmUgY29tcHV0YXRpb25zIHdpdGggVHJhY2tlclxuICogQHBhcmFtIG5hbWUge3N0cmluZ30gQ29tcG9uZW50IFJlYWN0aXZlIERhdGEgUHJvcGVydHkgZm9yIENvbXB1dGF0aW9uXG4gKiBAcGFyYW0gY29udGV4dCB7Kn0gVGFyZ2V0IENvbXBvbmVudCBJbnN0YW5jZVxuICogQHBhcmFtIGRhdGFGdW5jIHsqfSBEYXRhIENvbnRleHRcbiAqIEBwYXJhbSB1cGRhdGVGdW5jIHsqfSBDb21wb25lbnQgRm9yY2VVcGRhdGUgTWV0aG9kIC0gVG8gcmUtdHJpZ2dlciByZW5kZXIgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHsqfSBTeW1ib2wocmVhY3QuZWxlbWVudCkgLSBSZXN1bHQgZGF0YS1lbGVtZW50IGNvbXBvc2l0aW9uXG4gKi9cblRyYWNrZXIub25jZSA9IGZ1bmN0aW9uIChuYW1lLCBjb250ZXh0LCBkYXRhRnVuYywgdXBkYXRlRnVuYykge1xuICBsZXQgZGF0YTtcblxuICAvLyBTdG9wIGl0IGp1c3QgaW4gY2FzZSB0aGUgYXV0b3J1biBuZXZlciByZS1yYW5cbiAgaWYgKGNvbnRleHRbbmFtZV0gJiYgIWNvbnRleHRbbmFtZV0uc3RvcHBlZCkgY29udGV4dFtuYW1lXS5zdG9wKCk7XG5cbiAgLy8gTk9URTogd2UgbWF5IHdhbnQgdG8gcnVuIHRoaXMgY29kZSBpbiBgc2V0VGltZW91dChmdW5jLCAwKWAgc28gaXQgZG9lc24ndCBpbXBhY3QgdGhlIHJlbmRlcmluZyBwaGFzZSBhdCBhbGxcbiAgY29udGV4dFtuYW1lXSA9IFRyYWNrZXIubm9ucmVhY3RpdmUoKCkgPT4ge1xuICAgIHJldHVybiBUcmFja2VyLmF1dG9ydW4oYyA9PiB7XG4gICAgICBpZiAoYy5maXJzdFJ1bikge1xuXG4gICAgICAgIGRhdGEgPSBkYXRhRnVuYy5jYWxsKGNvbnRleHQpO1xuXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIC8vIFN0b3AgYXV0b3J1biBoZXJlIHNvIHJlbmRlcmluZyBcInBoYXNlXCIgZG9lc24ndCBoYXZlIGV4dHJhIHdvcmsgb2YgYWxzbyBzdG9wcGluZyBhdXRvcnVuczsgbGlrZWx5IG5vdCB0b29cbiAgICAgICAgLy8gaW1wb3J0YW50IHRob3VnaC5cbiAgICAgICAgaWYgKGNvbnRleHRbbmFtZV0pIGNvbnRleHRbbmFtZV0uc3RvcCgpO1xuXG4gICAgICAgIC8vIHdoZXJlIGBmb3JjZVVwZGF0ZWAgd2lsbCBiZSBjYWxsZWQgaW4gYWJvdmUgaW1wbGVtZW50YXRpb25cbiAgICAgICAgdXBkYXRlRnVuYy5jYWxsKGNvbnRleHQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gZGF0YTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFRyYWNrZXIiXX0=

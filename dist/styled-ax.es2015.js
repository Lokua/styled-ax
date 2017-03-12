var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

export default (function (theme) {
  return _extends(createAccessor(createValuesAccessor()), createUserAccessors(theme));
});

function createAccessor(applyKeys) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return function () {
      for (var _len2 = arguments.length, b = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        b[_key2] = arguments[_key2];
      }

      return typeof b[0] === "function" ? function (props) {
        var fns = b.slice();
        var fn = fns.shift();
        var val = fn.apply(undefined, _toConsumableArray(applyKeys.apply(undefined, args)(props)));
        while (fn = fns.shift()) {
          val = fn(val);
        }return val;
      } : applyKeys.apply(undefined, args)(b[0]).join(" ");
    };
  };
}

function createUserAccessors(theme) {
  return Object.keys(theme).reduce(function (o, key) {
    if (typeof theme[key] === "object") o[key] = createAccessor(createValuesAccessor(key));
    return o;
  }, {});
}

function createValuesAccessor(key) {
  return function () {
    for (var _len3 = arguments.length, keys = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      keys[_key3] = arguments[_key3];
    }

    return function (props) {
      var vars = key ? props.theme[key] : props.theme;
      return values(plucks.apply(undefined, keys)(vars));
    };
  };
}

function values(obj) {
  return Object.keys(obj).map(function (k) {
    return obj[k];
  });
}

function plucks() {
  for (var _len4 = arguments.length, keys = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    keys[_key4] = arguments[_key4];
  }

  return function (object) {
    return keys.reduce(function (obj, key) {
      obj[key] = object[key];
      return obj;
    }, {});
  };
}

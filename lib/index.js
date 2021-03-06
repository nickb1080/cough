// Generated by CoffeeScript 1.9.1
var Reflect, camel_case, cases, cough, handler, is_primitive, snake_case;

if (!(global.Proxy && typeof Proxy !== "undefined")) {
  throw new Error("Unsupported platform.");
}

Reflect = require("harmony-reflect");

camel_case = require("camel-case");

snake_case = require("snake-case");

is_primitive = require("is-primitive");

cases = function(s) {
  return [camel_case(s), snake_case(s)];
};

handler = {
  has: function(target, prop) {
    var camel, ref, snake;
    if (Reflect.has(target, prop)) {
      return true;
    }
    ref = cases(prop), camel = ref[0], snake = ref[1];
    if (Reflect.has(target, camel)) {
      return true;
    }
    if (Reflect.has(target, snake)) {
      return true;
    }
    return false;
  },
  get: function(target, prop) {
    var camel, ref, snake;
    if (Reflect.has(target, prop)) {
      return Reflect.get(target, prop);
    }
    ref = cases(prop), camel = ref[0], snake = ref[1];
    if (Reflect.has(target, camel)) {
      return Reflect.get(target, camel);
    }
    if (Reflect.has(target, snake)) {
      return Reflect.get(target, snake);
    }
  }
};

module.exports = cough = function(obj) {
  if (is_primitive(obj)) {
    throw new TypeError("cough doesn't accept primitive values");
  }
  return new Proxy(obj, handler);
};

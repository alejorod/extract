import vm from 'vm';

/**
 * Extracts exported `key` from `bundle`. `bundle` can be js code represented
 * with a string, an Object or a function. If not `key` is provided the entire
 * exprots object will be returned.
 *
 * @param  {Object|String|Function} bundle
 * @param  {String} key
 * @return {*}
 */
export default function(bundle, key='') {
  let target = bundle;

  if (typeof(target) === 'string') {
    let script = new vm.Script(bundle);
    let context = vm.createContext({
      require: require,
      console: console,
      process: process,
      module: {}
    });

    script.runInContext(context);
    target = context.module.exports;
  }

  return key
    ? target[key]
    : target;
}

var map2object = require('map2object');

/**
 * The method parses a string as JSON, optionally transforming the value produced by parsing.
 * Unlike JSON.parse(), this returns Map instead of basic Object.
 *
 * @param  {string}   text      The string to parse as JSON
 * @param  {function} [replacer] A function that alters the behavior of the stringification process, or an array of String and Number objects that serve as a whitelist for selecting the properties of the value object to be included in the JSON string. If this value is null or not provided, all properties of the object are included in the resulting JSON string.
 * @param {string|number} [space]
 * @return {string}
 */
module.exports = function(text, replacer, space) {
    return JSON.stringify(
        text,
        replacer !== undefined ?
            function(key, value) {
                if (value instanceof Map) {
                    value = map2object(value);
                }

                return replacer(key, value);
            } :
            function(key, value) {
                if (value instanceof Map) {
                    return map2object(value);
                }

                return value;
            }
    );
};

/* Domino uses sloppy-mode features (in particular, `with`) for a few
 * minor things.  This file encapsulates all the sloppiness; every
 * other module should be strict. */
/* jshint strict: false */
/* jshint evil: true */
/* jshint -W085 */
module.exports = {
  Window_run: function _run(code, file) {
    if (file) code += '\n//@ sourceURL=' + file;
    eval(code);
  },
  EventHandlerBuilder_build: function build() {
    try {
      return eval("(function(event){" + this.body + "})");
    }
    catch (err) {
      return function() { throw err; };
    }
  }
};

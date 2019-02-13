//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script = {
  components: {
    // Trigger
  },
  props: {
    content: {
      type: String,
      default: "Content Not Defined"
    },
    readMoreText: {
      type: String,
      default: "Read More"
    },
    readLessText: {
      type: String,
      default: "Read Less"
    },
    readMoreIcon: {
      type: String,
      default: "arrow_drop_down"
    },
    readLessIcon: {
      type: String,
      default: "arrow_drop_up"
    },
    height: {
      type: Number,
      default: 300
    },
    hideFade: {
      type: Boolean,
      default: false
    },
    hideReadLess: {
      type: Boolean,
      default: false
    },
    transitionSpeed: {
      type: Number,
      default: 0.3
    },
    showWordCount: {
      type: Boolean,
      default: false
    },
    triggerPosition: {
      type: String,
      default: "center"
    },
    triggerClass: {
      type: String,
      default: "myTriggerClass"
    },
    triggerFontSize: {
      type: Number,
      default: 11
    }
  },
  data: function data() {
    return {
      id: null,
      isCollapsed: true,
      sectionHeight: null,
      hideButton: false,
      actualHeight: null,
      removeFade: false
    };
  },
  computed: {
    getWordCount: function getWordCount() {
      return this.content.split(" ").length;
    },
    getTriggerPosition: function getTriggerPosition() {
      return ("text-xs-" + (this.triggerPosition));
    },
    getTransitionSpeed: function getTransitionSpeed() {
      return ("height " + (this.transitionSpeed) + "s ease-out");
    },
    getHeight: function getHeight() {
      if (this.hideButton) {
        return "100%";
      }
      return this.height + "px";
    }
  },
  mounted: function mounted() {
    var this$1 = this;

    /**
     * One way to get a unique id -- the component's own interal id. But folks say to avoid this.
     */
    //this.id = this._uid;

    this.id = this.create_UUID();

    this.$nextTick(function () {
      var sectionHeight = document.getElementById(this$1.id).scrollHeight;
      this$1.sectionHeight = sectionHeight;
      //console.log(sectionHeight, this.height);
      if (this$1.sectionHeight === this$1.height) {
        this$1.hideButton = true;
        this$1.removeFade = true;
      }
    });

    this.handleClicks();
  },
  methods: {
    handleClicks: function handleClicks() {
      var this$1 = this;

      window.addEventListener("click", function (event) {
        var target = event.target;
        // handle only links that do not reference external resources
        if (target && target.matches("a:not([href*='://'])") && target.href) {
          // some sanity checks taken from vue-router:
          // https://github.com/vuejs/vue-router/blob/dev/src/components/link.js#L106
          var altKey = event.altKey;
          var ctrlKey = event.ctrlKey;
          var metaKey = event.metaKey;
          var shiftKey = event.shiftKey;
          var button = event.button;
          var defaultPrevented = event.defaultPrevented;
          // don't handle with control keys
          if (metaKey || altKey || ctrlKey || shiftKey) { return; }
          // don't handle when preventDefault called
          if (defaultPrevented) { return; }
          // don't handle right clicks
          if (button !== undefined && button !== 0) { return; }
          // don't handle if `target="_blank"`
          if (target && target.getAttribute) {
            var linkTarget = target.getAttribute("target");
            if (/\b_blank\b/i.test(linkTarget)) { return; }
          }
          // don't handle same page links/anchors
          var url = new URL(target.href);
          var to = url.pathname;
          if (window.location.pathname !== to && event.preventDefault) {
            event.preventDefault();
            this$1.$router.push(to);
          }
        }
      });
    },
    y: function y(f) {
      var arguments$1 = arguments;
      var this$1 = this;

      /**
       * Y Combinator -- since arguments.callee not allowed in strict mode
       * https://stackoverflow.com/questions/19214977/alternative-to-arguments-callee
       */
      return function () {
        return f.bind(null, this$1.y(f)).apply(this$1, arguments$1);
      };
    },
    create_UUID: function create_UUID() {
      var dt = new Date().getTime();
      var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
      });
      return uuid;
    },
    collapseSection: function collapseSection(element) {
      var this$1 = this;

      var sectionHeight = element.scrollHeight;

      var elementTransition = element.style.transition;
      element.style.transition = "";

      requestAnimationFrame(function () {
        element.style.height = sectionHeight + "px";
        element.style.transition = elementTransition;

        requestAnimationFrame(function () {
          element.style.height = this$1.height + "px";
        });
      });

      element.setAttribute("data-collapsed", "true");
    },
    expandSection: function expandSection(element) {
      var sectionHeight = element.scrollHeight;

      element.style.height = sectionHeight + "px";

      element.addEventListener(
        "transitionend",
        this.y(function (callee) {
          element.removeEventListener("transitionend", callee);
        })
      );

      element.setAttribute("data-collapsed", "false");
    },
    toggle: function toggle() {
      var section = document.getElementById(this.id);
      var isCollapsed = section.getAttribute("data-collapsed") === "true";

      if (isCollapsed) {
        this.expandSection(section);
        section.setAttribute("data-collapsed", "false");
      } else {
        this.collapseSection(section);
      }
      this.isCollapsed = !this.isCollapsed;
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
  return function (id, style) {
    return addStyle(id, style);
  };
}
var HEAD = document.head || document.getElementsByTagName('head')[0];
var styles = {};

function addStyle(id, css) {
  var group = isOldIE ? css.media || 'default' : id;
  var style = styles[group] || (styles[group] = {
    ids: new Set(),
    styles: []
  });

  if (!style.ids.has(id)) {
    style.ids.add(id);
    var code = css.source;

    if (css.map) {
      // https://developer.chrome.com/devtools/docs/javascript-debugging
      // this makes source maps inside style tags work properly in Chrome
      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
    }

    if (!style.element) {
      style.element = document.createElement('style');
      style.element.type = 'text/css';
      if (css.media) { style.element.setAttribute('media', css.media); }
      HEAD.appendChild(style.element);
    }

    if ('styleSheet' in style.element) {
      style.styles.push(code);
      style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
    } else {
      var index = style.ids.size - 1;
      var textNode = document.createTextNode(code);
      var nodes = style.element.childNodes;
      if (nodes[index]) { style.element.removeChild(nodes[index]); }
      if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }else { style.element.appendChild(textNode); }
    }
  }
}

var browser = createInjector;

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"readMore"},[_c('div',{staticClass:"section",class:{ fade: _vm.isCollapsed && !_vm.hideFade && !_vm.removeFade },style:({ height: _vm.getHeight, transition: _vm.getTransitionSpeed }),attrs:{"id":_vm.id,"data-collapsed":"true"}},[_c('span',{domProps:{"innerHTML":_vm._s(_vm.content)}})])]),_vm._v(" "),(
      (!this.isCollapsed && this.hideReadLess) || this.hideButton
        ? false
        : true
    )?_c('div',{staticClass:"mt-0",class:_vm.triggerClass},[_c('button',{staticClass:"readMore btn",class:_vm.triggerPosition,style:({ 'font-size': _vm.triggerFontSize + 'px' }),attrs:{"type":"button"},on:{"click":function($event){return _vm.toggle()}}},[_c('span',[_vm._v("\n        "+_vm._s(this.isCollapsed ? this.readMoreText : this.readLessText)+"\n        "),(_vm.isCollapsed && _vm.showWordCount ? true : false)?_c('span',{staticClass:"wordCount"},[_vm._v("  "+_vm._s(_vm.getWordCount)+" total words")]):_vm._e()]),_vm._v(" \n      "),_c('i',{staticClass:"material-icons"},[_vm._v("\n        "+_vm._s(this.isCollapsed ? this.readMoreIcon : this.readLessIcon)+"\n      ")])])]):_vm._e()])};
var __vue_staticRenderFns__ = [];

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-326e08af_0", { source: ".readMore .section{overflow:hidden;height:auto;position:relative;z-index:0;font-size:16px;clear:both;margin-top:0}.readMore .fade{position:relative}.readMore .fade:after{content:\"\";position:absolute;z-index:1;bottom:0;left:0;pointer-events:none;background-image:linear-gradient(to bottom,rgba(255,255,255,0),#fff 60%);width:100%;height:4em}.readMore .hidden{visibility:hidden}.readMore .material-icons{font-family:\"Material Icons\";font-weight:900;vertical-align:middle;font-style:normal;text-align:center;font-size:11px;display:inline-block;line-height:1.5em;text-transform:none;letter-spacing:normal;word-wrap:normal;white-space:nowrap;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:\"liga\"}.readMore.btn{position:relative;display:block;padding:0;overflow:hidden;border-width:0;outline:0;border-radius:2px;box-shadow:0 1px 4px rgba(0,0,0,.6);background-color:#fff;color:#333;font-weight:900;text-transform:uppercase;transition:background-color .3s;padding:5px 12px}.readMore.btn:hover{background-color:#ccc}.readMore.btn>*{position:relative}.readMore.btn:before{content:\"\";position:absolute;top:50%;left:50%;display:block;width:0;padding-top:0;border-radius:100%;background-color:rgba(236,240,241,.3);-webkit-transform:translate(-50%,-50%);-moz-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);-o-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.readMore.btn:active:before{width:120%;padding-top:120%;transition:width .2s ease-out,padding-top .2s ease-out}.readMore.btn .wordCount{font-weight:400;color:#555}.center{margin:5px auto}.right{float:right;margin-bottom:45px}.left{float:left;margin-bottom:45px}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */
  

  
  var component = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    browser,
    undefined
  );

// Import vue component

// install function executed by Vue.use()
function install(Vue) {
  if (install.installed) { return; }
  install.installed = true;
  Vue.component('Readmore', component);
}

// Create module definition for Vue.use()
var plugin = {
  install: install,
};

// To auto-install when vue is found
/* global window global */
var GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

// Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()
component.install = install;

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;

export default component;

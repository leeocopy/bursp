/**
 * Plugin: mouse-tracker.js (Modules: 247)
 * Reconstructed from Bürocratik (_nuxt bundle)
 */

// ==================== MODULE 247 (f4b42a5.js) ====================
const mod_247 = function(e,t,n){"use strict";var r=n(15),o=(n(77),n(4),n(27),n(78),n(79),n(80),n(81),n(82),n(83),n(84),n(85),n(86),n(87),n(88),n(89),n(90),n(11),n(28),n(35)),l=n(55);t.a=function(e,t){t("mouse",function(){var e=new Map([["position",new Map],["velocity",new Map]]),t={x:-2e3,y:-2e3},n={x:0,y:0},c={x:-2e3,y:-2e3},d={x:0,y:0},f=0,m=Object(o.e)((function(e){var r=e.clientX,o=e.clientY,l=Date.now(),m=l-f,v=e.clientX-c.x,x=e.clientY-c.y;c.x=t.x,c.y=t.y,t.x=r,t.y=o,t.x===c.x&&t.y===c.y||h("position",t,c),d.x=n.x,d.y=n.y,n.x=v/m,n.y=x/m,n.x===d.x&&n.y===d.y||h("velocity",n,d),f=l}));function h(t){for(var n=arguments.length,o=new Array(n>1?n-1:0),l=1;l<n;l++)o[l-1]=arguments[l];Object(r.a)(e.get(t).values()).forEach((function(e){return e.apply(void 0,o)}))}return document.addEventListener("mousemove",m,{passive:!0}),{watch:function(t,n){var r=Object(l.f)(),o=e.get(t);return o?(n&&"function"==typeof n&&o.set(r,n),function(){return o.delete(r)}):(console.error("[plugins/mouse] Unable to setup watcher for '".concat(t,"': invalid watcher key.")),function(){})},get velocity(){return n},get position(){return t}}}())}};

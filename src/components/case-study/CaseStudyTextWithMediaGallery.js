/**
 * CaseStudyTextWithMediaGallery.js (Extracted from _nuxt/5437f1e.js)
 * Reconstructed from Bürocratik (_nuxt bundle)
 */

// ==================== MODULE 783 (5437f1e.js) ====================
const mod_783 = function(t,e,l){var content=l(844);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,l(9).default)("1917a310",content,!0,{sourceMap:!1})};

// ==================== MODULE 843 (5437f1e.js) ====================
const mod_843 = function(t,e,l){"use strict";l(783)};

// ==================== MODULE 844 (5437f1e.js) ====================
const mod_844 = function(t,e,l){var n=l(8)((function(i){return i[1]}));n.push([t.i,"._text-with-media-gallery{position:relative;position:relative;margin-top:20px;margin-bottom:20px;justify-content:space-between}@media only screen and (max-width: 1023px){._text-with-media-gallery{margin-top:32px;margin-bottom:var(--grid-margin)}}@media only screen and (min-width: 1023px){._text-with-media-gallery.-reversed{flex-direction:row-reverse}._text-with-media-gallery.-reversed .sized-media-column{align-items:flex-start}}._text-with-media-gallery .sized-media-column{align-items:flex-end}._text-with-media-gallery .text-block{position:sticky;top:var(--case-study-navbar-height);padding-top:var(--grid-margin)}@media only screen and (max-width: 1023px){._text-with-media-gallery .text-block{position:relative;top:unset;margin-bottom:56px;padding-top:0}}._text-with-media-gallery .text-block h2{margin-bottom:/*lrs=12*/ 12px}@media only screen and (max-width: 1023px){._text-with-media-gallery .text-block h2{margin-bottom:16px}}@media only screen and (min-width: 2000px) {\n._text-with-media-gallery .text-block h2 { margin-bottom: 0.6vw\n}\n}",""]),n.locals={},t.exports=n};

// ==================== MODULE 1004 (5437f1e.js) ====================
const mod_1004 = function(t,e,l){"use strict";l.r(e);l(38);var n=l(25),o=l(41),r={components:{Media:n.l,TextBlock:o.h},props:{as:{type:String,default:"div"},layout:{type:String,default:"default",validator:function(t){return["default","reversed"].includes(t)}},title:{type:String,default:void 0},text:{type:String,default:void 0},mediaGallery:{type:Array,default:function(){return[]}}},computed:{useTextColumnLayout:function(){return!!this.text&&this.text.length>450}}},d=(l(843),l(1)),component=Object(d.a)(r,(function(){var t=this,e=t._self._c;return e(t.as,{tag:"component",class:"_text-with-media-gallery g-row ".concat("default"!==t.layout?"-"+t.layout:"")},[e("div",{staticClass:"g-col xxl-8 md-9 sm-12 xs-24"},[e("div",{staticClass:"text-block p-small"},[t.title?e("h2",[t._v(t._s(t.title))]):t._e(),t._v(" "),t.text?e("TextBlock",{class:{"text-columns":t.useTextColumnLayout,"break-paragraphs":!0,"lg-column-count-1":!0},attrs:{value:t.text}}):t._e()],1)]),t._v(" "),e("div",{staticClass:"g-col xxl-14 sm-24 sized-media-column"},[t._l(t.mediaGallery,(function(t,l){var n=t.size,o=t.media;return[e("Media",{key:l,class:"-".concat(n),attrs:{asset:o}})]}))],2)])}),[],!1,null,null,null);e.default=component.exports};

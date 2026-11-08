/**
 * ClientShowcaseSection.js (Extracted from _nuxt/925645e.js)
 * Reconstructed from Bürocratik (_nuxt bundle)
 */

// ==================== MODULE 818 (925645e.js) ====================
const mod_818 = function(t,e,n){var content=n(917);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(9).default)("01172970",content,!0,{sourceMap:!1})};

// ==================== MODULE 916 (925645e.js) ====================
const mod_916 = function(t,e,n){"use strict";n(818)};

// ==================== MODULE 917 (925645e.js) ====================
const mod_917 = function(t,e,n){var l=n(8)((function(i){return i[1]}));l.push([t.i,"._client-showcase{position:relative;margin-top:var(--grid-margin);margin-bottom:/*lrs=0*/ clamp(0px,83.071px + 100vw*-0.0489,64px)}._client-showcase p{margin-top:/*lrs=12*/ 12px}._client-showcase ul{--gap-y: /*lrs=60*/ clamp(20px, 8.105px + 100vw * 0.0305, 60px);margin-top:/*lrs=64*/ clamp(32px,22.484px + 100vw*0.0244,64px);display:grid;grid-template-columns:repeat(2, minmax(0, 1fr));gap:var(--gap-y) var(--grid-gap)}@media only screen and (max-width: 743px){._client-showcase ul{justify-items:center}}._client-showcase ul img{width:max-content;height:/*lrs=115*/ clamp(92px,85.136px + 100vw*0.0176,115px)}@media only screen and (min-width: 2000px) {\n._client-showcase { margin-bottom: 0vw\n}\n._client-showcase p { margin-top: 0.6vw\n}\n._client-showcase ul { --gap-y: 3vw;\nmargin-top: 3.2vw\n}\n._client-showcase ul img { height: 5.75vw\n}\n}",""]),l.locals={},t.exports=l};

// ==================== MODULE 1014 (925645e.js) ====================
const mod_1014 = function(t,e,n){"use strict";n.r(e);n(16),n(102);var l={components:{ImageAsset:n(25).j},props:{title:{type:String,required:!0},description:{type:String,required:!0},clients:{type:Array,required:!0}}},r=(n(916),n(1)),component=Object(r.a)(l,(function(){var t=this,e=t._self._c;return e("section",{staticClass:"_client-showcase"},[e("div",{staticClass:"g-row"},[e("h2",{staticClass:"g-col xxl-16 xs-24 md-14 sm-10 h3 xs-p-medium"},[t._v(t._s(t.title))]),t._v(" "),e("p",{staticClass:"g-col xxl-6 md-8 sm-12 xs-24 p-small"},[t._v(t._s(t.description))])]),t._v(" "),e("div",{staticClass:"g-row justify-right"},[e("ul",{staticClass:"g-col xxl-8 md-10 sm-14 xs-24 relative"},t._l(t.clients,(function(t,n){return e("li",{key:n},[e("ImageAsset",{attrs:{asset:t}})],1)})),0)])])}),[],!1,null,null,null);e.default=component.exports};

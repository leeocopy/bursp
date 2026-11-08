/**
 * PageCardGallerySection.js (Extracted from _nuxt/63e5d3c.js)
 * Reconstructed from Bürocratik (_nuxt bundle)
 */

// ==================== MODULE 771 (63e5d3c.js) ====================
const mod_771 = function(e,t,r){var content=r(775);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(9).default)("74b43988",content,!0,{sourceMap:!1})};

// ==================== MODULE 774 (63e5d3c.js) ====================
const mod_774 = function(e,t,r){"use strict";r(771)};

// ==================== MODULE 775 (63e5d3c.js) ====================
const mod_775 = function(e,t,r){var n=r(8)((function(i){return i[1]}));n.push([e.i,"._page-card-gallery{position:relative;width:100%;margin-top:/*lrs=32*/ 32px;margin-bottom:/*lrs=32*/ 32px}._page-card-gallery .row{width:var(--grid-width);margin:0 auto;display:flex;flex-wrap:wrap;align-items:flex-start;gap:/*lrs=32*/ 32px var(--grid-gap)}._page-card-gallery .row:not(:last-child){margin-bottom:/*lrs=32*/ 32px}@media only screen and (min-width: 2000px) {\n._page-card-gallery { margin-top: 1.6vw;\nmargin-bottom: 1.6vw\n}\n._page-card-gallery .row { gap: 1.6vw var(--grid-gap)\n}\n._page-card-gallery .row:not(:last-child) { margin-bottom: 1.6vw\n}\n}",""]),n.locals={},e.exports=n};

// ==================== MODULE 778 (63e5d3c.js) ====================
const mod_778 = function(e,t,r){"use strict";r.r(t);r(4),r(27),r(28);var n={components:{CaseStudyCard:function(){return Promise.resolve().then(r.bind(null,392))},BrandingPageCard:function(){return Promise.resolve().then(r.bind(null,391))}},props:{bot:{type:Object,default:function(){}},as:{type:String,default:"section"},rows:{type:Array,required:!0}},methods:{computeRowComponent:function(e){return"section "===e?"article":"div"},getItemSize:function(e,t){var r=e.bias,n=e.items;return 2===n.length?"medium":3===n.length?0===t&&"left"===r||2===t&&"right"===r?"medium":"small":4===n.length?"small":"large"}}},o=(r(774),r(1)),component=Object(o.a)(n,(function(){var e=this,t=e._self._c;return t(e.as,{directives:[{name:"bot",rawName:"v-bot:event",value:{type:"intersection",message:"A glimpse of our latest work, fresh and minty",icon:"burocratik"},expression:"{ type: 'intersection', message: 'A glimpse of our latest work, fresh and minty', icon: 'burocratik' }",arg:"event"}],tag:"component",staticClass:"_page-card-gallery"},e._l(e.rows,(function(r,n){return t(e.computeRowComponent(e.as),{key:n,tag:"component",staticClass:"row"},[e._l(r.items,(function(o,l){return["case-study"===o.type?t("CaseStudyCard",e._b({directives:[{name:"pointer",rawName:"v-pointer:pointershift",arg:"pointershift"}],key:n*r.items.length+l,attrs:{size:e.getItemSize(r,l)}},"CaseStudyCard",o,!1)):e._e(),e._v(" "),"branding"===o.type?t("BrandingPageCard",e._b({key:n*r.items.length+l},"BrandingPageCard",o,!1)):e._e()]}))],2)})),1)}),[],!1,null,null,null);t.default=component.exports};

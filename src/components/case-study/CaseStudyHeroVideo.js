/**
 * CaseStudyHeroVideo.js (Extracted from _nuxt/7da2e30.js)
 * Reconstructed from Bürocratik (_nuxt bundle)
 */

// ==================== MODULE 779 (7da2e30.js) ====================
const mod_779 = function(e,t,o){var content=o(836);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(9).default)("90b0ec4c",content,!0,{sourceMap:!1})};

// ==================== MODULE 835 (7da2e30.js) ====================
const mod_835 = function(e,t,o){"use strict";o(779)};

// ==================== MODULE 836 (7da2e30.js) ====================
const mod_836 = function(e,t,o){var r=o(8)((function(i){return i[1]}));r.push([e.i,"._hero-video{position:relative;width:100%;margin:var(--grid-margin) 0}@media only screen and (max-width: 743px){._hero-video{--aspect-ratio: 0.65}}._hero-video .absolute{position:absolute}._hero-video .preview-button{position:relative;width:100%;height:100%;background-color:#000}._hero-video ._media video{width:100%;height:100%}@media only screen and (min-width: 2000px) {\n}",""]),r.locals={},e.exports=r};

// ==================== MODULE 1000 (7da2e30.js) ====================
const mod_1000 = function(e,t,o){"use strict";o.r(t);o(4);var r=o(41),n=o(25),h={components:{Media:n.l,PlayButton:n.q,AspectRatio:r.a},props:{preview:{type:Object,required:!0},video:{type:Object,required:!0},label:{type:String,default:void 0}},data:function(){return{width:this.preview.sources[1].width,height:this.preview.sources[1].height}},mounted:function(){var e=this.preview.sources.reduce((function(e,source,t,o){return source.width>o[e].width?t:e}),0),t=this.preview.sources.reduce((function(e,source,t,o){return source.width<o[e].width?t:e}),0);this.$screen.width>743?(this.width=this.preview.sources[e].width,this.height=this.preview.sources[e].height):(this.width=this.preview.sources[t].width,this.height=this.preview.sources[t].height),this.$nextTick((function(){window.refreshScrollTrigger(!0)}))},methods:{onPreviewClick:function(){this.$videoPlayer.load({asset:this.video,title:this.label})}}},c=(o(835),o(1)),component=Object(c.a)(h,(function(){var e=this,t=e._self._c;return t("section",{directives:[{name:"pointer",rawName:"v-pointer:eyes",arg:"eyes"}],staticClass:"_hero-video"},[t("AspectRatio",{attrs:{value:[e.width,e.height]}},[t("button",{staticClass:"preview-button items-center-center",on:{click:e.onPreviewClick}},[t("Media",{staticClass:"absolute inset-0 fit-cover",attrs:{asset:e.preview,"video-options":{controls:!1,muted:!0,autoplay:!0,loop:!0,preload:"metadata"}}}),e._v(" "),e.$screen.touch?t("PlayButton",{attrs:{as:"div"}}):e._e()],1)])],1)}),[],!1,null,null,null);t.default=component.exports};

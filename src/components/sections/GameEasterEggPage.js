/**
 * GameEasterEggPage.js (Extracted from _nuxt/1d75fc7.js)
 * Reconstructed from Bürocratik (_nuxt bundle)
 */

// ==================== MODULE 824 (1d75fc7.js) ====================
const mod_824 = function(e,t,n){var content=n(929);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(9).default)("aea48ebe",content,!0,{sourceMap:!1})};

// ==================== MODULE 928 (1d75fc7.js) ====================
const mod_928 = function(e,t,n){"use strict";n(824)};

// ==================== MODULE 929 (1d75fc7.js) ====================
const mod_929 = function(e,t,n){var o=n(8)((function(i){return i[1]}));o.push([e.i,'._page[data-slug="404"][data-v-283d288e]{width:100%;position:fixed;pointer-events:none;user-select:none;-webkit-user-select:none;font-feature-settings:"ss11" on}._page[data-slug="404"] ._minimal-header[data-v-283d288e]{ height: 100vh;height:100svh;background-color:rgba(0,0,0,0);pointer-events:none;user-select:none;-webkit-user-select:none}._page[data-slug="404"] .overlay-image[data-v-283d288e]{pointer-events:none;user-select:none;-webkit-user-select:none;top:0;position:absolute;z-index:0;top:auto;width:300px;height:300px;left:0;right:0;margin:0 auto;bottom:-10px;transform:translate(0px, 100%)}@media only screen and (max-width: 743px){._page[data-slug="404"] .overlay-image[data-v-283d288e]{width:220px;height:220px}}@media only screen and (min-width: 2000px) {\n}',""]),o.locals={},e.exports=o};

// ==================== MODULE 987 (1d75fc7.js) ====================
const mod_987 = function(e,t,n){"use strict";n.r(t);n(45),n(75),n(105),n(27);var o=n(114),r=n(381),d=n(389),l={components:{Page:o.a,MinimalHeader:r.a,Space:d.a},data:function(){return{players:Array.from({length:9},(function(e,i){return{video:"/imgs/404/000".concat(i+1,".webm")}})),randomPlayer:""}},computed:{metadata:function(){return{title:"We game at Büro",unlisted:!0}},content:function(){return{title:"Long ago, in the depths of the Outer Infernet, a warrior rose…\nStraight fire, no misses. (000)",subtitle:"Left Right"}}},created:function(){this.randomPlayer=this.getRandom(),this.$nuxt.$on("404-update-player",this.playerUpdate)},beforeDestroy:function(){this.$nuxt.$off("404-update-player",this.playerUpdate)},methods:{playerUpdate:function(){this.randomPlayer=this.getRandom();var video=this.$refs.video;null==video||video.load()},getRandom:function(){var e=Math.floor(Math.random()*this.players.length);return this.players[e].video}}},c=(n(928),n(1)),component=Object(c.a)(l,(function(){var e=this,t=e._self._c;return t("Page",{attrs:{slug:"404",metadata:e.metadata}},[t("Space"),e._v(" "),t("video",{ref:"video",staticClass:"overlay-image",attrs:{preload:"auto",muted:"",playsinline:""},domProps:{muted:!0}},[t("source",{attrs:{src:e.randomPlayer.replace(".webm",".mp4"),type:"video/mp4; codecs=hvc1"}}),e._v(" "),t("source",{attrs:{src:e.randomPlayer,type:"video/webm"}})]),e._v(" "),t("MinimalHeader",{attrs:{title:e.content.title,subtitle:e.content.subtitle}})],1)}),[],!1,null,"283d288e",null);t.default=component.exports};

/**
 * Layout Component: AppLayout.js
 * Reconstructed from Bürocratik (_nuxt bundle)
 */

// ==================== MODULE 413 (f4b42a5.js) ====================
const mod_413 = function(e,t,n){"use strict";n(4),n(27),n(28);var r=n(152),o=n(202),l=n(118),c=n(151),d=n(203);n(5),n(30),n(113);var f={components:{Navbar:o.a,Scroller:r.a,PageModal:l.a,VideoPlayer:c.a,Loading:d.a,Pointer:function(){return Promise.resolve().then(n.bind(null,387))},GridPreview:function(){return Promise.resolve().then(n.bind(null,388))}},mixins:[{mounted:function(){}}],computed:{IS_DEV:function(){return!1},letsTalkData:function(){return this.$config.letsTalkData},navbarData:function(){return this.$config.navbarData}},mounted:function(){if(!this.$config.loadingComponent){var e=this.$getActivePageContext();e&&window.addEventListener("load",(function(){return e.loader.dispatch("ready")}),{once:!0})}this.$audio.mounted()}},m=(n(668),n(1)),component=Object(m.a)(f,(function(){var e=this,t=e._self._c;return t("Scroller",{attrs:{global:""}},[e.$config.loadingComponent?t("Loading"):e._e(),e._v(" "),t("Navbar",{attrs:{pages:e.navbarData.pages,socials:e.navbarData.socials,tagline:e.navbarData.tagline,cta:e.navbarData.cta}}),e._v(" "),t("Nuxt"),e._v(" "),t("client-only",[t("PageModal"),e._v(" "),t("VideoPlayer"),e._v(" "),e.IS_DEV||e.$preview?t("GridPreview"):e._e(),e._v(" "),e.$screen.touch?e._e():t("Pointer")],1)],1)}),[],!1,null,null,null);t.a=component.exports};

// ==================== MODULE 415 (f4b42a5.js) ====================
const mod_415 = function(e,t,n){"use strict";var r=n(1),component=Object(r.a)({},(function(){return(0,this._self._c)("Nuxt")}),[],!1,null,null,null);t.a=component.exports};

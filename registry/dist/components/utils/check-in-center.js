!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["utils/check-in-center"]=t():e["utils/check-in-center"]=t()}(self,(function(){return function(){"use strict";var e={181:function(e,t,n){n.r(t),n.d(t,{default:function(){return f}});var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"multiple-widgets"},e._l(e.items,(function(t){return n("DefaultWidget",{key:t.name,attrs:{disabled:t.disabled,"data-name":t.name,name:t.displayName,icon:t.icon},on:{click:function(n){return e.runItemAction(t,n)}}})})),1)};i._withStripped=!0;var o=coreApis.ui,s=coreApis.ajax,r=coreApis.toast,a=n(109),c=coreApis.pluginApis.data;const l=[{name:"seeds-to-coins",displayName:"瓜子换硬币",icon:"mdi-seed-outline",action:async()=>{const e=await(0,s.postTextWithCredentials)("https://api.live.bilibili.com/xlive/revenue/v1/wallet/silver2coin",(0,a.formData)({csrf:(0,a.getCsrf)(),csrf_token:(0,a.getCsrf)()})),t=JSON.parse(e);0!==t.code?r.Toast.info(t.message,"瓜子换硬币",3e3):r.Toast.success(`${t.message}\n剩余银瓜子:${t.data.silver}`,"瓜子换硬币",3e3)}},{name:"live-check-in",displayName:"直播间签到",icon:"mdi-calendar-check",action:async()=>{const e=await(0,s.getJsonWithCredentials)("https://api.live.bilibili.com/xlive/web-ucenter/v1/sign/DoSign");if(0!==e.code)r.Toast.info(e.message,"直播间签到",3e3);else{const{text:t,specialText:n,allDays:i,hadSignDays:o}=e.data,s=`签到成功, 获得了${t} ${n}\n本月进度: ${o} / ${i}`;r.Toast.success(s,"直播间签到",3e3)}}}],[d]=(0,c.registerAndGetData)("checkInCenter.items",l);var u=function(e,t,n,i,o,s,r,a){var c,l="function"==typeof e?e.options:e;if(t&&(l.render=t,l.staticRenderFns=n,l._compiled=!0),i&&(l.functional=!0),s&&(l._scopeId="data-v-"+s),r?(c=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),o&&o.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(r)},l._ssrRegister=c):o&&(c=a?function(){o.call(this,(l.functional?this.parent:this).$root.$options.shadowRoot)}:o),c)if(l.functional){l._injectStyles=c;var d=l.render;l.render=function(e,t){return c.call(t),d(e,t)}}else{var u=l.beforeCreate;l.beforeCreate=u?[].concat(u,c):[c]}return{exports:e,options:l}}(Vue.extend({components:{DefaultWidget:o.DefaultWidget},data:()=>({items:d}),methods:{async runItemAction(e,t){try{this.$set(e,"disabled",!0);const n=this.$el.querySelector(`[data-name='${e.name}']`);await e.action(n,t)}finally{e.disabled=!1}}}}),i,[],!1,null,null,null);u.options.__file="registry/lib/components/utils/check-in-center/Widget.vue";var f=u.exports},109:function(e){e.exports=coreApis.utils}},t={};function n(i){var o=t[i];if(void 0!==o)return o.exports;var s=t[i]={exports:{}};return e[i](s,s.exports,n),s.exports}n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var i={};return function(){n.d(i,{component:function(){return t}});var e=n(109);const t={name:"checkInCenter",displayName:"签到助手",description:{"zh-CN":"在功能面板中提供一些可以每日进行的操作."},tags:[componentsTags.utils],entry:none,widget:{component:()=>Promise.resolve().then(n.bind(n,181)).then((e=>e.default)),condition:()=>Boolean((0,e.getUID)())}}}(),i=i.component}()}));
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1706c677"],{"00c1":function(t,e,i){"use strict";var s=i("c738"),n=i.n(s);n.a},"02f4":function(t,e,i){var s=i("4588"),n=i("be13");t.exports=function(t){return function(e,i){var a,r,o=String(n(e)),l=s(i),h=o.length;return l<0||l>=h?t?"":void 0:(a=o.charCodeAt(l),a<55296||a>56319||l+1===h||(r=o.charCodeAt(l+1))<56320||r>57343?t?o.charAt(l):a:t?o.slice(l,l+2):r-56320+(a-55296<<10)+65536)}}},"0390":function(t,e,i){"use strict";var s=i("02f4")(!0);t.exports=function(t,e,i){return e+(i?s(t,e).length:1)}},"0bfb":function(t,e,i){"use strict";var s=i("cb7c");t.exports=function(){var t=s(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},"11e9":function(t,e,i){var s=i("52a7"),n=i("4630"),a=i("6821"),r=i("6a99"),o=i("69a8"),l=i("c69a"),h=Object.getOwnPropertyDescriptor;e.f=i("9e1e")?h:function(t,e){if(t=a(t),e=r(e,!0),l)try{return h(t,e)}catch(i){}if(o(t,e))return n(!s.f.call(t,e),t[e])}},"214f":function(t,e,i){"use strict";i("b0c5");var s=i("2aba"),n=i("32e9"),a=i("79e5"),r=i("be13"),o=i("2b4c"),l=i("520a"),h=o("species"),c=!a((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")})),u=function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var i="ab".split(t);return 2===i.length&&"a"===i[0]&&"b"===i[1]}();t.exports=function(t,e,i){var f=o(t),d=!a((function(){var e={};return e[f]=function(){return 7},7!=""[t](e)})),p=d?!a((function(){var e=!1,i=/a/;return i.exec=function(){return e=!0,null},"split"===t&&(i.constructor={},i.constructor[h]=function(){return i}),i[f](""),!e})):void 0;if(!d||!p||"replace"===t&&!c||"split"===t&&!u){var m=/./[f],g=i(r,f,""[t],(function(t,e,i,s,n){return e.exec===l?d&&!n?{done:!0,value:m.call(e,i,s)}:{done:!0,value:t.call(i,e,s)}:{done:!1}})),v=g[0],b=g[1];s(String.prototype,t,v),n(RegExp.prototype,f,2==e?function(t,e){return b.call(t,this,e)}:function(t){return b.call(t,this)})}}},"28a5":function(t,e,i){"use strict";var s=i("aae3"),n=i("cb7c"),a=i("ebd6"),r=i("0390"),o=i("9def"),l=i("5f1b"),h=i("520a"),c=i("79e5"),u=Math.min,f=[].push,d="split",p="length",m="lastIndex",g=4294967295,v=!c((function(){RegExp(g,"y")}));i("214f")("split",2,(function(t,e,i,c){var b;return b="c"=="abbc"[d](/(b)*/)[1]||4!="test"[d](/(?:)/,-1)[p]||2!="ab"[d](/(?:ab)*/)[p]||4!="."[d](/(.?)(.?)/)[p]||"."[d](/()()/)[p]>1||""[d](/.?/)[p]?function(t,e){var n=String(this);if(void 0===t&&0===e)return[];if(!s(t))return i.call(n,t,e);var a,r,o,l=[],c=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),u=0,d=void 0===e?g:e>>>0,v=new RegExp(t.source,c+"g");while(a=h.call(v,n)){if(r=v[m],r>u&&(l.push(n.slice(u,a.index)),a[p]>1&&a.index<n[p]&&f.apply(l,a.slice(1)),o=a[0][p],u=r,l[p]>=d))break;v[m]===a.index&&v[m]++}return u===n[p]?!o&&v.test("")||l.push(""):l.push(n.slice(u)),l[p]>d?l.slice(0,d):l}:"0"[d](void 0,0)[p]?function(t,e){return void 0===t&&0===e?[]:i.call(this,t,e)}:i,[function(i,s){var n=t(this),a=void 0==i?void 0:i[e];return void 0!==a?a.call(i,n,s):b.call(String(n),i,s)},function(t,e){var s=c(b,t,this,e,b!==i);if(s.done)return s.value;var h=n(t),f=String(this),d=a(h,RegExp),p=h.unicode,m=(h.ignoreCase?"i":"")+(h.multiline?"m":"")+(h.unicode?"u":"")+(v?"y":"g"),x=new d(v?h:"^(?:"+h.source+")",m),w=void 0===e?g:e>>>0;if(0===w)return[];if(0===f.length)return null===l(x,f)?[f]:[];var y=0,C=0,_=[];while(C<f.length){x.lastIndex=v?C:0;var M,E=l(x,v?f:f.slice(C));if(null===E||(M=u(o(x.lastIndex+(v?0:C)),f.length))===y)C=r(f,C,p);else{if(_.push(f.slice(y,C)),_.length===w)return _;for(var X=1;X<=E.length-1;X++)if(_.push(E[X]),_.length===w)return _;C=y=M}}return _.push(f.slice(y)),_}]}))},"3b2b":function(t,e,i){var s=i("7726"),n=i("5dbc"),a=i("86cc").f,r=i("9093").f,o=i("aae3"),l=i("0bfb"),h=s.RegExp,c=h,u=h.prototype,f=/a/g,d=/a/g,p=new h(f)!==f;if(i("9e1e")&&(!p||i("79e5")((function(){return d[i("2b4c")("match")]=!1,h(f)!=f||h(d)==d||"/a/i"!=h(f,"i")})))){h=function(t,e){var i=this instanceof h,s=o(t),a=void 0===e;return!i&&s&&t.constructor===h&&a?t:n(p?new c(s&&!a?t.source:t,e):c((s=t instanceof h)?t.source:t,s&&a?l.call(t):e),i?this:u,h)};for(var m=function(t){t in h||a(h,t,{configurable:!0,get:function(){return c[t]},set:function(e){c[t]=e}})},g=r(c),v=0;g.length>v;)m(g[v++]);u.constructor=h,h.prototype=u,i("2aba")(s,"RegExp",h)}i("7a56")("RegExp")},"520a":function(t,e,i){"use strict";var s=i("0bfb"),n=RegExp.prototype.exec,a=String.prototype.replace,r=n,o="lastIndex",l=function(){var t=/a/,e=/b*/g;return n.call(t,"a"),n.call(e,"a"),0!==t[o]||0!==e[o]}(),h=void 0!==/()??/.exec("")[1],c=l||h;c&&(r=function(t){var e,i,r,c,u=this;return h&&(i=new RegExp("^"+u.source+"$(?!\\s)",s.call(u))),l&&(e=u[o]),r=n.call(u,t),l&&r&&(u[o]=u.global?r.index+r[0].length:e),h&&r&&r.length>1&&a.call(r[0],i,(function(){for(c=1;c<arguments.length-2;c++)void 0===arguments[c]&&(r[c]=void 0)})),r}),t.exports=r},"5dbc":function(t,e,i){var s=i("d3f4"),n=i("8b97").set;t.exports=function(t,e,i){var a,r=e.constructor;return r!==i&&"function"==typeof r&&(a=r.prototype)!==i.prototype&&s(a)&&n&&n(t,a),t}},"5f1b":function(t,e,i){"use strict";var s=i("23c6"),n=RegExp.prototype.exec;t.exports=function(t,e){var i=t.exec;if("function"===typeof i){var a=i.call(t,e);if("object"!==typeof a)throw new TypeError("RegExp exec method returned something other than an Object or null");return a}if("RegExp"!==s(t))throw new TypeError("RegExp#exec called on incompatible receiver");return n.call(t,e)}},"7abe":function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"view-home"},[i("el-container",{staticClass:"main-container",class:{"show-menu":t.showMenu}},[i("el-header",[i("el-row",{attrs:{type:"flex"}},[i("el-col",{staticClass:"layout-left",attrs:{size:"12"}}),i("el-col",{staticClass:"layout-right",attrs:{size:"12"}},[i("a",{attrs:{href:"/"}},[i("i",{staticClass:"fd-icon fd-icon-github"})])])],1)],1),i("el-container",{staticClass:"sub-container"},[i("el-aside",{attrs:{width:t.asideW+"px"}},[i("span",{staticClass:"menu-button"},[i("el-button",{attrs:{type:"type",size:"mini"},on:{click:function(e){t.showMenu=!0}}},[i("i",{staticClass:"fd-icon",class:t.showMenu?"fd-icon-wuxupailie":"fd-icon-zuoduiqi"})])],1),i("div",{staticClass:"menu-mask",on:{click:function(e){t.showMenu=!t.showMenu}}}),i("v-deformation",{staticClass:"deformation-el",attrs:{x:0,w:t.asideW,draggable:2,resizable:2,showHandler:!1,move:!0,size:"w",axis:"x",minw:t.minw,maxw:t.maxw},on:{resizing:t.onResizing}},[i("div",{staticClass:"scroll",staticStyle:{height:"100%"}},[i("el-menu",{staticClass:"el-menu-vertical-demo",style:"width: "+t.asideW+"px",attrs:{"text-color":"#555","text-color2":"#fff","background-color2":"#545c64","active-text-color2":"#ffd04b",collapse:t.isCollapse,"collapse-transition":!1,"default-active":t.defaultActive},on:{select:t.selectMenu}},[t._l(t.list,(function(e,s){return[e.children?i("el-submenu",{key:s,attrs:{index:String(s)}},[i("template",{slot:"title"},[e.icon?i("i",{class:e.icon}):t._e(),i("span",{staticClass:"menu-item-title"},[t._v("\n                "+t._s(e.label)+"\n              ")])]),i("el-menu-item-group",t._l(e.children,(function(e,n){return i("el-menu-item",{key:n,attrs:{route:e.path,index:s+"-"+n}},[i("span",{staticClass:"menu-item-title"},[t._v("\n                  "+t._s(e.label)+"\n                ")])])})),1)],2):i("el-menu-item",{key:s,attrs:{index:String(s),route:e.path}},[e.icon?i("i",{class:e.icon}):t._e(),i("span",{staticClass:"menu-item-title",attrs:{slot:"title"},slot:"title"},[t._v(t._s(e.label))])])]}))],2)],1)])],1),i("el-main",[i("div",{staticClass:"main-view"},[i("router-view")],1),i("div",{staticClass:"pagination",style:"left: "+t.asideW+"px"},[i("el-row",{attrs:{type:"flex"}},[i("el-col",{attrs:{span:12}},[i("div",{staticClass:"prev-link"},[t.prev.path?[i("div",{staticClass:"label"},[t._v("上一篇: ")]),i("router-link",{attrs:{to:t.prev.path}},[i("el-button",{attrs:{type:"text"}},[t._v(t._s(t.prev.label))])],1)]:i("div",{staticClass:"empty"},[t._v("\n                  已经是第一篇啦~~\n                ")])],2)]),i("el-col",{attrs:{span:12}},[i("div",{staticClass:"next-link"},[t.next.path?[i("div",{staticClass:"label"},[t._v("下一篇: ")]),t.next.path?i("router-link",{attrs:{to:t.next.path}},[i("el-button",{attrs:{type:"text"}},[t._v(t._s(t.next.label))])],1):t._e()]:i("div",{staticClass:"empty"},[t._v("\n                  已经到底啦~~\n                ")])],2)])],1)],1),i("el-footer",{style:"padding-left:"+t.asideW+"px"},[t._v("\n          Copyright ©2019 "),i("a",{staticClass:"link",attrs:{href:"//github.com/kscript",target:"_blank"}},[t._v("kscript")])])],1)],1)],1)],1)},n=[],a=(i("28a5"),i("ac6a"),function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{ref:"vdr",staticClass:"vdr",class:{draggable:t.draggable&&!t.disable,resizable:t.resizable&&!t.disable,active:t.active,dragging:t.dragging,resizing:t.resizing},style:t.style,attrs:{id:"vdr",tabindex:"0"},on:{click:t.elmClick,mousedown:t.elmDown}},[t.resizable&&!t.disable?[!0===t.resizable||1===t.resizable||2===t.resizable?i("div",{staticClass:"handle handle-ml",on:{mousedown:function(e){return e.stopPropagation(),e.preventDefault(),t.handleDown("ml")}}}):t._e(),!0===t.resizable||1===t.resizable||2===t.resizable?i("div",{staticClass:"handle handle-mr",on:{mousedown:function(e){return e.stopPropagation(),e.preventDefault(),t.handleDown("mr")}}}):t._e(),!0===t.resizable||1===t.resizable||3===t.resizable?i("div",{staticClass:"handle handle-tm",on:{mousedown:function(e){return e.stopPropagation(),e.preventDefault(),t.handleDown("tm")}}}):t._e(),!0===t.resizable||1===t.resizable||3===t.resizable?i("div",{staticClass:"handle handle-bm",on:{mousedown:function(e){return e.stopPropagation(),e.preventDefault(),t.handleDown("bm")}}}):t._e(),!0===t.resizable||1===t.resizable?i("div",{staticClass:"handle handle-br",on:{mousedown:function(e){return e.stopPropagation(),e.preventDefault(),t.handleDown("br")}}},[i("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 17 17"}},[i("defs"),i("g",{attrs:{id:"图层_2","data-name":"图层 2"}},[i("g",{attrs:{id:"图层_2-2","data-name":"图层 2"}},[i("rect",{staticClass:"cls-1",attrs:{x:"2.63",y:"-0.2",width:"1",height:"6.65",transform:"translate(-1.3 3.13) rotate(-45)"}}),i("path",{staticClass:"cls-1",attrs:{d:"M.5,5.78a.5.5,0,0,1-.5-.5V0H5.28a.5.5,0,0,1,.5.5.5.5,0,0,1-.5.5H1V5.28A.5.5,0,0,1,.5,5.78Z"}}),i("path",{staticClass:"cls-1",attrs:{d:"M16.3,5.78a.5.5,0,0,1-.5-.5V1H11.52a.5.5,0,0,1,0-1H16.8V5.28A.5.5,0,0,1,16.3,5.78Z"}}),i("path",{staticClass:"cls-1",attrs:{d:"M5.28,16.8H0V11.52a.5.5,0,0,1,1,0V15.8H5.28a.5.5,0,0,1,.5.5A.5.5,0,0,1,5.28,16.8Z"}}),i("path",{staticClass:"cls-1",attrs:{d:"M16.22,16.72a.52.52,0,0,1-.35-.14l-4.7-4.7a.5.5,0,0,1,.71-.71l4.7,4.7a.51.51,0,0,1,0,.71A.54.54,0,0,1,16.22,16.72Z"}}),i("path",{staticClass:"cls-1",attrs:{d:"M17,17H11.72a.5.5,0,1,1,0-1H16V11.72a.5.5,0,1,1,1,0Z"}})])])])]):t._e()]:t._e(),t._t("default")],2)}),r=[],o=(i("3b2b"),i("c5f6"),{replace:!0,name:"deformation",props:{draggable:{type:[Boolean,Number],default:!0},resizable:{type:[Boolean,Number],default:!0},w:{type:Number,default:200,validator:function(t){return"number"===typeof t&&t>0}},h:{type:Number,default:200,validator:function(t){return"number"===typeof t&&t>0}},minw:{type:Number,default:50,validator:function(t){return t>0}},maxw:{type:Number,default:200,validator:function(t){return t>0}},minh:{type:Number,default:50,validator:function(t){return t>0}},maxh:{type:Number,default:200,validator:function(t){return t>0}},x:{type:Number,default:0},y:{type:Number,default:0},zoom:{type:Number,default:1},grid:{type:Array,default:function(){return[1,1]}},restrain:{type:Number,default:0},parent:{type:Boolean,default:!1},disable:{type:Boolean,default:!1}},mounted:function(){this.$refs.vdr.click()},data:function(){return{handleMoved:!1,init:!1,top:this.y,left:this.x,width:this.w,height:this.h,resizing:!1,dragging:!1,active:!1,handle:null,parentX:0,parentW:9999,parentY:0,parentH:9999,mouseX:0,mouseY:0,lastMouseX:0,lastMouseY:0,mouseOffX:0,mouseOffY:0,elmX:0,elmY:0,elmW:0,elmH:0}},methods:{elmClick:function(t){this.init||(this.init=!0,this.elmDown(t))},elmDown:function(t){var e=this.passiveSupported;if(!this.disable&&this.draggable){var i=t.target||t.srcElement;this.$el.contains(i)&&(this.active||(this.lastMouseX=t.pageX||t.clientX+document.documentElement.scrollLeft,this.lastMouseY=t.pageY||t.clientY+document.documentElement.scrollTop,document.documentElement.addEventListener("mousemove",this.handleMove,!e||{passive:!0}),document.documentElement.addEventListener("mousedown",this.deselect,!e||{passive:!0}),document.documentElement.addEventListener("mouseup",this.handleUp,!e||{passive:!0}),this.active=!0,this.$emit("activated")),this.elmX=parseInt(this.left),this.elmY=parseInt(this.top),this.elmW=this.$el.offsetWidth||this.$el.clientWidth,this.elmH=this.$el.offsetHeight||this.$el.clientHeight,this.dragging=!0)}},deselect:function(t){},handleDown:function(t){this.handle=t,this.resizing=!0},handleMove:function(t){this.mouseX=t.pageX||t.clientX+document.documentElement.scrollLeft,this.mouseY=t.pageY||t.clientY+document.documentElement.scrollTop,this.handleMoved||(this.handleMoved=!0,this.lastMouseX=this.mouseX,this.lastMouseY=this.mouseY);var e=(this.mouseX-this.lastMouseX+this.mouseOffX)/this.zoom,i=(this.mouseY-this.lastMouseY+this.mouseOffY)/this.zoom;this.mouseOffX=this.mouseOffY=0,this.lastMouseX=this.mouseX,this.lastMouseY=this.mouseY;var s=e,n=i;this.resizing?(this.handle.indexOf("t")>=0&&(this.elmH-n<this.minh?this.mouseOffY=n-(i=this.elmH-this.minh):this.elmY+n<this.parentY&&(this.mouseOffY=n-(i=this.parentY-this.elmY)),this.elmY+=i,this.elmH-=i),this.handle.indexOf("b")>=0&&(this.elmH+n<this.minh?this.mouseOffY=n-(i=this.minh-this.elmH):this.elmY+this.elmH+n>this.parentH&&(this.mouseOffY=n-(i=this.parentH-this.elmY-this.elmH)),this.elmH+=i),this.handle.indexOf("l")>=0&&(this.elmW-s<this.minw?this.mouseOffX=s-(e=this.elmW-this.minw):this.elmX+s<this.parentX&&(this.mouseOffX=s-(e=this.parentX-this.elmX)),this.elmX+=e,this.elmW-=e),this.handle.indexOf("r")>=0&&(this.elmW+s<this.minw&&(this.mouseOffX=s-(e=this.minw-this.elmW)),this.elmX+this.elmW+s>this.parentW&&(this.mouseOffX=s-(e=this.parentW-this.elmX-this.elmW)),this.elmW+=e),this.left=Math.round(this.elmX/this.grid[0])*this.grid[0],this.top=Math.round(this.elmY/this.grid[1])*this.grid[1],this.width=Math.round(this.elmW/this.grid[0])*this.grid[0],this.height=Math.round(this.elmH/this.grid[1])*this.grid[1],this.$emit("resizing",this.left,this.top,this.width,this.height)):this.dragging&&(this.move&&(this.parent&&(this.elmX+s<this.parentX?this.mouseOffX=s-(e=this.parentX-this.elmX):this.elmX+this.elmW+s>this.parentW&&(this.mouseOffX=s-(e=this.parentW-this.elmX-this.elmW)),this.elmY+n<this.parentY?this.mouseOffY=n-(i=this.parentY-this.elmY):this.elmY+this.elmH+n>this.parentH&&(this.mouseOffY=n-(i=this.parentH-this.elmY-this.elmH))),this.elmX+=e,this.elmY+=i),2!==this.draggable&&1!==this.draggable&&!0!==this.draggable||(this.left=Math.round(this.elmX/this.grid[0])*this.grid[0]),3!==this.draggable&&1!==this.draggable&&!0!==this.draggable||(this.top=Math.round(this.elmY/this.grid[1])*this.grid[1]),this.$emit("dragging",this.left,this.top))},getRestrain:function(t){var e=this.restrain;return(t/e).toFixed(0)*e},handleUp:function(t){this.handle=null;var e=this.restrain;e&&e>0&&(this.left=this.getRestrain(this.left),this.top=this.getRestrain(this.top),this.width=this.getRestrain(this.width),this.height=this.getRestrain(this.height)),this.resizing&&(this.resizing=!1,this.$emit("resizestop",this.left,this.top,this.width,this.height)),this.dragging&&(this.dragging=!1,this.$emit("dragstop",[this.left,this.top])),this.elmX=this.left,this.elmY=this.top}},watch:{x:function(t){this.left=t},y:function(t){this.top=t},w:function(t){this.width=t},h:function(t){this.height=t}},computed:{style:function(){var t=0===this.width?"auto":this.width+"px",e=0===this.height?"auto":this.height+"px";return{top:this.top+"px",left:this.left+"px",width:t,height:e}}}}),l=o,h=(i("00c1"),i("2877")),c=Object(h["a"])(l,a,r,!1,null,"54021e2e",null),u=c.exports,f={data:function(){return{showMenu:!1,asideW:240,minw:160,maxw:300,isCollapse:!1,defaultActive:"0",timer:0,prev:{},next:{},list:[]}},watch:{$route:function(){this.defaultActive=this.getActive()}},computed:{},components:{"v-deformation":u},methods:{onResizing:function(t,e,i,s){var n=this;this.asideW=i,this.timer||(this.timer=setTimeout((function(){n.timer=0,n.$store.commit("asideW",n.asideW)}),150))},getList:function(){return this.$store.dispatch("routes")},selectMenu:function(t,e,i){var s=i.route;""!==s&&(this.showMenu&&(this.showMenu=!1),this.$router.push({path:s}))},getActive:function(){var t=this.$route.path,e=this.$route.hash.slice(1),i="",s={},n={};return this.list.forEach((function(a,r){if(!i||!n.path)if(a.children)a.children.forEach((function(a,o){if(i&&!n.path)n=a;else if(!i||!n.path){var l=a.path.split("#");i||l[0]!==t||l[1]&&l[1]!==e||(i=[r,o].join("-")),i||(s=a)}}));else if(i&&!n.path)n=a;else{var o=a.path.split("#");i||o[0]!==t||o[1]&&o[1]!==e||(i=""+r),i||(s=a)}})),this.prev=s,this.next=n,i},redirect:function(){"/"===this.$route.fullPath&&this.$router.push({path:"/viewer",hash:"#start"})}},created:function(){this.asideW=this.$store.getters.asideW},mounted:function(){var t=this;this.getList().then((function(e){t.list=e,t.defaultActive=t.getActive()||"0",t.redirect()}))}},d=f,p=(i("a2a7"),Object(h["a"])(d,s,n,!1,null,"6251ef26",null));e["default"]=p.exports},"8b97":function(t,e,i){var s=i("d3f4"),n=i("cb7c"),a=function(t,e){if(n(t),!s(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,s){try{s=i("9b43")(Function.call,i("11e9").f(Object.prototype,"__proto__").set,2),s(t,[]),e=!(t instanceof Array)}catch(n){e=!0}return function(t,i){return a(t,i),e?t.__proto__=i:s(t,i),t}}({},!1):void 0),check:a}},9093:function(t,e,i){var s=i("ce10"),n=i("e11e").concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return s(t,n)}},a2a7:function(t,e,i){"use strict";var s=i("baac"),n=i.n(s);n.a},aa77:function(t,e,i){var s=i("5ca1"),n=i("be13"),a=i("79e5"),r=i("fdef"),o="["+r+"]",l="​",h=RegExp("^"+o+o+"*"),c=RegExp(o+o+"*$"),u=function(t,e,i){var n={},o=a((function(){return!!r[t]()||l[t]()!=l})),h=n[t]=o?e(f):r[t];i&&(n[i]=h),s(s.P+s.F*o,"String",n)},f=u.trim=function(t,e){return t=String(n(t)),1&e&&(t=t.replace(h,"")),2&e&&(t=t.replace(c,"")),t};t.exports=u},aae3:function(t,e,i){var s=i("d3f4"),n=i("2d95"),a=i("2b4c")("match");t.exports=function(t){var e;return s(t)&&(void 0!==(e=t[a])?!!e:"RegExp"==n(t))}},ac6a:function(t,e,i){for(var s=i("cadf"),n=i("0d58"),a=i("2aba"),r=i("7726"),o=i("32e9"),l=i("84f2"),h=i("2b4c"),c=h("iterator"),u=h("toStringTag"),f=l.Array,d={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},p=n(d),m=0;m<p.length;m++){var g,v=p[m],b=d[v],x=r[v],w=x&&x.prototype;if(w&&(w[c]||o(w,c,f),w[u]||o(w,u,v),l[v]=f,b))for(g in s)w[g]||a(w,g,s[g],!0)}},b0c5:function(t,e,i){"use strict";var s=i("520a");i("5ca1")({target:"RegExp",proto:!0,forced:s!==/./.exec},{exec:s})},baac:function(t,e,i){},c5f6:function(t,e,i){"use strict";var s=i("7726"),n=i("69a8"),a=i("2d95"),r=i("5dbc"),o=i("6a99"),l=i("79e5"),h=i("9093").f,c=i("11e9").f,u=i("86cc").f,f=i("aa77").trim,d="Number",p=s[d],m=p,g=p.prototype,v=a(i("2aeb")(g))==d,b="trim"in String.prototype,x=function(t){var e=o(t,!1);if("string"==typeof e&&e.length>2){e=b?e.trim():f(e,3);var i,s,n,a=e.charCodeAt(0);if(43===a||45===a){if(i=e.charCodeAt(2),88===i||120===i)return NaN}else if(48===a){switch(e.charCodeAt(1)){case 66:case 98:s=2,n=49;break;case 79:case 111:s=8,n=55;break;default:return+e}for(var r,l=e.slice(2),h=0,c=l.length;h<c;h++)if(r=l.charCodeAt(h),r<48||r>n)return NaN;return parseInt(l,s)}}return+e};if(!p(" 0o1")||!p("0b1")||p("+0x1")){p=function(t){var e=arguments.length<1?0:t,i=this;return i instanceof p&&(v?l((function(){g.valueOf.call(i)})):a(i)!=d)?r(new m(x(e)),i,p):x(e)};for(var w,y=i("9e1e")?h(m):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),C=0;y.length>C;C++)n(m,w=y[C])&&!n(p,w)&&u(p,w,c(m,w));p.prototype=g,g.constructor=p,i("2aba")(s,d,p)}},c738:function(t,e,i){},fdef:function(t,e){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);
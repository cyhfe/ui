(self.webpackChunkrcl=self.webpackChunkrcl||[]).push([[81],{78007:function(e,s,t){"use strict";t.r(s),t.d(s,{default:function(){return it}});var c=t(27424),a=t.n(c),n=t(67294),i=t(861),u=t.n(i),l=t(42122),f=t.n(l),m=t(56690),P=t.n(m),I=t(89728),Z=t.n(I),S=t(38416),C=t.n(S),o=t(97292),L=t(30388),k=t(86856);function ut(){return"You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."}var B=3e3,N=0,w=(0,L.k)("Toast"),$=a()(w,2),K=$[0],U=$[1],F=function(){function r(p,d){P()(this,r),C()(this,"handler",void 0),C()(this,"delay",void 0),C()(this,"timerId",null),C()(this,"remaining",void 0),C()(this,"startTime",void 0),this.handler=p,this.delay=d,this.remaining=d}return Z()(r,[{key:"start",value:function(){this.startTime=Date.now(),this.timerId=setTimeout(this.handler,this.delay)}},{key:"pause",value:function(){!this.timerId||!this.startTime||(this.remaining=this.remaining-(Date.now()-this.startTime),clearTimeout(this.timerId),this.timerId=null)}},{key:"resume",value:function(){this.startTime=Date.now(),this.timerId=setTimeout(this.handler,this.remaining)}},{key:"clear",value:function(){this.timerId&&(clearTimeout(this.timerId),this.timerId=null)}}]),r}(),G={name:"1vtayg0",styles:"cursor:pointer;fill:#bfbfbf;transition:all 0.2s ease-in-out;:hover{width:12px;height:12px;fill:#434343;}"};function H(r){var p=r.type,d=p===void 0?"info":p,b=r.message,M=r.onExpire,g=r.duration,T=r.onRemove,v=r.autoClose,h=r.node,x=n.useRef(new F(M,g));n.useEffect(function(){return v&&x.current.start(),function(){v&&x.current.clear()}},[v]);var E=d==="success"?"#52c41a":d==="error"?"#ff4d4f":"#1677ff";return(0,o.tZ)("div",{css:(0,o.iv)("padding:14px;margin-bottom:12px;background-color:#ffffff;display:flex;justify-content:space-between;border-left:14px solid ",E,";border-radius:6px;box-shadow:0 1px 3px rgba(0, 0, 0, 0.12),0 1px 2px rgba(0, 0, 0, 0.12);transition:all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);:hover{box-shadow:0 4px 10px rgba(0, 0, 0, 0.2),0 5px 5px rgba(0, 0, 0, 0.17);}",""),onMouseEnter:function(){v&&x.current.pause()},onMouseLeave:function(){v&&x.current.resume()}},b&&b,h&&h,(0,o.tZ)("svg",{onClick:T,width:"10",height:"10",viewBox:"0 0 12 12",css:G},(0,o.tZ)("path",{d:"M7.17495 5.99999L10.7583 2.42499C10.9152 2.26807 11.0034 2.05524 11.0034 1.83333C11.0034 1.61141 10.9152 1.39858 10.7583 1.24166C10.6014 1.08474 10.3885 0.996582 10.1666 0.996582C9.9447 0.996582 9.73187 1.08474 9.57495 1.24166L5.99995 4.82499L2.42495 1.24166C2.26803 1.08474 2.0552 0.996582 1.83328 0.996582C1.61136 0.996582 1.39854 1.08474 1.24162 1.24166C1.0847 1.39858 0.996539 1.61141 0.996539 1.83333C0.996539 2.05524 1.0847 2.26807 1.24162 2.42499L4.82495 5.99999L1.24162 9.57499C1.16351 9.65246 1.10151 9.74463 1.05921 9.84618C1.0169 9.94773 0.995117 10.0566 0.995117 10.1667C0.995117 10.2767 1.0169 10.3856 1.05921 10.4871C1.10151 10.5887 1.16351 10.6809 1.24162 10.7583C1.31908 10.8364 1.41125 10.8984 1.5128 10.9407C1.61435 10.983 1.72327 11.0048 1.83328 11.0048C1.94329 11.0048 2.05221 10.983 2.15376 10.9407C2.25531 10.8984 2.34748 10.8364 2.42495 10.7583L5.99995 7.17499L9.57495 10.7583C9.65242 10.8364 9.74459 10.8984 9.84614 10.9407C9.94768 10.983 10.0566 11.0048 10.1666 11.0048C10.2766 11.0048 10.3855 10.983 10.4871 10.9407C10.5886 10.8984 10.6808 10.8364 10.7583 10.7583C10.8364 10.6809 10.8984 10.5887 10.9407 10.4871C10.983 10.3856 11.0048 10.2767 11.0048 10.1667C11.0048 10.0566 10.983 9.94773 10.9407 9.84618C10.8984 9.74463 10.8364 9.65246 10.7583 9.57499L7.17495 5.99999Z"})))}var z={name:"1e1hqiz",styles:"bottom:16px;left:50%;transform:translateX(-50%)"},Q={name:"deor4l",styles:"bottom:16px;right:16px"},X={name:"8umwg7",styles:"bottom:16px;left:16px"},Y={name:"mbckgr",styles:"top:16px;left:50%;transform:translateX(-50%)"},J={name:"gy4kt4",styles:"top:16px;right:16px"},V={name:"51xwui",styles:"top:16px;left:16px"},q={name:"1j246xk",styles:"position:fixed;width:200px;z-index:999"};function tt(){var r=U("ToastContainer"),p=r.queue,d=r.duration,b=r.remove,M=r.autoClose,g=r.position,T=q,v={"top-left":V,"top-right":J,"top-center":Y,"bottom-left":X,"bottom-right":Q,"bottom-center":z};return(0,o.tZ)(k.Z,{className:"toastContainer",css:[T,v[g],"",""]},p.map(function(h){var x=h.type,E=h.message,_=h.id,O=h.autoClose,A=O===void 0?M:O,D=h.node;return(0,o.tZ)(H,{type:x,key:_,message:E,duration:d,onExpire:function(){return b(_)},onRemove:function(){return b(_)},autoClose:A,node:D})}))}function et(r){var p=r.children,d=r.max,b=r.duration,M=b===void 0?B:b,g=r.autoClose,T=g===void 0?!1:g,v=r.position,h=v===void 0?"top-right":v,x=n.useState([]),E=a()(x,2),_=E[0],O=E[1],A=function(R){if(!(d&&_.length>=d)){var y=f()(f()({},R),{},{id:N++});O(function(W){return[].concat(u()(W),[y])})}},D=function(R){O(function(y){return u()(y.filter(function(W){return W.id!==R}))})};return(0,o.tZ)(K,{duration:M,enqueueToast:A,remove:D,queue:_,setQueue:O,autoClose:T,position:h},p,(0,o.tZ)(tt,null))}function lt(){return"You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."}function ot(){return(0,o.tZ)("div",null,"node")}var nt={name:"1wesxqa",styles:"display:flex;gap:12px"};function rt(){var r=U("Example"),p=r.enqueueToast;return(0,o.tZ)("div",{className:"Example",css:nt},(0,o.tZ)("button",{type:"button",onClick:function(){return p({type:"info",message:"info message"})}},"Add info toast"),(0,o.tZ)("button",{type:"button",onClick:function(){return p({type:"error",message:"error message"})}},"Add error toast"),(0,o.tZ)("button",{type:"button",onClick:function(){return p({type:"success",message:"success message"})}},"Add success toast"),(0,o.tZ)("button",{type:"button",onClick:function(){return p({type:"info",node:(0,o.tZ)(ot,null)})}},"Add info toast"))}var at={name:"v61ur4",styles:"display:flex;gap:18px;margin-bottom:20px"};function st(){var r=n.useState(!1),p=a()(r,2),d=p[0],b=p[1],M=n.useState(void 0),g=a()(M,2),T=g[0],v=g[1],h=n.useState(3e3),x=a()(h,2),E=x[0],_=x[1],O=n.useState("top-right"),A=a()(O,2),D=A[0],j=A[1];return(0,o.tZ)(et,{position:D,autoClose:d,duration:E,max:T===void 0?T:Number(T)},(0,o.tZ)("div",{css:at},(0,o.tZ)("div",null,(0,o.tZ)("label",{htmlFor:"autoClose"},"autoClose: "),(0,o.tZ)("input",{type:"checkbox",onChange:function(y){return b(y.target.checked)},id:"autoClose"})),(0,o.tZ)("div",null,(0,o.tZ)("label",{htmlFor:"duration"},"duration: "),(0,o.tZ)("input",{type:"number",defaultValue:E,onChange:function(y){return _(Number(y.target.value))},id:"duration"})),(0,o.tZ)("div",null,(0,o.tZ)("label",{htmlFor:"position"},"position: "),(0,o.tZ)("select",{name:"position",id:"position",value:D,onChange:function(y){return j(y.target.value)}},(0,o.tZ)("option",{value:"top-left"},"TOP-LEFT"),(0,o.tZ)("option",{value:"top-center"},"TOP-CENTER"),(0,o.tZ)("option",{value:"top-right"},"TOP-RIGHT"),(0,o.tZ)("option",{value:"bottom-left"},"BOTTOM-LEFT"),(0,o.tZ)("option",{value:"bottom-center"},"BOTTOM-CENTER"),(0,o.tZ)("option",{value:"bottom-right"},"BOTTOM-RIGHT"))),(0,o.tZ)("div",null,(0,o.tZ)("label",{htmlFor:"max"},"max: "),(0,o.tZ)("input",{type:"number",onChange:function(y){return v(y.target.value)}}))),(0,o.tZ)(rt,null))}var it=st},86856:function(e,s,t){"use strict";var c=t(10434),a=t.n(c),n=t(67294),i=t(73935),u=t(97292),l=n.forwardRef(function(m,P){var I=m.container,Z=I===void 0?window.document.body:I;return Z?i.createPortal((0,u.tZ)("div",a()({},m,{ref:P})),Z):null});s.Z=l},30388:function(e,s,t){"use strict";t.d(s,{k:function(){return l}});var c=t(70215),a=t.n(c),n=t(67294),i=t(97292),u=["children"];function l(f,m){var P=n.createContext(m);function I(S){var C=S.children,o=a()(S,u),L=Object.values(o),k=n.useMemo(function(){return o},L);return(0,i.tZ)(P.Provider,{value:k},C)}function Z(S){var C=n.useContext(P);if(C)return C;if(m)return m;throw Error("".concat(S," must be rendered inside of a ").concat(f," component."))}return P.displayName="".concat(f,"Context"),I.displayName="".concat(f,"Provider"),[I,Z]}},63405:function(e,s,t){var c=t(73897);function a(n){if(Array.isArray(n))return c(n)}e.exports=a,e.exports.__esModule=!0,e.exports.default=e.exports},56690:function(e){function s(t,c){if(!(t instanceof c))throw new TypeError("Cannot call a class as a function")}e.exports=s,e.exports.__esModule=!0,e.exports.default=e.exports},89728:function(e,s,t){var c=t(64062);function a(i,u){for(var l=0;l<u.length;l++){var f=u[l];f.enumerable=f.enumerable||!1,f.configurable=!0,"value"in f&&(f.writable=!0),Object.defineProperty(i,c(f.key),f)}}function n(i,u,l){return u&&a(i.prototype,u),l&&a(i,l),Object.defineProperty(i,"prototype",{writable:!1}),i}e.exports=n,e.exports.__esModule=!0,e.exports.default=e.exports},10434:function(e){function s(){return e.exports=s=Object.assign?Object.assign.bind():function(t){for(var c=1;c<arguments.length;c++){var a=arguments[c];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(t[n]=a[n])}return t},e.exports.__esModule=!0,e.exports.default=e.exports,s.apply(this,arguments)}e.exports=s,e.exports.__esModule=!0,e.exports.default=e.exports},79498:function(e){function s(t){if(typeof Symbol!="undefined"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}e.exports=s,e.exports.__esModule=!0,e.exports.default=e.exports},42281:function(e){function s(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}e.exports=s,e.exports.__esModule=!0,e.exports.default=e.exports},70215:function(e,s,t){var c=t(7071);function a(n,i){if(n==null)return{};var u=c(n,i),l,f;if(Object.getOwnPropertySymbols){var m=Object.getOwnPropertySymbols(n);for(f=0;f<m.length;f++)l=m[f],!(i.indexOf(l)>=0)&&Object.prototype.propertyIsEnumerable.call(n,l)&&(u[l]=n[l])}return u}e.exports=a,e.exports.__esModule=!0,e.exports.default=e.exports},7071:function(e){function s(t,c){if(t==null)return{};var a={},n=Object.keys(t),i,u;for(u=0;u<n.length;u++)i=n[u],!(c.indexOf(i)>=0)&&(a[i]=t[i]);return a}e.exports=s,e.exports.__esModule=!0,e.exports.default=e.exports},861:function(e,s,t){var c=t(63405),a=t(79498),n=t(86116),i=t(42281);function u(l){return c(l)||a(l)||n(l)||i()}e.exports=u,e.exports.__esModule=!0,e.exports.default=e.exports}}]);
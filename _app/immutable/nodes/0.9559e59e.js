import{s as D,r as I,f as p,a as $,g as m,h,d as c,c as w,j as f,u as O,i as b,v as y,w as V,x as q,y as z,z as C}from"../chunks/scheduler.fa283601.js";import{S as U,i as k,a as A,t as L}from"../chunks/index.471b2e2c.js";import{p as M}from"../chunks/stores.4f268b92.js";const P=!1,R=!1,J=Object.freeze(Object.defineProperty({__proto__:null,prerender:R,ssr:P},Symbol.toStringTag,{value:"Module"}));function T(o){let t,r,_,u,n,s,d,j,v,i;const g=o[2].default,a=I(g,o,o[1],null);return{c(){t=p("div"),r=p("div"),_=$(),u=p("div"),a&&a.c(),n=$(),s=p("audio"),d=p("source"),this.h()},l(e){t=m(e,"DIV",{class:!0});var l=h(t);r=m(l,"DIV",{class:!0}),h(r).forEach(c),_=w(l),u=m(l,"DIV",{class:!0});var E=h(u);a&&a.l(E),E.forEach(c),l.forEach(c),n=w(e),s=m(e,"AUDIO",{volume:!0});var S=h(s);d=m(S,"SOURCE",{src:!0,type:!0}),S.forEach(c),this.h()},h(){f(r,"class","w-full h-full image svelte-1db6jmd"),f(u,"class","content h-full w-full svelte-1db6jmd"),f(t,"class","flex justify-center background h-screen w-screen svelte-1db6jmd"),O(d.src,j="/assets/music/pondering.mp3")||f(d,"src",j),f(d,"type","audio/mpeg"),s.autoplay=!0,s.loop=!0,f(s,"volume","0.3"),s.muted=v=o[0].url.pathname.includes("game")},m(e,l){b(e,t,l),y(t,r),y(t,_),y(t,u),a&&a.m(u,null),b(e,n,l),b(e,s,l),y(s,d),i=!0},p(e,[l]){a&&a.p&&(!i||l&2)&&V(a,g,e,e[1],i?z(g,e[1],l,null):q(e[1]),null),(!i||l&1&&v!==(v=e[0].url.pathname.includes("game")))&&(s.muted=v)},i(e){i||(A(a,e),i=!0)},o(e){L(a,e),i=!1},d(e){e&&(c(t),c(n),c(s)),a&&a.d(e)}}}function B(o,t,r){let _;C(o,M,s=>r(0,_=s));let{$$slots:u={},$$scope:n}=t;return o.$$set=s=>{"$$scope"in s&&r(1,n=s.$$scope)},[_,n,u]}class K extends U{constructor(t){super(),k(this,t,B,T,D,{})}}export{K as component,J as universal};
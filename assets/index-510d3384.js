var S=Object.defineProperty;var I=(s,t,n)=>t in s?S(s,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):s[t]=n;var f=(s,t,n)=>(I(s,typeof t!="symbol"?t+"":t,n),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const d of i.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();const u=document.querySelector("canvas"),e=u==null?void 0:u.getContext("2d");let a,h;const y=.4,p=35;let m=[],l=[],w=[];const k=()=>"#"+Math.floor((Math.random()*.9+.1)*16777215).toString(16);class c{constructor(t,n){f(this,"x");f(this,"y");this.x=t,this.y=n}mag(){return Math.sqrt(this.x*this.x+this.y*this.y)}sub(t){return new c(this.x-t.x,this.y-t.y)}add(t){return new c(this.x+t.x,this.y+t.y)}mul(t){return new c(t*this.x,t*this.y)}normalize(){let t=this.mag();return new c(this.x/t,this.y/t)}withMag(t){const n=this.normalize();return new c(n.x*t,n.y*t)}dot(t){return this.x*t.x+this.y*t.y}}class L{constructor(t,n,r,o,i){f(this,"pos");f(this,"vel");f(this,"radius");f(this,"color");f(this,"name");this.pos=t,this.vel=n,this.radius=r,this.color=o,this.name=i}collide(t){if(t==this)return;if(t.pos.sub(this.pos).mag()-(this.radius+t.radius)<0){const o=this.vel.sub(t.vel),i=this.pos.sub(t.pos),d=i.dot(i),x=o.dot(i);this.vel=this.vel.sub(i.mul(x/d)),this.vel.mag()<3&&(this.vel=this.vel.withMag(3)),t.vel=t.vel.add(i.mul(x/d)),t.vel.mag()<3&&(t.vel=t.vel.withMag(3))}}move(){this.pos=this.pos.add(this.vel),this.pos.x<this.radius&&(this.pos.x=this.radius,this.vel.x=-this.vel.x),this.pos.x>a-this.radius&&(this.pos.x=a-this.radius,this.vel.x=-this.vel.x),this.pos.y<this.radius&&(this.pos.y=this.radius,this.vel.y=-this.vel.y),this.pos.y>h-this.radius&&(this.pos.y=h-this.radius,this.vel.y=-this.vel.y)}gone(){return new c(a/2,h/2).sub(this.pos).mag()-this.radius*2-5<0}render(t){e&&u&&(e.strokeStyle=this.color,e.lineWidth=5*t,e.beginPath(),e.arc(this.pos.x,this.pos.y,this.radius*t,y,Math.PI-y),e.stroke(),e.beginPath(),e.arc(this.pos.x,this.pos.y,this.radius*t,Math.PI+y,-y),e.stroke(),e.font=`bold ${20*t}px sans-serif`,e.textAlign="center",e.fillStyle=this.color,e.textBaseline="middle",e.fillText(this.name,this.pos.x,this.pos.y))}}const g=document.getElementById("players");g==null||g.addEventListener("input",function(s){m=s.target.value.split(","),m=m.map(n=>n.trim())});const v=document.getElementById("playButton");v==null||v.addEventListener("click",function(t){O()});function R(s){let t=0,n=0;for(;Math.abs(t)<=.1;)t=Math.random()-.5;for(;Math.abs(n)<=.1;)n=Math.random()-.5;return new c(t,n).withMag(s)}function q(s,t){let n=new c(s/2,t/2);const r=new c(s/2,t/2);for(;n.sub(r).mag()<2*p;)n=new c(Math.random()*s,Math.random()*t);return n}function A(s,t,n,r,o){if(e){e.save(),e.beginPath(),e.translate(s,t),e.moveTo(0,0-n);for(let i=0;i<r;i++)e.rotate(Math.PI/r),e.lineTo(0,0-n*o),e.rotate(Math.PI/r),e.lineTo(0,0-n);e.closePath(),e.fillStyle="rgba(255, 215, 0, 0.7)",e.fill(),e.restore()}}function E(s){for(let t=0;t<s;t++){const n=Math.random()*a,r=Math.random()*h,o=Math.random()*3,i=Math.random();w.push({x:n,y:r,r:o,alpha:i})}}function b(){if(e)for(const s of w)e.fillStyle=`rgba(255, 255, 255, ${.5*s.alpha})`,e.beginPath(),e.arc(s.x,s.y,s.r,0,2*Math.PI),e.fill()}function O(){if(!e||!u)return;window.addEventListener("resize",M),M(),l=[];const s=m.length;for(let t=0;t<s;t++)l.push(new L(q(a,h),R(5),p,k(),m[t]));w=[],E(70),window.requestAnimationFrame(P)}function P(){if(!e)return;let s=0;e.fillStyle="black",e.strokeStyle="black",e.fillRect(0,0,a,h),e.strokeRect(0,0,a,h),b();const t=a/2,n=h/2;let r=p;A(a/2,h/2,1.4*p,16,.65);for(let i=0;i<5;i++)e.fillStyle="rgba(255, 65, 0, 0.31)",e.beginPath(),e.arc(t,n,r,0,2*Math.PI),e.closePath(),e.fill(),r/=1.8;let o=l.filter(i=>!i.gone());l=l.length===1?l:o;for(let i=0;i<l.length;i++)for(let d=0;d<i;d++)l[i].collide(l[d]);for(let i=0;i<l.length;i++)l[i].move(),l[i].render(1);if(l.length<2){window.cancelAnimationFrame(s),e.fillStyle="black",e.strokeStyle="black",e.fillRect(0,0,a,h),e.strokeRect(0,0,a,h),b();let i=l[0];i.pos=new c(a/2,h/2),i.render(3),i.move()}else s=window.requestAnimationFrame(P)}function M(){if(!u||!e)return;const s=.75*window.innerWidth,t=.6*window.innerHeight;u.width=Math.floor(s*window.devicePixelRatio),u.height=Math.floor(t*window.devicePixelRatio),u.style.width=s+"px",u.style.height=t+"px",e.scale(window.devicePixelRatio,window.devicePixelRatio),a=s,h=t}
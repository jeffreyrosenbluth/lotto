var A=Object.defineProperty;var L=(s,t,n)=>t in s?A(s,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):s[t]=n;var f=(s,t,n)=>(L(s,typeof t!="symbol"?t+"":t,n),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const e of r)if(e.type==="childList")for(const d of e.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function n(r){const e={};return r.integrity&&(e.integrity=r.integrity),r.referrerPolicy&&(e.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?e.credentials="include":r.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function o(r){if(r.ep)return;r.ep=!0;const e=n(r);fetch(r.href,e)}})();const u=document.querySelector("canvas"),i=u==null?void 0:u.getContext("2d");let a,h,m,k=!1;const g=.4,v=35;let p=[],l=[],y=[],b=[];const R=()=>"#"+Math.floor((Math.random()*.9+.1)*16777215).toString(16);class c{constructor(t,n){f(this,"x");f(this,"y");this.x=t,this.y=n}mag(){return Math.sqrt(this.x*this.x+this.y*this.y)}sub(t){return new c(this.x-t.x,this.y-t.y)}add(t){return new c(this.x+t.x,this.y+t.y)}mul(t){return new c(t*this.x,t*this.y)}normalize(){let t=this.mag();return new c(this.x/t,this.y/t)}withMag(t){const n=this.normalize();return new c(n.x*t,n.y*t)}dot(t){return this.x*t.x+this.y*t.y}}class E{constructor(t,n,o,r,e){f(this,"pos");f(this,"vel");f(this,"radius");f(this,"color");f(this,"name");this.pos=t,this.vel=n,this.radius=o,this.color=r,this.name=e}collide(t){if(t==this)return;if(t.pos.sub(this.pos).mag()-(this.radius+t.radius)<0){const r=this.vel.sub(t.vel),e=this.pos.sub(t.pos),d=e.dot(e),P=r.dot(e);this.vel=this.vel.sub(e.mul(P/d)),this.vel.mag()<3&&(this.vel=this.vel.withMag(3)),t.vel=t.vel.add(e.mul(P/d)),t.vel.mag()<3&&(t.vel=t.vel.withMag(3))}}move(){this.pos=this.pos.add(this.vel),this.pos.x<this.radius&&(this.pos.x=this.radius,this.vel.x=-this.vel.x),this.pos.x>a-this.radius&&(this.pos.x=a-this.radius,this.vel.x=-this.vel.x),this.pos.y<this.radius&&(this.pos.y=this.radius,this.vel.y=-this.vel.y),this.pos.y>h-this.radius&&(this.pos.y=h-this.radius,this.vel.y=-this.vel.y)}gone(){return new c(a/2,h/2).sub(this.pos).mag()-this.radius*2-5<0}render(t){i&&u&&(i.strokeStyle=this.color,i.lineWidth=5*t*m,i.beginPath(),i.arc(this.pos.x,this.pos.y,this.radius*t*m,g,Math.PI-g),i.stroke(),i.beginPath(),i.arc(this.pos.x,this.pos.y,this.radius*t*m,Math.PI+g,-g),i.stroke(),i.font=`bold ${20*t*m}px sans-serif`,i.textAlign="center",i.fillStyle=this.color,i.textBaseline="middle",i.fillText(this.name,this.pos.x,this.pos.y))}}const w=document.getElementById("players");w==null||w.addEventListener("input",function(s){p=s.target.value.split(","),p=p.map(n=>n.trim())});const x=document.getElementById("playButton");x==null||x.addEventListener("click",function(t){k=!0,requestAnimationFrame(q)});function F(s){let t=0,n=0;for(;Math.abs(t)<=.1;)t=Math.random()-.5;for(;Math.abs(n)<=.1;)n=Math.random()-.5;return new c(t,n).withMag(s)}function O(s,t){let n=new c(s/2,t/2);const o=new c(s/2,t/2);for(;n.sub(o).mag()<2*v;)n=new c(Math.random()*s,Math.random()*t);return n}function B(s,t,n,o,r){if(i){i.save(),i.beginPath(),i.translate(s,t),i.moveTo(0,0-n);for(let e=0;e<o;e++)i.rotate(Math.PI/o),i.lineTo(0,0-n*r),i.rotate(Math.PI/o),i.lineTo(0,0-n);i.closePath(),i.fillStyle="rgba(255, 215, 0, 0.7)",i.fill(),i.restore()}}function C(s){for(let t=0;t<s;t++){const n=Math.random()*a,o=Math.random()*h,r=Math.random()*3,e=Math.random();b.push({x:n,y:o,r,alpha:e})}}function S(){if(i)for(const s of b)i.fillStyle=`rgba(255, 255, 255, ${.5*s.alpha})`,i.beginPath(),i.arc(s.x,s.y,s.r*m,0,2*Math.PI),i.fill()}function q(){if(!i||!u)return;window.addEventListener("resize",I),I(),l=[];const s=p.length;for(let t=0;t<s;t++)l.push(new E(O(a,h),F(5),v,R(),p[t]));b=[],C(70),window.requestAnimationFrame(M)}function M(){if(!i)return;let s=0;i.fillStyle="black",i.strokeStyle="black",i.fillRect(0,0,a,h),i.strokeRect(0,0,a,h),S();const t=a/2,n=h/2;let o=v;B(a/2,h/2,1.4*v*m,16,.65);for(let e=0;e<5;e++)i.fillStyle="rgba(255, 65, 0, 0.31)",i.beginPath(),i.arc(t,n,o*m,0,2*Math.PI),i.closePath(),i.fill(),o/=1.8;if(!k)return;let r=l.filter(e=>!e.gone());y=y.concat(l.filter(e=>e.gone())),l=l.length===1?l:r;for(let e=0;e<l.length;e++)for(let d=0;d<e;d++)l[e].collide(l[d]);for(let e=0;e<l.length;e++)l[e].move(),l[e].render(1);if(l.length<2&&y.length===0){window.cancelAnimationFrame(s),i.fillStyle="black",i.strokeStyle="black",i.fillRect(0,0,a,h),i.strokeRect(0,0,a,h),S();let e=l[0];e.pos=new c(a/2,h/4),e.render(3),e.move()}else y.forEach(e=>{e.radius/=1.05,e.vel=e.vel.mul(.95),e.move(),e.render(1),e.name=""}),y=y.filter(e=>e.radius>5),s=window.requestAnimationFrame(M)}function I(){if(!u||!i)return;const s=.75*window.innerWidth,t=.6*window.innerHeight;u.width=Math.floor(s*window.devicePixelRatio),u.height=Math.floor(t*window.devicePixelRatio),u.style.width=s+"px",u.style.height=t+"px",i.scale(window.devicePixelRatio,window.devicePixelRatio),a=s,h=t,m=Math.max(a,h)/1e3,requestAnimationFrame(M)}q();

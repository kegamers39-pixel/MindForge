(function(){
function R(a,b){return Math.floor(Math.random()*(b-a+1))+a}
function sh(a){return a.slice().sort(function(){return Math.random()-.5})}
function four(ans,sp){var o=[ans],t=0,w,k=1;
 while(o.length<4&&t<200){t++;w=ans+R(-sp,sp);if(w>0&&o.indexOf(w)<0)o.push(w)}
 while(o.length<4){if(o.indexOf(ans+k)<0)o.push(ans+k);k++}
 return o}
var AL="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var EM=["⭐","🔴","🟦","🔺","💚"];

// 1. Count Shapes
GAMES.push({type:"observe",name:"Count Shapes",make:function(d){
 var dd=Math.floor(d),n=Math.min(10+dd,36),k=Math.min(2+Math.floor(dd/10),5),kinds=sh(EM).slice(0,k),t=kinds[0],c=R(2,Math.max(3,Math.floor(n/3))),a=[],i;
 for(i=0;i<c;i++)a.push(t);
 while(a.length<n)a.push(kinds[R(1,k-1)]);
 return{text:sh(a).join(" ")+"<br>Kitne "+t+" hain?",opts:four(c,2),ans:c}}});

// 2. Find Different
GAMES.push({type:"observe",name:"Find Different",make:function(d){
 var dd=Math.floor(d),n=Math.min(6+Math.floor(dd/5),14),
 P=dd<10?[["🐶","🐱"],["🍎","🍌"],["⭐","🌙"]]:[["😀","😃"],["🔶","🔸"],["🟥","🟧"],["🌑","🌚"]],
 pr=P[R(0,P.length-1)],sw=R(0,1),a=[],i,p=R(1,n);
 for(i=1;i<=n;i++)a.push(i==p?pr[1-sw]:pr[sw]);
 var o=[p],w;while(o.length<4){w=R(1,n);if(o.indexOf(w)<0)o.push(w)}
 return{text:a.join(" ")+"<br>Alag emoji left se kitne number par hai?",opts:o,ans:p}}});

// 3. Count Letter
GAMES.push({type:"observe",name:"Count Letter",make:function(d){
 var dd=Math.floor(d),n=Math.min(15+dd*2,60),al=sh(AL.split("")).slice(0,Math.min(4+Math.floor(dd/8),8)),t=al[0],a=[],i,c=0;
 for(i=0;i<n;i++)a.push(al[R(0,al.length-1)]);
 a[R(0,n-1)]=t;
 for(i=0;i<n;i++)if(a[i]==t)c++;
 return{text:a.join(" ")+"<br>Letter "+t+" kitni baar aaya?",opts:four(c,2),ans:c}}});

// 4. Gum Number
GAMES.push({type:"observe",name:"Gum Number",make:function(d){
 var dd=Math.floor(d),n=Math.min(8+Math.floor(dd/3),30),m=R(1,n),a=[],i,o=[m],w;
 for(i=1;i<=n;i++)if(i!=m)a.push(i);
 while(o.length<4){w=R(1,n);if(o.indexOf(w)<0)o.push(w)}
 return{text:sh(a).join(", ")+"<br>1 se "+n+" tak ek number gum hai. Kaun sa?",opts:o,ans:m}}});

// 5. Repeated Number
GAMES.push({type:"observe",name:"Repeated Number",make:function(d){
 var dd=Math.floor(d),n=Math.min(6+Math.floor(dd/4),18),a=[],x;
 while(a.length<n){x=R(10,99);if(a.indexOf(x)<0)a.push(x)}
 var dup=a[R(0,n-1)];a.push(dup);a=sh(a);
 var o=[dup];sh(a).forEach(function(v){if(o.length<4&&o.indexOf(v)<0)o.push(v)});
 return{text:a.join(", ")+"<br>Kaun sa number do baar aaya?",opts:o,ans:dup}}});

// 6. Pair Match
GAMES.push({type:"observe",name:"Pair Match",make:function(d){
 var dd=Math.floor(d),n=Math.min(6+Math.floor(dd/3),20),c=R(1,Math.min(3+Math.floor(dd/8),6)),A=[],B,i,pos=[];
 for(i=0;i<n;i++)A.push(R(0,9));
 B=A.slice();
 while(pos.length<c){i=R(0,n-1);if(pos.indexOf(i)<0)pos.push(i)}
 pos.forEach(function(p){B[p]=(A[p]+R(1,9))%10});
 return{text:A.join(" ")+"<br>"+B.join(" ")+"<br>Dono line me kitni jagah alag hai?",opts:four(c,2),ans:c}}});

// 7. Most Emoji
GAMES.push({type:"observe",name:"Most Emoji",make:function(d){
 var dd=Math.floor(d),K=sh(["🍎","🍌","🍇","🍊","🍓","🥝"]).slice(0,4),b=Math.min(4+Math.floor(dd/4),12),
 cn=[R(2,b),R(2,b),R(2,b)],mx=Math.max.apply(null,cn),a=[],i,j;
 cn.unshift(mx+(dd<10?R(2,4):1));
 for(i=0;i<4;i++)for(j=0;j<cn[i];j++)a.push(K[i]);
 return{text:sh(a).join(" ")+"<br>Sabse zyada kaun sa hai?",opts:K,ans:K[0]}}});

// 8. Count Digit
GAMES.push({type:"observe",name:"Count Digit",make:function(d){
 var dd=Math.floor(d),m=Math.min(5+Math.floor(dd/4),14),t=R(1,9),a=[],i,c=0;
 for(i=0;i<m;i++)a.push(R(100,dd<15?499:9999));
 a[0]=Number(""+t+R(10,99));
 a.forEach(function(v){String(v).split("").forEach(function(ch){if(ch==String(t))c++})});
 return{text:a.join(", ")+"<br>Digit "+t+" total kitni baar aaya?",opts:four(c,2),ans:c}}});

// 9. Ulta Seedha
GAMES.push({type:"observe",name:"Ulta Seedha",make:function(d){
 var dd=Math.floor(d),L=dd<10?3:dd<30?4:5,m=Math.min(6+Math.floor(dd/6),14),c=R(1,Math.min(2+Math.floor(dd/10),5)),a=[],i,s;
 function pal(){var h=[],k;for(k=0;k<Math.ceil(L/2);k++)h.push(R(k?0:1,9));
  var r=h.slice(0,Math.floor(L/2)).reverse();return h.concat(r).join("")}
 function isp(x){return x==x.split("").reverse().join("")}
 for(i=0;i<c;i++)a.push(pal());
 while(a.length<m){s=""+R(Math.pow(10,L-1),Math.pow(10,L)-1);if(!isp(s))a.push(s)}
 return{text:sh(a).join(", ")+"<br>Kitne numbers ulte-seedhe same hain?",opts:four(c,2),ans:c}}});

// 10. Out Of Order
GAMES.push({type:"observe",name:"Out Of Order",make:function(d){
 var dd=Math.floor(d),n=Math.min(6+Math.floor(dd/5),14),a=[R(10,30)],i,p=R(1,n-2);
 for(i=1;i<n;i++)a.push(a[i-1]+R(2,9));
 a[p]=a[n-1]+R(5,20);
 var w=a[p],o=[w];
 sh(a).forEach(function(v){if(o.length<4&&o.indexOf(v)<0)o.push(v)});
 return{text:a.join(", ")+"<br>Kaun sa number apni jagah galat hai?",opts:o,ans:w}}});
})();

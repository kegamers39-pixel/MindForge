(function(){
function R(a,b){return Math.floor(Math.random()*(b-a+1))+a}
function sh(a){return a.slice().sort(function(){return Math.random()-.5})}
function four(ans,sp){var o=[ans],t=0,w,k=1;
 while(o.length<4&&t<200){t++;w=ans+R(-sp,sp);if(w>0&&o.indexOf(w)<0)o.push(w)}
 while(o.length<4){if(o.indexOf(ans+k)<0)o.push(ans+k);k++}
 return o}
function distinct(n,lo,hi){var a=[],x;while(a.length<n){x=R(lo,hi);if(a.indexOf(x)<0)a.push(x)}return a}

// 1. Quick Add
GAMES.push({type:"speed",name:"Quick Add",make:function(d){
 var dd=Math.floor(d),m=20+dd*3,a=R(5,m),b=R(5,m),ans=a+b;
 return{text:a+" + "+b+" = ?",opts:four(ans,10),ans:ans}}});

// 2. Quick Subtract
GAMES.push({type:"speed",name:"Quick Subtract",make:function(d){
 var dd=Math.floor(d),b=R(3,20+dd*2),a=b+R(3,20+dd*2),ans=a-b;
 return{text:a+" - "+b+" = ?",opts:four(ans,8),ans:ans}}});

// 3. Quick Multiply
GAMES.push({type:"speed",name:"Quick Multiply",make:function(d){
 var dd=Math.floor(d),a=R(2,6+Math.floor(dd/3)),b=R(2,9+Math.floor(dd/2)),ans=a*b;
 return{text:a+" x "+b+" = ?",opts:four(ans,Math.max(4,a)),ans:ans}}});

// 4. Bada Number
GAMES.push({type:"speed",name:"Bada Number",make:function(d){
 var dd=Math.floor(d),a=distinct(4,10,60+dd*5),ans=Math.max.apply(null,a);
 return{text:"Sabse bada kaun sa?",opts:a,ans:ans}}});

// 5. Chhota Number
GAMES.push({type:"speed",name:"Chhota Number",make:function(d){
 var dd=Math.floor(d),a=distinct(4,10,60+dd*5),ans=Math.min.apply(null,a);
 return{text:"Sabse chhota kaun sa?",opts:a,ans:ans}}});

// 6. Quick Compare
GAMES.push({type:"speed",name:"Quick Compare",make:function(d){
 var dd=Math.floor(d),m=15+dd*2,a=R(5,m),b=R(5,m),c=R(5,m),e=R(5,m),s;
 if(R(0,2)==0){e=a+b-c;if(e<1){c=R(5,m);e=a+b-c;if(e<1){e=R(5,m);c=R(5,m)}}}
 var l=a+b,r=c+e,ans=l>r?"A bada":l<r?"B bada":"Barabar";
 return{text:"A: "+a+" + "+b+"<br>B: "+c+" + "+e,opts:["A bada","B bada","Barabar"],ans:ans}}});

// 7. Fast Divide
GAMES.push({type:"speed",name:"Fast Divide",make:function(d){
 var dd=Math.floor(d),b=R(2,5+Math.floor(dd/4)),q=R(2,9+dd),a=b*q;
 return{text:a+" / "+b+" = ?",opts:four(q,3),ans:q}}});

// 8. Fast Square
GAMES.push({type:"speed",name:"Fast Square",make:function(d){
 var dd=Math.floor(d),n=R(2,Math.min(9+Math.floor(dd/3),30)),ans=n*n;
 return{text:n+"&sup2; = ?",opts:four(ans,n),ans:ans}}});

// 9. Double Half
GAMES.push({type:"speed",name:"Double Half",make:function(d){
 var dd=Math.floor(d),x=R(5,20+dd*5)*2,dbl=R(0,1)==1,ans=dbl?x*2:x/2;
 return{text:(dbl?"Double":"Aadha")+" of "+x+" = ?",opts:four(ans,6),ans:ans}}});

// 10. Nearest 10
GAMES.push({type:"speed",name:"Nearest 10",make:function(d){
 var dd=Math.floor(d),n=R(11,99+dd*10);
 if(n%10==5)n++;
 var ans=Math.round(n/10)*10,o=[ans,ans+10,ans+20,ans>=20?ans-10:ans+30];
 return{text:n+" ko nearest 10 me round karo",opts:o,ans:ans}}});
})();

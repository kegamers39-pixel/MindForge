(function(){
function R(a,b){return Math.floor(Math.random()*(b-a+1))+a}
function sh(a){return a.slice().sort(function(){return Math.random()-.5})}
function four(ans,sp){var o=[ans],t=0,w,k=1;
 while(o.length<4&&t<200){t++;w=ans+R(-sp,sp);if(w>0&&o.indexOf(w)<0)o.push(w)}
 while(o.length<4){if(o.indexOf(ans+k)<0)o.push(ans+k);k++}
 return o}

// 1. Reverse Math
GAMES.push({type:"deep",name:"Reverse Math",make:function(d){
 var dd=Math.floor(d),x=R(2,10+dd),a=R(2,5+Math.floor(dd/5)),b=R(1,10+dd),c=R(2,4),t,r;
 if(dd<15){r=x*a+b;t="Ek number ko "+a+" se multiply karke "+b+" joda, to "+r+" aaya."}
 else{r=(x*a+b)*c;t="Ek number ko "+a+" se multiply karke "+b+" joda, phir "+c+" se multiply kiya, to "+r+" aaya."}
 return{text:t+"<br>Number kya tha?",opts:four(x,4),ans:x}}});

// 2. Age Puzzle
GAMES.push({type:"deep",name:"Age Puzzle",make:function(d){
 var dd=Math.floor(d),y=R(5,20+dd),k=R(2,15),S=2*y+k;
 return{text:"Raju Mohan se "+k+" saal bada hai. Dono ki umar ka jod "+S+" hai.<br>Mohan ki umar kitni hai?",opts:four(y,4),ans:y}}});

// 3. Line Count
GAMES.push({type:"deep",name:"Line Count",make:function(d){
 var dd=Math.floor(d),p=R(2,10+dd),q=R(2,10+dd),n=p+q-1;
 return{text:"Line me Ravi aage se "+p+"th aur peeche se "+q+"th hai.<br>Line me kul kitne log hain?",opts:four(n,4),ans:n}}});

// 4. Machine Time
GAMES.push({type:"deep",name:"Machine Time",make:function(d){
 var dd=Math.floor(d),r=R(1,5),a=R(2,6+Math.floor(dd/5)),b=R(2,8),e=R(2,8+Math.floor(dd/5)),t=R(2,9),c=r*a*b,f=r*e*t;
 return{text:a+" machine "+b+" minute me "+c+" cheez banati hain.<br>"+e+" machine "+f+" cheez kitne minute me banayengi?",opts:four(t,3),ans:t}}});

// 5. Two Numbers
GAMES.push({type:"deep",name:"Two Numbers",make:function(d){
 var dd=Math.floor(d),y=R(2,20+dd*2),x=y+R(1,15+dd);
 return{text:"Do numbers ka jod "+(x+y)+" aur antar "+(x-y)+" hai.<br>Bada number kaun sa hai?",opts:four(x,5),ans:x}}});

// 6. Percent Chain
GAMES.push({type:"deep",name:"Percent Chain",make:function(d){
 var dd=Math.floor(d),k=R(1,5+Math.floor(dd/5)),P=k*100,a=10*R(1,5),b=10*R(1,5),ans=k*(100+a)*(100-b)/100;
 return{text:"Ek cheez ka daam "+P+" hai. Pehle "+a+"% badha, phir "+b+"% ghata.<br>Ab daam kitna hai?",opts:four(ans,Math.max(10,Math.round(ans/10))),ans:ans}}});

// 7. Digit Riddle
GAMES.push({type:"deep",name:"Digit Riddle",make:function(d){
 var t=R(2,9),u=R(0,t-1),ans=10*t+u,o=[ans],w;
 if(u>0)o.push(10*u+t);
 while(o.length<4){w=R(10,99);if(o.indexOf(w)<0)o.push(w)}
 return{text:"Do digit ka number hai. Digits ka jod "+(t+u)+" aur antar "+(t-u)+" hai. Pehla digit bada hai.<br>Number kya hai?",opts:o,ans:ans}}});

// 8. Day Jump
GAMES.push({type:"deep",name:"Day Jump",make:function(d){
 var dd=Math.floor(d),D=["Somvar","Mangalvar","Budhvar","Guruvar","Shukravar","Shanivar","Ravivar"],i=R(0,6),N=R(2,10+dd*5),ans=D[(i+N)%7];
 var o=sh(D.filter(function(x){return x!=ans})).slice(0,3).concat([ans]);
 return{text:"Aaj "+D[i]+" hai.<br>"+N+" din baad kaun sa din hoga?",opts:o,ans:ans}}});

// 9. Handshake
GAMES.push({type:"deep",name:"Handshake",make:function(d){
 var dd=Math.floor(d),n=R(3,Math.min(6+Math.floor(dd/3),30)),ans=n*(n-1)/2;
 return{text:n+" log hain. Har koi baaki sabse ek baar haath milata hai.<br>Kul kitne handshake hue?",opts:four(ans,Math.max(3,n)),ans:ans}}});

// 10. Keeda Kuan
GAMES.push({type:"deep",name:"Keeda Kuan",make:function(d){
 var dd=Math.floor(d),u=R(3,8),v=R(1,u-1),net=u-v,n=R(3,Math.min(6+Math.floor(dd/3),20)),h=net*(n-1)+u-R(0,net-1);
 return{text:"Ek keeda "+h+" meter gehre kuen me hai. Din me "+u+" meter chadhta hai, raat ko "+v+" meter phisalta hai.<br>Kitne din me bahar niklega?",opts:four(n,2),ans:n}}});
})();

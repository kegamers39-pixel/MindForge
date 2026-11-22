(function(){
function R(a,b){return Math.floor(Math.random()*(b-a+1))+a}
function sh(a){return a.slice().sort(function(){return Math.random()-.5})}
function four(ans,sp){var o=[ans],t=0,w,k=1;
 while(o.length<4&&t<200){t++;w=ans+R(-sp,sp);if(w>0&&o.indexOf(w)<0)o.push(w)}
 while(o.length<4){if(o.indexOf(ans+k)<0)o.push(ans+k);k++}
 return o}
var AL="ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// 1. Pattern Guess
GAMES.push({type:"logic",name:"Pattern Guess",make:function(d){
 var dd=Math.floor(d),t=dd<=10?0:dd<=30?R(0,2):R(0,4),a=R(1,9),st=R(2,3+Math.min(dd,12)),s=[],i;
 if(t==0)for(i=0;i<6;i++)s.push(a+st*i);
 else if(t==1)for(i=0;i<6;i++)s.push((a%5+1)*Math.pow(2,i));
 else if(t==2)for(i=0;i<6;i++)s.push((i+a)*(i+a));
 else if(t==3){s=[a,R(1,9)];for(i=2;i<6;i++)s.push(s[i-1]+s[i-2])}
 else{var e=R(1,st-1);s=[a];for(i=1;i<6;i++)s.push(s[i-1]+(i%2?st:-e))}
 return{text:s.slice(0,5).join(", ")+", ?",opts:four(s[5],8),ans:s[5]}}});

// 2. Odd One Out
GAMES.push({type:"logic",name:"Odd One Out",make:function(d){
 var dd=Math.floor(d),k=R(2,Math.min(3+Math.floor(dd/8),9)),m=R(5,8+dd),o=[],x,odd;
 while(o.length<4){x=k*R(1,m);if(o.indexOf(x)<0)o.push(x)}
 do{odd=R(k,k*m)}while(odd%k==0||o.indexOf(odd)>=0);
 o.push(odd);
 return{text:"Ek number baaki se alag hai. Kaun sa?",opts:o,ans:odd}}});

// 3. Missing Number
GAMES.push({type:"logic",name:"Missing Number",make:function(d){
 var dd=Math.floor(d),x=R(2,10+dd*2),a=R(2,9+dd),c=R(2,5),t=dd<=10?0:dd<=30?R(0,2):R(0,3),txt;
 if(t==0)txt="? + "+a+" = "+(x+a);
 else if(t==1)txt="? x "+a+" = "+(x*a);
 else if(t==2)txt="? x "+c+" + "+a+" = "+(x*c+a);
 else txt="(? + "+a+") x "+c+" = "+((x+a)*c);
 return{text:txt,opts:four(x,5),ans:x}}});

// 4. Next Letter
GAMES.push({type:"logic",name:"Next Letter",make:function(d){
 var dd=Math.floor(d),st=R(1,Math.min(2+Math.floor(dd/6),12)),s=R(0,25),a=[],i,o,w,ans;
 for(i=0;i<5;i++)a.push(AL[(s+st*i)%26]);
 ans=a[4];o=[ans];
 while(o.length<4){w=AL[R(0,25)];if(o.indexOf(w)<0)o.push(w)}
 return{text:a.slice(0,4).join(", ")+", ?",opts:o,ans:ans}}});

// 5. Who Is Biggest
GAMES.push({type:"logic",name:"Who Is Biggest",make:function(d){
 var dd=Math.floor(d),n=Math.min(4+Math.floor(dd/25),6),L=sh("ABCDEF".slice(0,n).split("")),st=[],i;
 for(i=0;i<n-1;i++)st.push(L[i]+" &gt; "+L[i+1]);
 var small=dd>5&&R(0,1)==1,ans=small?L[n-1]:L[0],o=[ans];
 sh(L).forEach(function(x){if(o.length<4&&o.indexOf(x)<0)o.push(x)});
 return{text:sh(st).join(" , ")+"<br>"+(small?"Sabse chhota kaun?":"Sabse bada kaun?"),opts:o,ans:ans}}});

// 6. Sahi Ya Galat
GAMES.push({type:"logic",name:"Sahi Ya Galat",make:function(d){
 var dd=Math.floor(d),a=R(2,9+dd),b=R(2,9),c=R(1,20+dd),r=a*b+c,ok=R(0,1)==1;
 var df=dd<10?R(3,10):R(1,3),shown=ok?r:r+(R(0,1)?df:-df);
 return{text:a+" x "+b+" + "+c+" = "+shown,opts:["Sahi","Galat"],ans:ok?"Sahi":"Galat"}}});

// 7. Rule Machine
GAMES.push({type:"logic",name:"Rule Machine",make:function(d){
 var dd=Math.floor(d),m=R(2,3+Math.min(Math.floor(dd/5),6)),k=dd<5?0:R(1,5+Math.min(dd,10)),xs=[],i,t="",x;
 while(xs.length<4){x=R(1,9+dd);if(xs.indexOf(x)<0)xs.push(x)}
 for(i=0;i<3;i++)t+=xs[i]+" &rarr; "+(m*xs[i]+k)+"<br>";
 var ans=m*xs[3]+k;
 return{text:t+xs[3]+" &rarr; ?",opts:four(ans,6),ans:ans}}});

// 8. Count Multiples
GAMES.push({type:"logic",name:"Count Multiples",make:function(d){
 var dd=Math.floor(d),k=R(2,Math.min(3+Math.floor(dd/10),9)),n=Math.min(8+Math.floor(dd/10),14),c=R(1,5),a=[],i,x;
 for(i=0;i<c;i++)a.push(k*R(1,9+dd));
 while(a.length<n){x=R(2,k*(9+dd));if(x%k!=0)a.push(x)}
 return{text:sh(a).join(", ")+"<br>Kitne numbers "+k+" se divide hote hain?",opts:four(c,2),ans:c}}});

// 9. Code Letters
GAMES.push({type:"logic",name:"Code Letters",make:function(d){
 var dd=Math.floor(d),s=R(1,Math.min(3+Math.floor(dd/6),12)),back=dd>5&&R(0,1)==1,p=R(1,25);
 var f=function(i){return AL[(i+(back?-s:s)+52)%26]},ans=f(p),o=[ans],w;
 while(o.length<4){w=f(R(0,25));if(o.indexOf(w)<0)o.push(w)}
 return{text:"Code: A &rarr; "+f(0)+"<br>"+AL[p]+" &rarr; ?",opts:o,ans:ans}}});

// 10. Syllogism
GAMES.push({type:"logic",name:"Syllogism",make:function(d){
 var dd=Math.floor(d),t=dd<=5?0:dd<=15?R(0,1):R(0,2),L=sh("PQRSTUVW".split("")),x=L[0],y=L[1],z=L[2],tx,ans;
 if(t==0){tx="Sab "+x+", "+y+" hain. Sab "+y+", "+z+" hain.<br>Kya sab "+x+", "+z+" hain?";ans="Haan"}
 else if(t==1){tx="Sab "+x+", "+y+" hain. Sab "+z+", "+y+" hain.<br>Kya sab "+x+", "+z+" hain?";ans="Pata nahi"}
 else{tx="Sab "+x+", "+y+" hain. Koi "+y+", "+z+" nahi hai.<br>Kya koi "+x+", "+z+" hai?";ans="Nahi"}
 return{text:tx,opts:["Haan","Nahi","Pata nahi"],ans:ans}}});
})();

(function(){
function R(a,b){return Math.floor(Math.random()*(b-a+1))+a}
function four(ans,sp){var o=[ans],t=0,w,k=1;
 while(o.length<4&&t<200){t++;w=ans+R(-sp,sp);if(w>0&&o.indexOf(w)<0)o.push(w)}
 while(o.length<4){if(o.indexOf(ans+k)<0)o.push(ans+k);k++}
 return o}

// 1. Profit Calc
GAMES.push({type:"business",name:"Profit Calc",make:function(d){
 var dd=Math.floor(d),c=R(10,50+dd*3),pr=R(2,20+dd),s=c+pr,q=R(2,5+Math.floor(dd/5)),t,ans;
 if(dd<15){ans=pr*q;t="Ek cheez "+c+" me kharidi aur "+s+" me bechi. "+q+" cheez bechne par profit kitna?"}
 else{var e=R(1,pr*q-1);ans=pr*q-e;t="Ek cheez "+c+" me kharidi aur "+s+" me bechi. "+q+" cheez bechi aur "+e+" rupaye ka alag kharcha hua. Asli profit kitna?"}
 return{text:t,opts:four(ans,Math.max(5,pr)),ans:ans}}});

// 2. Profit Percent
GAMES.push({type:"business",name:"Profit Percent",make:function(d){
 var dd=Math.floor(d),cost=10*R(1,10+Math.floor(dd/3)),p=10*R(1,5+Math.floor(dd/10)),sell=cost*(100+p)/100;
 var o=[p,p+10,p+20,p>=20?p-10:p+30];
 return{text:"Cost "+cost+" rupaye, bechne ka daam "+sell+" rupaye.<br>Profit kitne percent hai?",opts:o,ans:p}}});

// 3. Discount Price
GAMES.push({type:"business",name:"Discount Price",make:function(d){
 var dd=Math.floor(d),P=10*R(5,30+dd*2),dc=10*R(1,Math.min(5+Math.floor(dd/10),8)),ans=P*(100-dc)/100;
 return{text:"Ek cheez ka daam "+P+" rupaye hai. "+dc+"% discount mil raha hai.<br>Kitne me milegi?",opts:four(ans,Math.max(5,Math.round(ans/10))),ans:ans}}});

// 4. Break Even
GAMES.push({type:"business",name:"Break Even",make:function(d){
 var dd=Math.floor(d),m=R(2,10+Math.floor(dd/3)),n=R(5,20+dd),F=m*n,v=R(5,30),p=v+m;
 return{text:"Dukaan ka fixed kharcha "+F+" rupaye hai. Ek cheez "+v+" me banti hai aur "+p+" me bikti hai.<br>Kitni cheez bechne par na profit na loss?",opts:four(n,3),ans:n}}});

// 5. Best Deal
GAMES.push({type:"business",name:"Best Deal",make:function(d){
 var ua=R(10,30),ub=ua+R(1,5)*(R(0,1)?1:-1),qa=R(2,6),qb=R(2,8),ans=ua<ub?"A":"B";
 return{text:"Offer A: "+qa+" cheez "+(qa*ua)+" rupaye me<br>Offer B: "+qb+" cheez "+(qb*ub)+" rupaye me<br>Kaun sa sasta hai?",opts:["A","B"],ans:ans}}});

// 6. Bill With Tax
GAMES.push({type:"business",name:"Bill With Tax",make:function(d){
 var dd=Math.floor(d),P=100*R(1,5+Math.floor(dd/5)),G=[5,10,12,18],g=G[R(0,dd<10?1:3)],ans=P+P*g/100;
 return{text:"Bill "+P+" rupaye ka hai. Usme "+g+"% tax judta hai.<br>Kul kitna dena hoga?",opts:four(ans,Math.max(10,Math.round(ans/10))),ans:ans}}});

// 7. Simple Interest
GAMES.push({type:"business",name:"Simple Interest",make:function(d){
 var dd=Math.floor(d),P=1000*R(1,5+Math.floor(dd/5)),r=R(2,12),T=R(1,5),ans=P*r*T/100;
 return{text:P+" rupaye "+r+"% saalana byaj par "+T+" saal ke liye diye.<br>Byaj kitna hoga?",opts:four(ans,Math.max(20,Math.round(ans/10))),ans:ans}}});

// 8. Average Sales
GAMES.push({type:"business",name:"Average Sales",make:function(d){
 var dd=Math.floor(d),n=R(3,Math.min(5+Math.floor(dd/10),8)),a=[],i,s;
 for(i=0;i<n;i++)a.push(R(20,100+dd*10));
 s=a.reduce(function(x,y){return x+y},0);
 var add=(n-s%n)%n;a[n-1]+=add;s+=add;
 var ans=s/n;
 return{text:"Roz ki bikri (rupaye): "+a.join(", ")+"<br>Average bikri kitni hai?",opts:four(ans,5),ans:ans}}});

// 9. Profit Share
GAMES.push({type:"business",name:"Profit Share",make:function(d){
 var dd=Math.floor(d),a=R(1,4),b=R(1,4),u=1000*R(1,5),w=R(2,9+dd)*100,ans=a*w;
 return{text:"Ravi ne "+(a*u)+" aur Sunil ne "+(b*u)+" rupaye lagaye. Profit "+((a+b)*w)+" rupaye hua, jo lagaye paise ke hisab se bata.<br>Ravi ka hissa kitna?",opts:four(ans,Math.max(50,w)),ans:ans}}});

// 10. Budget Split
GAMES.push({type:"business",name:"Budget Split",make:function(d){
 var dd=Math.floor(d),B=100*R(2,20+dd),m=10*R(1,4),r=10*R(1,4),ans=B*(100-m-r)/100;
 return{text:"Total budget "+B+" rupaye hai. Marketing me "+m+"% aur kiraye me "+r+"% jata hai.<br>Baaki kitna bachega?",opts:four(ans,Math.max(20,Math.round(ans/10))),ans:ans}}});
})();

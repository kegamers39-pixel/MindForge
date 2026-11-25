function diff(l){if(l<=5)return l*0.8;if(l<=30)return 4+(l-5)*2;return 54+(l-30)*1.2}
function next(){
 cq=cur.make(diff(lvl));
 var o=cq.opts.slice().sort(function(){return Math.random()-0.5});
 useT=timed||!trial;
 ui("<div class='top'><b>"+cur.name+"</b><span class='pill'>"+(boss?"⚔ BOSS · ":"")+"Level "+lvl+(trial?" · Trial":"")+"</span></div>"+
 "<div class='hud'><span id='hh'>"+hearts()+"</span><span class='cmb' id='cc'>"+cmbText()+"</span></div>"+
 "<div class='prog'><i style='width:"+Math.round(q*100/qTotal)+"%'></i></div>"+
 (trial?"<div class='note'>🎓 Trial: lives nahi kategi, seekhte jao ("+(q+1)+"/"+qTotal+")</div>":"<div class='note'>Sawal "+(q+1)+"/"+qTotal+(boss?" · ⚔ Boss: sirf 1 life, double XP":"")+"</div>")+
 (useT?"<div class='bar'><i id='tb'></i></div><div id='tm'></div>":"")+
 "<div class='qcard'><div id='qt'>"+cq.text+"</div></div><div class='opts "+(o.length==4?"two":"")+"'>"+
 o.map(function(v,i){return "<button class='opt' style='--i:"+i+"' data-v='"+v+"' onclick='pick(this.dataset.v)'>"+v+"</button>"}).join("")+
 "</div><button class='ghost small' onclick='quit()'>✕ Chhodo</button>");
 var fls=cq.flash||0;
 t0=Date.now()+fls*1000;
 if(useT){
  var tmul=(cur.type=="deep"||cur.type=="business")?2:(cur.type=="elite"?1.5:1);
  var total=Math.max(3,Math.round(((trial?20:12)-diff(lvl)*0.09)*tmul))+Math.ceil(fls);
  if(boss)total=Math.max(3,Math.round(total*0.8));
  var left=total,tb=document.getElementById("tb");
  tb.style.transition="width "+total+"s linear";
  setTimeout(function(){tb.style.width="0%"},50);
  document.getElementById("tm").innerText="⏱ "+left+"s";
  tm=setInterval(function(){
   left--;
   var e=document.getElementById("tm");if(e)e.innerText="⏱ "+left+"s";
   if(left>0&&left<=3)sfx("tick");
   if(left<=0)pick(null);
  },1000);
 }
}
(function(){
function R(a,b){return Math.floor(Math.random()*(b-a+1))+a}
function sh(a){return a.slice().sort(function(){return Math.random()-.5})}
function four(ans,sp){var o=[ans],t=0,w,k=1;
 while(o.length<4&&t<200){t++;w=ans+R(-sp,sp);if(w>0&&o.indexOf(w)<0)o.push(w)}
 while(o.length<4){if(o.indexOf(ans+k)<0)o.push(ans+k);k++}
 return o}
function near(ans,c,pre){var o=[ans],i,v,k=1;
 (pre||[]).forEach(function(x){if(x>0&&o.indexOf(x)<0)o.push(x)});
 c=sh(c);
 for(i=0;i<c.length&&o.length<4;i++){v=c[i];if(v>0&&o.indexOf(v)<0)o.push(v)}
 while(o.length<4){if(o.indexOf(ans+k)<0)o.push(ans+k);k++}
 return o.slice(0,4)}
var st=document.createElement("style");
st.innerHTML=".fl{font-size:30px;letter-spacing:3px;font-weight:800;color:#f6e27a;animation:vn .01s linear forwards}@keyframes vn{to{visibility:hidden}}@keyframes so{to{visibility:visible}}";
document.head.appendChild(st);
TYPES.elite=["Elite (Khatarnak)","🔥"];
function hide(t){return "<style>.opts{visibility:hidden;animation:so .01s linear forwards;animation-delay:"+t+"s}</style>"}
function fl(x,t){return "<span class='fl' style='animation-delay:"+t+"s'>"+x+"</span>"}
var EM=["⭐","🔴","🟦","🔺","💚"];

// 1. Digit Flash
GAMES.push({type:"elite",name:"Digit Flash",make:function(d){
 var dd=Math.floor(d),L=Math.min(3+Math.floor(dd/6),12),s="",i,a,p,v;
 for(i=0;i<L;i++)s+=R(i?0:1,9);
 var o=[s];
 while(o.length<4){a=s.split("");p=R(0,L-1);a[p]=String((+a[p]+R(1,9))%10);if(p==0&&a[0]=="0")a[0]="1";v=a.join("");if(o.indexOf(v)<0)o.push(v)}
 var t=Math.max(0.8,L*0.5-dd*0.01);
 return{text:hide(t)+"Yaad karo:<br>"+fl(s,t)+"<br>Kaun sa number tha?",opts:o,ans:s,flash:t}}});

// 2. Memory Scan
GAMES.push({type:"elite",name:"Memory Scan",make:function(d){
 var dd=Math.floor(d),N=Math.min(4+Math.floor(dd/10),9),a=[],x,odd;
 while(a.length<N){x=R(10,99);if(a.indexOf(x)<0)a.push(x)}
 do{odd=R(10,99)}while(a.indexOf(odd)>=0);
 var o=[odd];sh(a).forEach(function(v){if(o.length<4)o.push(v)});
 var t=Math.max(1,N*0.6-dd*0.01);
 return{text:hide(t)+"Yaad karo:<br>"+fl(a.join("  "),t)+"<br>Inme se kaun sa number NAHI tha?",opts:o,ans:odd,flash:t}}});

// 3. Stroop
var CN=[["Laal","#ff4d4d"],["Hara","#3ddc84"],["Neela","#4da3ff"],["Peela","#ffd93d"]];
GAMES.push({type:"elite",name:"Stroop",make:function(d){
 var dd=Math.floor(d),w=R(0,3),c=dd<4?w:(w+R(1,3))%4,inkRule=dd<4||R(0,1)==0,ans=inkRule?CN[c][0]:CN[w][0];
 return{text:(inkRule?"Shabd ka RANG batao":"Shabd kya likha hai? (rang ignore karo)")+"<br><span style='font-size:44px;font-weight:800;color:"+CN[c][1]+"'>"+CN[w][0]+"</span>",opts:CN.map(function(x){return x[0]}),ans:ans}}});

// 4. Mental Multiply
GAMES.push({type:"elite",name:"Mental Multiply",make:function(d){
 var dd=Math.floor(d),a,b;
 if(dd<10){a=R(11,25);b=R(3,9)}else if(dd<25){a=R(12,60);b=R(6,19)}else if(dd<50){a=R(21,99);b=R(11,29)}else{a=R(101,499);b=R(11,49)}
 var ans=a*b;
 return{text:a+" × "+b+" = ?",opts:near(ans,[ans+10,ans-10,ans+a,ans-a,ans+b,ans-b,ans+100,ans-100,ans+R(1,9)]),ans:ans}}});

// 5. Chain Calc
function ev(nums,ops){var n=[nums[0]],o=[],i;
 for(i=0;i<ops.length;i++){if(ops[i]=="x")n[n.length-1]*=nums[i+1];else{o.push(ops[i]);n.push(nums[i+1])}}
 var r=n[0];for(i=0;i<o.length;i++)r=o[i]=="+"?r+n[i+1]:r-n[i+1];return r}
function ltr(nums,ops){var r=nums[0],i;
 for(i=0;i<ops.length;i++)r=ops[i]=="+"?r+nums[i+1]:ops[i]=="-"?r-nums[i+1]:r*nums[i+1];return r}
GAMES.push({type:"elite",name:"Chain Calc",make:function(d){
 var dd=Math.floor(d),n=Math.min(3+Math.floor(dd/12),6),mx=Math.min(9+Math.floor(dd/4),30),nums,ops,ans,i,t=0;
 do{nums=[];ops=[];
  for(i=0;i<n;i++)nums.push(R(2,mx));
  for(i=0;i<n-1;i++)ops.push(["+","-","x"][R(0,2)]);
  if(ops.indexOf("x")<0)ops[R(0,n-2)]="x";
  ans=ev(nums,ops);t++}while(ans<=0&&t<60);
 if(ans<=0){ops=ops.map(function(){return "+"});ans=ev(nums,ops)}
 var l2r=ltr(nums,ops),txt=""+nums[0];
 for(i=0;i<n-1;i++)txt+=" "+(ops[i]=="x"?"×":ops[i])+" "+nums[i+1];
 return{text:txt+" = ?",opts:near(ans,[ans+1,ans-1,ans+2,ans-2,ans+10,ans-10],[l2r]),ans:ans}}});

// 6. Power Squares
GAMES.push({type:"elite",name:"Power Squares",make:function(d){
 var dd=Math.floor(d),hi=Math.min(25+Math.floor(dd*0.7),99),n=R(11,hi),ans=n*n;
 return{text:n+"² = ?",opts:near(ans,[ans+n,ans-n,ans+10,ans-10,ans+100,ans-100,ans+2*n+1,ans-(2*n-1)]),ans:ans}}});

// 7. Reverse Memory
GAMES.push({type:"elite",name:"Reverse Memory",make:function(d){
 var dd=Math.floor(d),L=Math.min(3+Math.floor(dd/8),9),s="",i,a,p,w;
 for(i=0;i<L;i++)s+=R(i?0:1,9);
 var rev=s.split("").reverse().join(""),o=[rev];
 if(s!==rev)o.push(s);
 while(o.length<4){a=rev.split("");p=R(0,L-1);a[p]=String((+a[p]+R(1,9))%10);w=a.join("");if(o.indexOf(w)<0)o.push(w)}
 var t=Math.max(1,L*0.55-dd*0.01);
 return{text:hide(t)+"Yaad karo:<br>"+fl(s,t)+"<br>Ulte order me kaun sa number hai?",opts:o,ans:rev,flash:t}}});

// 8. Matrix Rule
GAMES.push({type:"elite",name:"Matrix Rule",make:function(d){
 var dd=Math.floor(d),pool=dd<10?[0,2]:dd<30?[0,1,2,3]:[1,2,3,4,5],f=pool[R(0,pool.length-1)],m=Math.min(9+Math.floor(dd/5),20),rows=[],i,a,b;
 function F(x,y){return f==0?x+y:f==1?x*y:f==2?2*x+y:f==3?x*y+x:f==4?x*x+y:(x+y)*2}
 for(i=0;i<3;i++){a=R(1,m);b=R(1,m);rows.push([a,b,F(a,b)])}
 var ans=rows[2][2];
 return{text:"Har row ka teesra number ek hi rule se banta hai.<br>"+rows[0].join(" | ")+"<br>"+rows[1].join(" | ")+"<br>"+rows[2][0]+" | "+rows[2][1]+" | ?",opts:four(ans,Math.max(4,Math.round(ans/8))),ans:ans}}});

// 9. Rank Order
GAMES.push({type:"elite",name:"Rank Order",make:function(d){
 var dd=Math.floor(d),n=Math.min(4+Math.floor(dd/20),6),P=sh("ABCDEF".slice(0,n).split("")),st=[],i;
 for(i=0;i<n-1;i++)st.push(R(0,1)?P[i]+", "+P[i+1]+" se tez hai":P[i+1]+", "+P[i]+" se dheema hai");
 var k=R(2,n-1),ans=P[k-1],o=[ans];
 sh(P).forEach(function(x){if(o.length<4&&o.indexOf(x)<0)o.push(x)});
 return{text:sh(st).join(".<br>")+".<br>Sabse tez se ginte hue "+k+"th number par kaun hai?",opts:o,ans:ans}}});

// 10. Flash Count
GAMES.push({type:"elite",name:"Flash Count",make:function(d){
 var dd=Math.floor(d),n=Math.min(8+Math.floor(dd/3),30),k=Math.min(2+Math.floor(dd/12),5),kinds=sh(EM).slice(0,k),tg=kinds[0],c=R(2,Math.max(3,Math.floor(n/3))),a=[],i;
 for(i=0;i<c;i++)a.push(tg);
 while(a.length<n)a.push(kinds[R(1,k-1)]);
 var t=Math.max(0.8,n*0.1);
 return{text:hide(t)+"Dhyan se dekho:<br>"+fl(sh(a).join(" "),t)+"<br>Kitne "+tg+" the?",opts:four(c,2),ans:c,flash:t}}});
})();

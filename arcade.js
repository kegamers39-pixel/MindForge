(function(){
var _play=window.play;
TYPES.arcade=["Arcade (Focus)","🎮"];
var stl=document.createElement("style");
stl.innerHTML=".tiles{display:grid;gap:8px;margin:14px auto;max-width:360px}"+
".tile{aspect-ratio:1;border-radius:14px;border:1px solid rgba(212,175,55,.35);background:linear-gradient(145deg,#241e0d,#0f0d07);font-size:20px;font-weight:800;color:#f6e27a;box-shadow:0 6px 14px rgba(0,0,0,.6),inset 0 1px 0 rgba(255,255,255,.1);transition:transform .08s,filter .15s,opacity .2s;padding:0}"+
".tile:active{transform:scale(.92)}"+
".tile.lit{background:linear-gradient(145deg,#fff3a8,#e0b92d);box-shadow:0 0 28px rgba(246,226,122,.9);transform:scale(1.06)}"+
".tile.done{opacity:.22}"+
".tiles.shake{animation:shake .4s}"+
".arena{position:relative;height:320px;border-radius:20px;border:1px solid rgba(212,175,55,.45);background:radial-gradient(circle at 50% 40%,#1f1a0a,#080705);overflow:hidden;margin:12px 0;box-shadow:inset 0 0 40px rgba(0,0,0,.8)}"+
".stim{position:absolute;width:76px;height:76px;animation:pop .14s ease-out}"+
".stim.go{border-radius:50%;background:radial-gradient(circle at 30% 30%,#a8ffc4,#1faa59);box-shadow:0 0 26px #3ddc84}"+
".stim.nogo{border-radius:14px;background:radial-gradient(circle at 30% 30%,#ffb3b3,#c0182a);box-shadow:0 0 26px #ff4d4d}"+
"@keyframes pop{from{transform:scale(.2);opacity:0}to{transform:scale(1);opacity:1}}";
document.head.appendChild(stl);

var stops=[];
function cleanup(){var s=stops;stops=[];s.forEach(function(f){try{f()}catch(e){}})}
window.addEventListener("popstate",cleanup);
function R(a,b){return Math.floor(Math.random()*(b-a+1))+a}
function sh(a){return a.slice().sort(function(){return Math.random()-.5})}
function $(id){return document.getElementById(id)}
function later(fn,ms){var t=setTimeout(fn,ms);stops.push(function(){clearTimeout(t)});return t}
function every(fn,ms){var t=setInterval(fn,ms);stops.push(function(){clearInterval(t)});return t}
function note(f,d,ty,v){if(!sfxOn)return;try{ensureAC();tone(f,d,ty,v)}catch(e){}}
function shake(id){var g=$(id);if(!g)return;g.classList.remove("shake");void g.offsetWidth;g.classList.add("shake")}
function tileOf(e){return e.target&&e.target.closest?e.target.closest(".tile"):null}
function shell(hud,body){
 ui("<div class='top'><b>"+cur.name+"</b><span class='pill'>Level "+lvl+(trial?" · Trial":"")+"</span></div><div class='hud'>"+hud+"</div>"+body+"<button class='ghost small' onclick='history.back()'>✕ Chhodo</button>");
}

window.play=function(i){
 var g=GAMES[i];
 if(!g||!g.custom){_play(i);return}
 cleanup();clearInterval(tm);
 cur=g;lvl=getLvl(g);trial=lvl<=5;boss=false;busy=false;
 push("play");
 g.run(lvl,trial,done);
};

function done(res){
 cleanup();
 scr="end";
 var up=!!res.pass,xp=(up?60:15)+Math.min(lvl,100),oldXp=num("mf_xp"),newXp=oldXp+xp,rankUp=rankOf(newXp)>rankOf(oldXp);
 localStorage.setItem("mf_xp",newXp);
 localStorage.setItem("mf_played",num("mf_played")+1);
 if(up){localStorage.setItem(key(cur),lvl+1);localStorage.setItem("mf_passed",num("mf_passed")+1)}
 touchStreak();
 sfx(up?"win":"lose");vib(up?[60,40,60,40,120]:[200]);if(up)confetti();
 var s="",i;
 for(i=0;i<3;i++)s+=i<(res.stars||0)?"★":"☆";
 var boxes=res.sum.map(function(x,k){return "<div class='st' style='--i:"+k+"'><b>"+x[1]+"</b><small>"+x[0]+"</small></div>"}).join("")+"<div class='st' style='--i:9'><b>+"+xp+"</b><small>XP</small></div>";
 ui("<div class='stars'>"+s+"</div><div class='res'>"+(up?"Level Pass!":"Dobara Koshish")+"</div>"+
 (rankUp?"<div class='res'>🎉 RANK UP: "+RANKS[rankOf(newXp)][2]+" "+RANKS[rankOf(newXp)][0]+"</div>":"")+
 "<div class='grid'>"+boxes+"</div><div class='tip'>💡 "+res.tip+"</div>"+
 "<button class='gold' onclick='play("+GAMES.indexOf(cur)+")'>"+(up?"Agla Level ›":"Dobara Try")+"</button>"+
 "<button class='ghost' onclick='history.back()'>Games list</button>");
}

// 1. Schulte Table (focus)
GAMES.push({type:"arcade",name:"Schulte Table",custom:true,run:function(l,tr,fin){
 var n=Math.min(7,3+Math.floor(l/8)),N=n*n,nums=[],i;
 for(i=1;i<=N;i++)nums.push(i);
 nums=sh(nums);
 var limit=Math.round(N*Math.max(0.7,1.6-l*0.01)),nxt=1,miss=0,start=Date.now(),over=false;
 shell("<span id='sc'>Dhundo: <b>1</b></span><span id='tt'>⏱ 0.0s / "+limit+"s</span>",
  "<div class='tiles' id='gr' style='grid-template-columns:repeat("+n+",1fr)'>"+nums.map(function(v){return "<button class='tile' data-n='"+v+"'>"+v+"</button>"}).join("")+"</div><div class='note' id='ms'>Galti: 0/3 · "+(tr?"Trial: aaram se":"Jaldi karo")+"</div>");
 function end(pass){
  if(over)return;over=true;
  var t=(Date.now()-start)/1000;
  fin({pass:pass,stars:pass?(t<=limit*0.75?3:t<=limit*0.9?2:1):0,
   sum:[["Time",t.toFixed(1)+"s"],["Limit",limit+"s"],["Galtiyan",miss+"/3"],["Mile",(nxt-1)+"/"+N]],
   tip:pass?"Nazar poore grid par rakho, ek jagah nahi.":"Nazar ghumao nahi, poore table ko ek saath dekho."});
 }
 every(function(){
  var t=(Date.now()-start)/1000,e=$("tt");
  if(e)e.innerText="⏱ "+t.toFixed(1)+"s / "+limit+"s";
  if(t>limit)end(false);
 },100);
 $("gr").onclick=function(e){
  var b=tileOf(e);
  if(!b||over||b.classList.contains("done"))return;
  if(+b.dataset.n===nxt){
   b.classList.add("done");nxt++;
   var s=$("sc");if(s)s.innerHTML="Dhundo: <b>"+Math.min(nxt,N)+"</b>";
   if(nxt>N)end(true);
  }else{
   miss++;sfx("bad");vib(120);shake("gr");
   var m=$("ms");if(m)m.innerText="Galti: "+miss+"/3";
   if(miss>=3)end(false);
  }
 };
}});

// 2. Pattern Memory (Simon)
GAMES.push({type:"arcade",name:"Pattern Memory",custom:true,run:function(l,tr,fin){
 var g=l>=40?5:l>=15?4:3,cells=g*g,target=Math.min(15,3+Math.floor(l/2)),speed=Math.max(220,600-l*5);
 var seq=[R(0,cells-1),R(0,cells-1)],pos=0,lives=3,inp=false,over=false,miss=0,k,html="";
 var sc=[0,2,4,7,9,12,14,16,19],inT=null;
 function heart(){var h="";for(var j=0;j<3;j++)h+=j<lives?"❤️":"🖤";return h}
 for(k=0;k<cells;k++)html+="<button class='tile' data-i='"+k+"'></button>";
 shell("<span id='hh2'>"+heart()+"</span><span id='st2'>Step "+seq.length+"/"+target+"</span>",
  "<div class='tiles' id='gr' style='grid-template-columns:repeat("+g+",1fr)'>"+html+"</div><div class='note' id='ms'>Dhyan se dekho...</div>");
 var tiles=document.querySelectorAll(".tile");
 function msg(t){var m=$("ms");if(m)m.innerText=t}
 function lit(ix){
  var b=tiles[ix];if(!b)return;
  b.classList.add("lit");
  note(262*Math.pow(2,sc[ix%9]/12),0.25,"triangle",0.22);
  later(function(){b.classList.remove("lit")},Math.round(speed*0.7));
 }
 function showSeq(){
  inp=false;pos=0;msg("Dhyan se dekho...");
  var s=$("st2");if(s)s.innerText="Step "+seq.length+"/"+target;
  seq.forEach(function(ix,j){later(function(){lit(ix)},700+j*speed)});
  later(function(){inp=true;msg("Ab tumhari baari 👆");inT=later(function(){if(inp&&!over)wrong("Time khatam!")},3000+seq.length*900)},700+seq.length*speed);
 }
 function wrong(why){
  inp=false;clearTimeout(inT);lives--;miss++;sfx("bad");vib(150);shake("gr");
  var h=$("hh2");if(h)h.innerText=heart();
  if(lives<=0)later(function(){end(false)},500);
  else{msg(why+" Dobara dekho...");later(showSeq,1000)}
 }
 function end(pass){
  if(over)return;over=true;
  fin({pass:pass,stars:pass?(lives==3?3:lives==2?2:1):0,
   sum:[["Sequence",seq.length+"/"+target],["Lives bachi",lives+"/3"],["Galtiyan",miss]],
   tip:pass?"Pattern ko chhote tukdon me baant kar yaad karo.":"Har tile ko ek chhoti kahani ki tarah yaad karo."});
 }
 $("gr").onclick=function(e){
  var b=tileOf(e);
  if(!b||!inp||over)return;
  var ix=+b.dataset.i;lit(ix);
  if(ix===seq[pos]){
   pos++;
   if(pos>=seq.length){
    inp=false;clearTimeout(inT);
    if(seq.length>=target)later(function(){end(true)},400);
    else{msg("Shabaash! 🔥");later(function(){seq.push(R(0,cells-1));showSeq()},800)}
   }
  }else wrong("Galat!");
 };
 later(showSeq,300);
}});

// 3. Odd Tile (nazar)
GAMES.push({type:"arcade",name:"Odd Tile",custom:true,run:function(l,tr,fin){
 var n=Math.min(7,3+Math.floor(l/12)),delta=Math.max(4,38-l*0.45),rounds=10,r=0,right=0,limit=Math.max(1.5,6-l*0.04);
 var times=[],odd=0,over=false,t0=0,tmo=null,locked=false;
 shell("<span id='rr'>Round 1/"+rounds+"</span><span id='sk'>✅ 0</span>",
  "<div class='bar'><i id='tb2'></i></div><div class='tiles' id='gr' style='grid-template-columns:repeat("+n+",1fr)'></div><div class='note'>Alag shade wala tile dhundo</div>");
 function end(){
  if(over)return;over=true;
  var avg=times.length?(times.reduce(function(a,b){return a+b},0)/times.length).toFixed(1):"0";
  var pass=right>=8;
  fin({pass:pass,stars:pass?(right==10?3:right==9?2:1):0,
   sum:[["Sahi",right+"/"+rounds],["Avg time",avg+"s"],["Shade farak",Math.round(delta)+"%"]],
   tip:pass?"Tile ko ek ek nahi, poore grid ko ek nazar me dekho.":"Aankhein halki si dhundli karke poora grid dekho, alag shade ubhar aata hai."});
 }
 function round(){
  if(over)return;
  if(r>=rounds){end();return}
  locked=false;
  var hue=R(0,359),sg=R(0,1)?1:-1,html="",i;
  odd=R(0,n*n-1);
  for(i=0;i<n*n;i++)html+="<button class='tile' data-i='"+i+"' style='border:0;background:hsl("+hue+",70%,"+(i==odd?50+sg*delta:50)+"%)'></button>";
  $("gr").innerHTML=html;
  var rr=$("rr");if(rr)rr.innerText="Round "+(r+1)+"/"+rounds;
  var tb=$("tb2");
  tb.style.transition="none";tb.style.width="100%";
  later(function(){tb.style.transition="width "+limit+"s linear";tb.style.width="0%"},30);
  t0=Date.now();
  tmo=later(function(){answer(-1)},limit*1000);
 }
 function answer(ix){
  if(locked||over)return;
  locked=true;clearTimeout(tmo);
  times.push((Date.now()-t0)/1000);
  var ok=ix===odd;
  if(ok){right++;sfx("ok");vib(25)}
  else{
   sfx("bad");vib(120);
   var all=document.querySelectorAll("#gr .tile");
   if(all[odd])all[odd].style.outline="4px solid #fff";
  }
  r++;
  var sk=$("sk");if(sk)sk.innerText="✅ "+right;
  later(round,ok?300:800);
 }
 $("gr").onclick=function(e){var b=tileOf(e);if(b)answer(+b.dataset.i)};
 round();
}});

// 4. Go No-Go (focus aur control)
GAMES.push({type:"arcade",name:"Go No-Go",custom:true,run:function(l,tr,fin){
 var total=20,i=0,hits=0,miss=0,fa=0,rts=[],dur=Math.max(450,1100-l*8),goN=0,cs=null,over=false;
 shell("<span id='gi'>0/"+total+"</span><span id='ge'>Galti: 0</span>",
  "<div class='note'>🟢 Hare gole par tap karo · 🔴 laal chaukor par KABHI nahi</div><div class='arena' id='ar'></div>");
 var ar=$("ar");
 function err(){var e=$("ge");if(e)e.innerText="Galti: "+(miss+fa)}
 function end(){
  if(over)return;over=true;
  var errs=miss+fa,pass=errs<=3,avg=rts.length?Math.round(rts.reduce(function(a,b){return a+b},0)/rts.length)+"ms":"-";
  fin({pass:pass,stars:pass?(errs==0?3:errs<=1?2:1):0,
   sum:[["Sahi tap",hits+"/"+goN],["Chhute",miss],["Galat tap",fa],["Reaction",avg]],
   tip:pass?"Tezi ke saath rukna bhi seekho, yahi asli control hai.":"Pehle dekho, phir tap karo. Laal dikhe to haath rok lo."});
 }
 function step(){
  if(over)return;
  if(i>=total){end();return}
  i++;
  var gi=$("gi");if(gi)gi.innerText=i+"/"+total;
  var go=R(0,9)>2,el=document.createElement("div");
  if(go)goN++;
  el.className="stim "+(go?"go":"nogo");
  el.style.left=R(4,68)+"%";el.style.top=R(4,68)+"%";
  cs={go:go,t:Date.now(),done:false,el:el};
  el.onclick=function(ev){
   if(ev&&ev.stopPropagation)ev.stopPropagation();
   if(!cs||cs.done||cs.el!==el)return;
   cs.done=true;
   if(cs.go){hits++;rts.push(Date.now()-cs.t);sfx("ok");vib(20)}
   else{fa++;sfx("bad");vib(150);err()}
   if(el.remove)el.remove();
  };
  ar.appendChild(el);
  later(function(){
   if(cs&&!cs.done&&cs.go){miss++;sfx("bad");err()}
   ar.innerHTML="";cs=null;
   later(step,R(250,500));
  },dur);
 }
 later(step,1200);
}});
})();

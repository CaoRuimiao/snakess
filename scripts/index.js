window.onload=function(){

	var snake=[{x:0,y:0},{x:0,y:1},{x:0,y:2}],
	 	MAXSNAKE=225,ROW=15,UP=38,DOWN=40,LEFT=37,RIGHT=39,
		defaultDirection=RIGHT,  //defaultDirection
		SNAKECOLOR='green',FOODCOLOR='rgb(251, 110, 8)',DEFAULTCOLOR='white';	
	var sence=document.getElementById('sence');
	var fenShu=document.getElementById('fenShu');
	var changDu=document.getElementById('changDu');
	var butn=document.getElementsByClassName('butn');    //模式按钮
	for(var k=0;k<ROW;k++){
		for( var j=0;j<ROW;j++){
			var blocks=document.createElement('div');
			blocks.setAttribute('class','block');
			blocks.setAttribute('id',k+'_'+j);
			blocks.style.width=(600-ROW)/ROW;
			blocks.style.height=(600-ROW)/ROW;
			sence.appendChild(blocks);
		}
	}
	var isInsnake=function(x,y){
		for (var i = 0; i < snake.length; i++) {
			if (snake[i].x==x&&snake[i].y==y) {
				return true;
			}
		}
		return false;
	};
	random=function(){
		return Math.floor(Math.random()*ROW);
	};
	var dropFood=function(){
		var x=random(),y=random();
		//warning:当蛇的数据占满整个页面的时候停止投放食物
		if (snake.length==MAXSNAKE) {
			tihi.style.display='block';
			tishi.style.background='url(../images/tishi4.png)';
			// alert('太棒了！');
			return;
		}
		while(isInsnake(x,y)){  
			x=random(),y=random();     
		}
		// document.getElementById(x+'_'+y).style.background=FOODCOLOR;
		document.getElementById(x+'_'+y).style.background='url(./images/food.jpg)';
		return {foodx:x,foody:y};
	};
	var food=dropFood();
	var chang=Number(changDu.innerHTML);
	var tishi=document.getElementById('tishi');
	zou=function(){		
		var last=snake.length-1,newHead,weiba;
		if (defaultDirection==UP) {
			newHead={x:snake[last].x-1,y:snake[last].y};
		}
		if (defaultDirection==DOWN) {
			newHead={x:snake[last].x+1,y:snake[last].y};
		}
		if (defaultDirection==LEFT) {
			newHead={x:snake[last].x,y:snake[last].y-1};
		}
		if (defaultDirection==RIGHT) {
			newHead={x:snake[last].x,y:snake[last].y+1};
		}
		if(newHead.x<0||newHead.x>ROW-1||newHead.y<0||newHead.y>ROW-1){
			clearInterval(timerId1);
			clearInterval(timerId2);
			clearInterval(timerId3);
			stop.onclick=null;
			// -------------------------------------------
			tishi.style.display='block';
			tishi.style.background='url(./images/tishi1.png)';   //撞墙了
			tishi.style.backgroundRepeat='no-repeat';
			title.style.display='block';
			title.innerHTML='';
			document.onkeydown=null;
			// alert('撞墙了!太遗憾了！您的得分为'+fenShu.innerHTML);
			// -----------------------------------------------
			return null;
		}
		if (isInsnake(newHead.x,newHead.y)) {
			clearInterval(timerId1);
			clearInterval(timerId2);
			clearInterval(timerId3);
			stop.onclick=null;
			// ------------------------------------------------
			tishi.style.display='block';
			tishi.style.background='url(./images/tishi2.png)';   //咬到自己了
			tishi.style.backgroundRepeat='no-repeat';
			title.style.display='block';
			title.innerHTML='';
			document.onkeydown=null;
			// alert('咬自己干嘛！太遗憾了！您的得分为'+fenShu.innerHTML);
			// ---------------------------------------------------
			return null;
		}
		snake.push(newHead);
		if (newHead.x==food.foodx&&newHead.y==food.foody) {
			var div=document.getElementById(food.foodx+'_'+food.foody);
			div.style.background='none';
			div.style.backgroundColor=SNAKECOLOR;
			// 记录蛇的长度和您的得分
			chang+=1;
			changDu.innerHTML=chang;
			fenShu.innerHTML=(changDu.innerHTML-3)*10;
			// if(fenShu.innerHTML==300){
			// 	alert('不错嘛！')
			// };
			// -------------
			food=dropFood();
			return null;
		}
		weiba=snake.shift();
		var t=document.getElementById(weiba.x+'_'+weiba.y);
		t.style.backgroundColor=DEFAULTCOLOR;
		var h=document.getElementById(newHead.x+'_'+newHead.y);
		h.style.backgroundColor=SNAKECOLOR;	
	};
	// ---------------------------------------------------------------------------
	var drawSnake=function(){
		for (i = 0; i < snake.length; i++) {
			document.getElementById(snake[i].x+'_'+snake[i].y).style.backgroundColor=SNAKECOLOR;
		}		
	};
	drawSnake();
	document.onkeydown=function(e){
		e.preventDefault();
		var direction=e.keyCode;
		if (direction==UP||direction==DOWN||direction==LEFT||direction==RIGHT) {
			if(Math.abs(direction-defaultDirection)!=2){								
				defaultDirection=direction;
			}			
		}	
	};
	// -----------------------------------------------
	var title=document.getElementById('title');
//  模式选择
	var timerId1,timerId2,timerId3;
	var control=true;
	butn[0].onclick=function(){
		if(control){
			timerId1=setInterval(zou,300); 
			title.style.display='none';
			control=false;
			return;
		}	
	}
	butn[1].onclick=function(){
		if(control){
			timerId2=setInterval(zou,200); 
			title.style.display='none';
			control=false;
			return;
		}	
	}
	butn[2].onclick=function(){
		if(control){
			timerId3=setInterval(zou,100); 
			title.style.display='none';
			control=false;
			return;
		}
	}	
//  暂停、继续
	var stop=document.getElementById('stop');
	var kaiguan1=true,kaiguan2=true,kaiguan3=true;
	stop.onclick=function(){
		if(kaiguan1){
			if(timerId1){
				clearInterval(timerId1);
				title.style.display='block';
				stop.innerHTML='继续';
				kaiguan1=false;
				return;
			}	
		}
		if(!kaiguan1){
			stop.innerHTML='暂停'; 
			title.style.display='none';
			control=true;
			butn[0].onclick(); 
			kaiguan1=true; 
			return;
		}
		if(kaiguan2){
			if(timerId2){
				clearInterval(timerId2);
				title.style.display='block';
				stop.innerHTML='继续';
				kaiguan2=false;
				return;
			}
		}
		if(!kaiguan2){
			stop.innerHTML='暂停'; 
			title.style.display='none';
			control=true;
			butn[1].onclick();
			kaiguan2=true;
			return;
		}
		if(kaiguan3){
			if(timerId3){
				clearInterval(timerId3);
				stop.innerHTML='继续';
				title.style.display='block';
				kaiguan3=false;
				return;
			}
		}
		if(!kaiguan3){
			stop.innerHTML='暂停'; 
			title.style.display='none';
			control=true;
			butn[2].onclick();
			kaiguan3=true;
			return;
		}
	};	
//  重来
	var rePlay=document.getElementById('replay');
	replay.onclick=function(){
		// ---------------------------------------------------
		// tishi.style.display='block';
		// tishi.style.background='url(./images/tishi3.png)';
		// tishi.style.backgroundRepeat='no-repeat';
		// tishi.onclick=function(){
		// 	tishi.style.display='none';
		// };	
		// alert('请选择模式！');
		// ---------------------------------------------
		location.reload();
	};
	// 阻止文字被选中
	var butBox=document.getElementById('butBox');
	butBox.onmousedown=function(e){
		e.preventDefault();
	};






};
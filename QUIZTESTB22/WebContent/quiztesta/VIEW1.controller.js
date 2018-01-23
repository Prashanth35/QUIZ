sap.ui.controller("quiztesta.VIEW1", {

	onInit: function() {
  var oModel = new sap.ui.model.json.JSONModel();

    oModel.loadData("model/model.json");

    this.getView().setModel(oModel);
    
    

    var sf = this.getView().byId("idSF"); 
    sf.bindElement("/questions/0");
    
	  
	},

	 onNext: function(oEvent){
		 
		 	var that=this;
		 	
		 	var simpleForm = this.getView().byId("idSF");
	    	var bindingCtx = simpleForm.getBindingContext().getPath();
	    	var temp = bindingCtx.split("/"); 
	    	var index = parseInt(temp[2]);
	    	var maxQuestions = 10;    	
	    	index=index+1;
	    	  
	    	//////////////////////////////////////////////////////////
	    	
	    	
	    	
	    	
		  
	    	 
	    	 
	    	 
	    	 
	    	 
	    	 
	    	 
	    	 
	    	 
	    	 
	    //////////////////////////////////////////////////////////////////////////	 
	    	 
		 var deadline = new Date(Date.parse(new Date()) + 1*60*1000);


		 function time_remaining(endtime){
		 	var t = Date.parse(endtime) - Date.parse(new Date());
		 	var seconds = Math.floor( (t/1000) % 60 );
		 	var minutes = Math.floor( (t/1000/60) % 60 );
		 	return {'minutes':minutes, 'seconds':seconds};
		 }
		 function run_clock(endtime){
		
			 
			 if(index < maxQuestions){
		    		simpleForm.bindElement("/questions/"+index); 
		    	}else if(index == maxQuestions){
		    		sap.m.MessageToast.show("you have reached last question");
		    		return;
		    	}
			 
			 
		 	function update_clock(){
		 		var t = time_remaining(endtime);
		 		console.log(t.minutes+":"+t.seconds);
		 		if(t.minutes==0 && t.seconds<=0){
		 			//console.log("this is before clear Interval"+t.seconds);
		 			clearInterval(timeinterval);
		 		console.log("Timeout");
		 			
		 			//setTimeout(recurse(),60000)
		 			recurse();
		 		}
		 	}
		 	update_clock(); // run function once at first to avoid delay
		 	var timeinterval = setInterval(update_clock,60);
		 }  
		 run_clock(deadline);
		 
		function recurse()
		{
			//debugger;
			that.onNext();
			//debugger;
		}
		
	    },
	    onPrevious: function(oEvent){
	    	//debugger;
	    	var simpleForm = this.getView().byId("idSF");
	    	var bindingCtx = simpleForm.getBindingContext().toString();
	    	var temp = bindingCtx.split("/");
	    	var index = parseInt(temp[2]);
	    	var prevQtn = index -1;
	    	if(prevQtn >= 0){
	    		simpleForm.bindElement("/questions/"+prevQtn);
	    	}else{
	    		sap.m.MessageToast.show("you are on the first question");
	    		
	    	}
	    	
	    }, 

	    
	    settimer: function(){
	           // debugger;
	    	function minuetes(s){
				   var min=Math.floor(s/60);
			  	   var sec=s%60;
				   return "TIME"+":"+(min)+ ':' + (sec); 
			   }
			
			var counter=0;
			var timeleft=600;
			var inp=this.getView().byId("idinp");
			inp.setValue(minuetes(timeleft-counter));
		
			var interval = setInterval(function(){
				counter++;
				inp.setValue(minuetes(timeleft-counter))
				if(counter==timeleft){
					clearInterval(interval)
					counter=0;
					alert("time over")    
					}
				
			},1000)
		},

	    selectedAnswer:[],
	    unanswered:[],
		 onAnswerQuestion : function(oEvent){
		    	//debugger;
		    	//;selected answers
		    	
		    	var selectedIndex = this.getView().byId("idQuestionRBG").getSelectedIndex();
		    	if(selectedIndex == 0){
		    		this.selectedAnswer.push("A");
		    	}else if(selectedIndex == 1){
		    		this.selectedAnswer.push("B");
		    	}else if(selectedIndex == 2){
		    		this.selectedAnswer.push("C");
		    	}else if(selectedIndex == 3){
		    		this.selectedAnswer.push("D");
		    	}else{
		    		this.selectedAnswer="Unanswered";
		    	} 
		    	
		    	//actual answers 
		    	/*var simpleForm = this.getView().byId("idSF");
		    	var bindingCtx = simpleForm.getBindingContext().getPath();
		    	var temp = bindingCtx.split("/");
		    	var index = parseInt(temp[2]); 
		        	
		    	 index=index+1;
		    	 debugger;
		    	ans1=this.getView().getModel().getData().questions[0].answer
		    	ans2=this.getView().getModel().getData().questions[1].answer
		    	ans3=this.getView().getModel().getData().questions[2].answer
		    	var answers=[ans1,ans2,ans3]
		    	//compare the selected answer,actual answer count the answers
		    	var correctcount="";
		    	if(selectedAnswer==answers){
		    		count++
		    	}*/
		 },
		// when click submit show the result
 		 Submit : function(){
 			var actualAnswers=[];
 			var count=0;
 			var unanswer=0;
 			
 			for( i=0;i<10;i++)
	    	{
	    	 actualAnswers.push(this.getView().getModel().getData().questions[i].answer);
	    	}
 			
 	
	    	for( i=0;i<10;i++)
	    	{
	    	 if(this.selectedAnswer[i]==actualAnswers[i])
	    	 {
	    	  ++count;
	    	 }
	    	 if(actualAnswers[i]==0)
	    		 ++unanswer;
	    	}
	    	//console.log("Your score is:"+ count);
	    	//console.log("Unanswered Questions are: "+unanswer);
	    	this.getView().byId("idres").setValue(count)
	    
	    	this.getView().byId("idunAns").setValue(unanswer)
	    //
			},
			
			getVisible : function(ic){
				
				//var radiobtn = this.getView().byId("idQuestionRBG");

		    	
		    //	 var checkbox = this.getView().byId("idVbox");
		   
				//debugger;
				/*if(ic == true){
					this.getView().byId("idVbox").setVisible(false);
				}
				if(ic == false){
					this.getView().byId("idQuestionRBG").setVisible(false)
				}
				*/
				
				
				
				
				/*if(ic == true){
					this.getView().byId("idVbox").setVisible(false);
				}
				else{
					this.getView().byId("idVbox").setVisible(true)
				}
				if(this.getView().byId("idVbox").setVisible(true)){
					
						this.getView().byId("idQuestionRBG").setVisible(false)
					}
			*/
				/*if(ic == false){
					this.getView().byId("idQuestionRBG").setVisible(false);
				}*/
				/*if(ic== false){ 
					this.getView().byId("idVbox").setVisible(true)
					this.getView().byId("idQuestionRBG").setVisible(false)
				}*/
				/*if(this.getView().byId("idVbox").setVisible(true)){ 
				
					this.getView().byId("idQuestionRBG").setVisible(false)
				}*/
					
			},
		
			
			
			
});
/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa = require('alexa-sdk');
var http = require('https');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = undefined;

const SKILL_NAME = 'Space Facts';
const GET_FACT_MESSAGE = "Here's your fact: ";
const HELP_MESSAGE = 'You can say tell me a space fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';


var spe,spe1;
//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================
function printError(error){
	//console.error(error.message);
}

const handlers = {
    'LaunchRequest': function () {
        var request = http.get("https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCq-Fj5jknLsUf-MWSy4_brA&key=AIzaSyADb3J3xsHSWRf95LbaNifLv9plAX_Kb1s", function(response){

		var body = "";
        //console.log('mello');
		response.on("data", function(chunk){
            body += chunk;
            //console.log('kello')
		});

		response.on("end", function(){
			if(response.statusCode === 200){
			try{
            var profile = JSON.parse(body);
            spe=profile.items[0].statistics.subscriberCount;
		}
		catch(error){
			printError(error);
		}
	}
	else{
		printError({message: "There was an error getting profile for " + "."});
	}
		});
	});

	// Connection Error
	request.on("error", (error)=>{this.response.speak('error');
	    
	});
	var request1 = http.get("https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UC-lHJZR3Gqxm24_Vd_AJ5Yw&key=AIzaSyADb3J3xsHSWRf95LbaNifLv9plAX_Kb1s", function(response){

		var body = "";
        //console.log('mello');
		response.on("data", function(chunk){
            body += chunk;
            //console.log('kello')
		});

		response.on("end", function(){
			if(response.statusCode === 200){
			try{
            var profile = JSON.parse(body);
            spe1=profile.items[0].statistics.subscriberCount;
		}
		catch(error){
			printError(error);
		}
	}
	else{
		printError({message: "There was an error getting profile for " + "."});
	}
		});
	});

	// Connection Error
	request1.on("error", (error)=>{this.response.speak('error');
	    
	});
	
	var sent="";
	if(spe<spe1){
		sent+="Pewdiepie is in the lead by "+(spe1.toString()-spe.toString()+',good going 9 year olds.');
	}
	else{
		sent+="T series is in the lead by "+(spe.toString()-spe1.toString()+' good going India.');
	}
	
         this.response.speak(sent);
        this.emit(':responseReady');
    },
    'stats': function () {
        var request = http.get("https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCq-Fj5jknLsUf-MWSy4_brA&key=AIzaSyADb3J3xsHSWRf95LbaNifLv9plAX_Kb1s", function(response){

		var body = "";
        //console.log('mello');
		response.on("data", function(chunk){
            body += chunk;
            //console.log('kello')
		});

		response.on("end", function(){
			if(response.statusCode === 200){
			try{
            var profile = JSON.parse(body);
            this.response.speak(profile.items[0].statistics.subscriberCount);
            //console.log();
			//printMessage(username, profile.badges.length, profile.points.JavaScript);
		}
		catch(error){
			//printError(error);
		}
	}
	else{
		//printError({message: "There was an error getting profile for " + username + "."})
	}
		});
	});

	// Connection Error
	request.on("error", (error)=>{this.response.speak('error');
	    
	});

            this.emit(':responseReady');


    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

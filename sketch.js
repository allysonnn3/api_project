var weather;
var api = 'http://api.openweathermap.org/data/2.5/weather?q=';
var apiKey = '&APPID=e1454cd8037cb114785952f03b4ea1cb';
var units = '&units=imperial';

//2nd API IT WORKS HALLELUJAH-----------------------
var api2 = "http://api.giphy.com/v1/gifs/search?";
var apiKey2 = "&api_key=DdSieaYL2MfPDysSc7O4zD2usDlJd4MP";
var query = "&q=sunny";//hot GIF
var query2 = "&q=cold";//cold GIF

var input;
var sel;

//TRYING TO PULL THE TEMPERATURE
var temp;


//SUN VARIABLES
var x;
var y;
var outsideRadius = 150;
var insideRadius = 100;



//color variables for shapes
var r, g, b;


//variable for gifs



function setup() { //asking to load the data
	var canX = canY = 400;
	var cnv = createCanvas(400,400);
	//cnv.position(window.innerWidth/4,window.innerHeight/4);//moves the canvas
  cnv.parent("cnv-div");



	//variables set to randomize colors of everything in canvas
	r = random(255);
	g = random(255);
	b = random(255);



	//mouse movement variables for SUN
	x = width/2;
	y = height/2;



	var button = select('#submit');
	//selected the button
	button.mousePressed(weatherAsk);
	//call weather function

	input = select('#city');



	function weatherAsk(){
		var url = api + input.value() + apiKey + units;
		//taking whatever city the user types in and calling that info
		loadJSON(url, function(data) {
        gotData(data, giphyAsk)
    }, 'jsonp');
		
		//ASYNC METHOD
	}

	//attempt to add API2-------------------------------
	//noCanvas();
	function giphyAsk(data){                 
    console.log(data)
    if(data.main.temp_min > 45) {
      var url = api2 + apiKey2 + query;
      loadJSON(url, gotGiphy);
    }
    else {
      var url2 = api2 + apiKey2 + query2;
      loadJSON(url2, gotGiphy);
    }
	}




} //end of function setup * * * * * * * * * * *


function gotData(data, callback){
	weather = data;
  callback(data);
	//retrieving data
}	


//API2 ATTEMPT to get GIF to show------------------------

function gotGiphy(giphy) {
	//for (var i = 0; i < giphy.data.length; i++){
    imageNumber = int(random(0, giphy.data.length-1))
		img = createImg(giphy.data[imageNumber].images.original.url);
    img.parent("contentId");
	//}

}





//callback for loading data

function draw () {//using the data
	background(250);

	strokeWeight(2);
	stroke(219, 217, 206);
	fill(r, g, b, 127);
	//allows ellipses to change color


	//SUN CREATION
	var numPoints = int(map(mouseX, 0, width, 6, 60));
	var angle = 0;
	var angleStep = 180.0/numPoints;




	if (weather) {
		textSize(16);
		var temp_max = weather.main.temp_max;//max temperature
		var temp_min = weather.main.temp_min;//min temperature
		ellipse(200, 170, weather.main.temp, weather.main.temp_max);
		ellipse(200, 260, weather.main.humidity, weather.main.temp_min);
		text(weather.main.temp_max+'\u02DA max', 185, 170); //prints out max temp
		text(weather.main.temp_min+'\u02DA min', 193, 260); //prints out min temp
	}


	//CREATING THE RANDOM SUN SHAPES

	beginShape(TRIANGLE_STRIP); 

	for (var i = 0; i <= numPoints; i++) {
	    var px = x + cos(radians(angle)) * outsideRadius;
	    var py = y + sin(radians(angle)) * outsideRadius;
	    angle += angleStep;
	    vertex(px, py);
	    px = x + cos(radians(angle)) * insideRadius;
	    py = y + sin(radians(angle)) * insideRadius;
	    vertex(px, py); 
	    angle += angleStep;
	  }
	  endShape();

	}


//function if mouse clicks on ellipse TEMP

function mousePressed() {
  // Check if mouse is clickin
  var d = dist(mouseX, mouseY, 100, 100);
  //USER CAN CLICK ANYWHERE IN THE CANVAS TO CHANGE COLOR
  if (d < 400) {
    // Pick new random color values
    r = random(255);
    g = random(255);
    b = random(255);
  }
}



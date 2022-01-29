prediction= "";
Webcam.set({
width: 350,
height:300,
image_format:'png',
png_quality: 100
});
Webcam.attach("#camera");
function capture(){
  Webcam.snap(function (selfie){
document.getElementById("result").innerHTML="<img id= 'img'src="+selfie+">";


  });
  

}
console.log("ml5 version",ml5.version);
tm_model= ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/YDkFJKD5K/model.json",modelLoaded);
function modelLoaded(){
    console.log("Model is loaded");

}
function predict(){
img= document.getElementById("img");
tm_model.classify(img,gotResult);

}
function gotResult(error,result){
if(error){
    console.error(error);
}
else{
console.log(result);
document.getElementById("result_emotion_name").innerHTML=result[0].label;
prediction= result[0].label;
speak();
if(result[0].label=="victory"){
    document.getElementById("emoji").innerHTML="&#9996;";
    
}
if(result[0].label=="thumbs up"){
    document.getElementById("emoji").innerHTML="&#128077;";
    
}
if(result[0].label=="excellent"){
    document.getElementById("emoji").innerHTML="&#128076;";
    
}
}
}
function speak(){
    api= window.speechSynthesis;
    
    speech_data="The prediction is that you are "+prediction ;
    utter= new SpeechSynthesisUtterance(speech_data);
    api.speak(utter);
}
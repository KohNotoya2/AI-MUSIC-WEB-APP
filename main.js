song1="";
song2="";

leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;

scoreLeftWrist=0;
scoreRightWrist=0;

song_1status="";
song_2status="";

function preload() {
    song1=loadSound("song1.mp3");
    song2=loadSound("song2.mp3");
}

function setup() {
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses)
}

function modelLoaded() {
    console.log("PoseNet is initialized");
}

function draw() {
    image(video,0,0,600,500);

    song_1status=song1.isPlaying()
    song_2status=song2.isPlaying();

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreLeftWrist>0.2) {
        circle(leftWristX,leftWristY,20);
        song2.stop()

        if(song_1status==false) {
            song1.play()
            document.getElementById("song_name").innerHTML="Song Playing is :Empire State of Mind";
        }
    }

    if(scoreRightWrist>0.2) {
        circle(leftWristX,leftWristY,20);
        song1.stop()

        if(song_2status==false) {
            song2.play()
            document.getElementById("song_name").innerHTML="Song Playing is :All I want for Christmas is You";
        }
    }
}

function gotPoses(results) {
    if(results.length>0) {
        console.log(results);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        scoreRightWrist=results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist ="+scoreLeftWrist);

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("LeftWristX = " + leftWristX + "LeftWristY = " + leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("RightWristX = " + rightWristX +"RightWristY = " + rightWristY);
    }
}
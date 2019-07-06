let constraints = { video: { facingMode: "user" }, audio: false };
/*{audio: true, video: { facingMode: { exact: "environment" } } }*/
/*{ video: { deviceId: myPreferredCameraDeviceId } }*/

const cameraView = document.querySelector("#camera--view"),
  cameraOutput = document.querySelector("#camera--output"),
  cameraSensor = document.querySelector("#camera--sensor"),
  cameraTrigger = document.querySelector("#camera--trigger");

function cameraStart() {
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function(stream) {
      track = stream.getTracks()[0];
      cameraView.srcObject = stream;
    })
    .catch(function(error) {
      console.error("Oops. Something is broken.", error);
    });
}

cameraTrigger.onclick = function() {
  cameraSensor.width = cameraView.videoWidth;
  cameraSensor.height = cameraView.videoHeight;
  cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
  cameraSensor.style.display = "block";
  cameraView.style.display = "none";
  /*cameraOutput.src = cameraSensor.toDataURL("image/webp");
  cameraOutput.classList.add("taken");*/
};

window.addEventListener("load", cameraStart, false);

modalBtn = document.getElementById("modal-btn");
console.log(modalBtn);
modalBtn.onclick = function() {
  cameraSensor.style.display = "none";
  if (cameraView.style.display === "none") {
    cameraView.style.display = "block";
  }
};

saveBtn = document.getElementById("save-btn");
console.log(saveBtn);
saveBtn.onclick = () => {
  /*cameraOutput.src = cameraSensor.toDataURL("image/webp");
  cameraOutput.classList.add("taken");*/
  var img = document.createElement("img");
  img.src = cameraSensor.toDataURL("image/webp");
  img.classList.add("taken");
  document.body.appendChild(img);

  if (cameraSensor.style.display === "block") {
    cameraSensor.style.display = "none";
  }
  if (cameraView.style.display === "none") {
    cameraView.style.display = "block";
  }
};

/*function convertCanvasToImage(canvas) { 	var image = new Image(); 	image.src = canvas.toDataURL("image/png"); 	return image; }*/
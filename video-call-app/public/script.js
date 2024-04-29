// Initialize Peer object
const myPeer = new Peer();

// Get user media and stream it to video element
navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {
  addVideoStream(document.getElementById('video-grid'), stream);

  myPeer.on('call', call => {
    call.answer(stream);
    const video = document.createElement('video');
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream);
    });
  });

  // Event listener for starting a call
  document.getElementById('start-call').addEventListener('click', () => {
    const call = myPeer.call('remote-peer-id', stream);
    const video = document.createElement('video');
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream);
    });
  });
});

// Function to add video stream to video element
function addVideoStream(videoElement, stream) {
  videoElement.srcObject = stream;
  videoElement.addEventListener('loadedmetadata', () => {
    videoElement.play();
  });
}

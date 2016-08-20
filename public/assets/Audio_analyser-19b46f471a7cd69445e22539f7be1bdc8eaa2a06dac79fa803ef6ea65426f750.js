function initAudio(){initVisualizer();try{window.AudioContext=window.AudioContext||window.webkitAudioContext,audioContext=new AudioContext}catch(o){alert("Web Audio API is not supported in this browser")}loadAudio(url)}function initAnalyzer(){analyzer=audioContext.createAnalyser(),audioSource.connect(analyzer),analyzer.connect(audioContext.destination),analyzeAudio()}function analyzeAudio(){window.requestAnimationFrame(analyzeAudio),audioData=new Uint8Array(analyzer.frequencyBinCount),analyzer.getByteFrequencyData(audioData),detectBeats(audioData)}function getFrequencyValue(o){if(void 0!==audioData){var a=audioContext.sampleRate/2,n=Math.round(o/a*audioData.length);return audioData[n]}return null}function loadAudio(o){var a=new XMLHttpRequest;a.open("GET",o,!0),a.responseType="arraybuffer",a.onload=function(){audioContext.decodeAudioData(a.response,function(o){audioBuffer=o,playAudio(audioBuffer)},onError)},a.send()}function playAudio(o){playing=!0,audioSource=audioContext.createBufferSource(),audioSource.buffer=o,initAnalyzer(),audioSource.start()}function onError(){console.log("ERROR: Failed to decode audio data")}function toggleAudio(){playing===!1?(playing=!0,playAudio(audioBuffer)):(playing=!1,audioSource.stop())}function isPlaying(){return playing}function detectBeats(o){for(var a=0;a<o.length/2;a++)if(o[a]>250)return void console.log("beat")}var audioContext,audioBuffer,url="/audios/Not For Nothing.mp3",audioSource,playing,analyzer,audioData;
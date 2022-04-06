import './App.css';
import { useState, useCallback, useRef } from 'react';
import Webcam from "react-webcam";
import sadImg from './Assets/Sad.jpg';
import happyImg from './Assets/Happy.jpg';
import contemptImg from './Assets/Contempt.jpg';
import fearImg from './Assets/Fear.jpg';
import disgustImg from './Assets/Disgust.jpg';
import surpriseImg from './Assets/Surprise.jpg';
import angerImg from './Assets/Anger.jpg';
import axios from 'axios';

function App() {
  const [isPending, setIsPending] = useState(false);
  const [sad, setSad] = useState(false);
  const [thanks, setThanks] = useState(false);
  const [home, setHome] = useState(true);
  const [fear, setFear] = useState(false);
  const [disgust, setDisgust] = useState(false);
  const [anger, setAnger] = useState(false);
  const [surprise, setSurprise] = useState(false);
  const [happy, setHappy] = useState(false);
  const [contempt, setContempt] = useState(false);
  const [saImage,setSaImage] = useState('');
  const [coImage,setCoImage]=useState('');
  const [haImage,setHaImage] = useState('');
  const [suImage,setSuImage] = useState('');
  const [fImage,setFImage] = useState('');
  const [diImage,setDiImage] = useState('');
  const [anImage,setAnImage] = useState('');


  const toggle = () => {
    setSad(true);
    setHome(false);
  }

  const toggle1 = () => {
    setHappy(false);
    setContempt(true);
  }

  const toggle3 = () => {
    setSad(false);
    setHappy(true);
  }

  const toggle4 =() =>{
    setContempt(false);
    setFear(true);
  }

  const toggle5 = () =>{
    setFear(false);
    setAnger(true);
  }

  const toggle6 = () =>{
    setAnger(false);
    setDisgust(true);
  }
  
  const toggle7 = () =>{
    setDisgust(false);
    setSurprise(true);
  }

  const imageProUp = async (imageLocation, preset_name) => {
    const data = new FormData()
    data.append('file', imageLocation)
    data.append('upload_preset', preset_name)
    await axios.post('https://api.cloudinary.com/v1_1/dukwkk7ti/image/upload', data)
    .then(res => {
      console.log(res);
    })
    .catch(error=>{
      console.log(error);
    })
  }

  const upload = async () =>{
    setIsPending(true);
    imageProUp(saImage,'sad-preset');
    imageProUp(haImage,'happy-preset');
    imageProUp(suImage,'suprise-preset');
    imageProUp(anImage,'anger-preset');
    imageProUp(diImage,'disgust-preset');
    imageProUp(coImage,'contempt-preset');
    imageProUp(fImage,'fear-preset')
    .then(
      setIsPending(false),
      setSurprise(false),
      setThanks(true)
    )
  }
  
  const videoConstraints = {
    width: 220,
    height: 200,
    facingMode: "user"
  };

  const webcamRef = useRef(null);

  const capture = useCallback(
    (context) => {
    const imageSrc = webcamRef.current.getScreenshot();
    context(imageSrc);
  })

  return (
    <div className="App">
      <div className="everything">
      {home && <div className="home">
        <h1 className="welcome-txt">
          Welcome to the Survey Project
        </h1>
        <div className="consent">
        <h3>Informed Consent to Participate in a Research Study</h3>
<p>AFE BABALOLA UNIVERSITY, ADO-EKITI, EKITI STATE, NIGERIA
  <br />
<span className="bold">Title of Research Project</span>: FACIAL EMOTIONAL RECOGNITION USING CONVOLUTIONAL NEURAL
NETWORKS. (Working title)<br />
<span className="bold">Name of Principal Investigator</span>: ADEROJU OLUWAFIKEMI ADEBOSOLA <br />
<span className="bold">Email of Principal Investigator</span>: fikemiaderoju@gmail.com <br /><br />
<span className="bold">Name of Supervisor</span>: Akinola S. O.<br />
<span className="bold">Email of Supervisor</span>: soakinola@abuad.edu.ng <br />
<br />
<span className="bold">A. PURPOSE AND BACKGROUND</span>
<p><b>OLUWAFIKEMI ADEROJU</b> is researching Emotional Facial Recognition Using the Deep Neural Networks
approach. The purpose of your participation in this research is to help the researcher improve the level
of accuracy of emotional facial classification. It is vital for people of colour who are not substantially
captured during the data collection process.</p>
<br />
<span className="bold">B. CONFIDENTIALITY</span>
<p>The data collected for this study will be kept as confidential as possible. No individual identities will be
used in any reports or publications resulting from the study. All sourced data will be given codes and
stored separately from any names or other direct identification of participants. Research information
will be kept in secured files at all times. Only research personnel will have access to the files, and only
those with an essential need to see names or other identifying information will have access to that
particular file.</p>
<br />
<span className="bold">C. VOLUNTARY PARTICIPATION</span>
<p>Your decision on whether or not to participate in this study is voluntary and will not affect your
relationship with <b>Fikemi Aderoju</b>. If you choose not to participate in this study, you can withdraw your
consent and discontinue participation without prejudice.</p><br />
<span className="bold">D. QUESTIONS</span>
<p>If you have any questions about the study, please get in touch with <b>Fikemi Aderoju</b> by sending an email
to <b>fikemiaderoju@gmail.com</b>. </p> <br /><br />
<span className="bold">CONSENT</span>
<br />
<p>YOU ARE MAKING A DECISION WHETHER OR NOT TO PARTICIPATE IN A RESEARCH STUDY. YOUR
SELECTION OF ACCEPTANCE BELOW INDICATES THAT YOU HAVE DECIDED TO PARTICIPATE IN THE
STUDY AFTER READING ALL THE INFORMATION ABOVE, AND YOU UNDERSTAND THE INFORMATION IN
THIS FORM.</p><br /></p>
        </div>
        <div className="acceptance">
          <button className="accept" title="Accept" onClick={toggle}>Accept</button>
          <button className="decline" onclick={window.open('', '_self', '')} title="Decline">Decline</button>
        </div>
      </div>}
      {sad && 
      <div className="sad">
        <h1 className="sad-head head">
          Sad
        </h1>
        <div className="image-container">
        {saImage === '' ?<Webcam
        audio={false}
        height={220}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={220}
        videoConstraints={videoConstraints}
      /> : <img src={saImage} alt="Sad" className="webcam-img" />}
      </div>
      <div className="instruction">
        <p className="instrucion-set">
          <b>Note: </b> Take the corners of your mouth and take them as far as they can go then puff out lower lip (even if it
quivers, that’s fine) then pinch the inner corners of your eyebrows together. You might start to tear up. 
        </p>
        <p>e.g</p>
        <img src={sadImg} alt="" className="example" />
      </div>
      {saImage!==''?
      <div className="btn-taken">
<button onClick={(e)=>
{
e.preventDefault();
setSaImage('')
}}
className="webcam-btn retake">
Retake Image</button> 
<button className="webcam-btn next" onClick={toggle3}>Next</button>
</div>:
<button onClick={(e)=>{
e.preventDefault();
capture(setSaImage);
}}
className="webcam-btn capture">Capture</button>
}
      </div>
      }
      {happy && 
      <div className="happy">
        <h1 className="happy-head head">
          Happy
        </h1>
        <div className="image-container">
        {haImage === '' ?<Webcam
        audio={false}
        height={220}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={220}
        videoConstraints={videoConstraints}
      /> : <img src={haImage} alt="Happy" className="webcam-img" />}
      </div>
      <div className="instruction">
        <p className="instrucion-set">
          <b>Note: </b>It’s not just a smile. When your upper cheek muscles are engaged or you can bite down on a finger to really engage your cheek muscles.</p>
        <p>e.g</p>
        <img src={happyImg} alt="" className="example" />
      </div>
      {haImage!==''?
      <div className="btn-taken">
<button onClick={(e)=>
{
e.preventDefault();
setHaImage('')
}}
className="webcam-btn retake">
Retake Image</button> 
<button className="webcam-btn next" onClick={toggle1}>Next</button>
</div>:
<button onClick={(e)=>{
e.preventDefault();
capture(setHaImage);
}}
className="webcam-btn capture">Capture</button>
}
      </div>  
      }
      {contempt && 
      <div className="contempt">
        <h1 className="contempt-head head">
          Contempt
        </h1>
        <div className="image-container">
        {coImage === '' ?<Webcam
        audio={false}
        height={220}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={220}
        videoConstraints={videoConstraints}
      /> : <img src={coImage} alt="Contempt" className="webcam-img" />}
      </div>
      <div className="instruction">
        <p className="instrucion-set">
          <b>Note: </b>Simply a one side mouth raise. An asymmetric smirk.</p>
        <p>e.g</p>
        <img src={contemptImg} alt="" className="example" />
      </div>
      {coImage!==''?
      <div className="btn-taken">
<button onClick={(e)=>
{
e.preventDefault();
setCoImage('')
}}
className="webcam-btn retake">
Retake Image</button> 
<button className="webcam-btn next" onClick={toggle4}>Next</button>
</div>:
<button onClick={(e)=>{
e.preventDefault();
capture(setCoImage);
}}
className="webcam-btn capture">Capture</button>
}

      </div>  
      }
      {fear && 
      <div className="contempt">
        <h1 className="contempt-head head">
          Fear
        </h1>
        <div className="image-container">
        {fImage === '' ?<Webcam
        audio={false}
        height={220}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={220}
        videoConstraints={videoConstraints}
      /> : <img src={fImage} alt="Contempt" className="webcam-img" />}
      </div>
      <div className="instruction">
        <p className="instrucion-set">
          <b>Note: </b>Open your eyes and eyebrows really wide by pulling your eyebrows up.</p>
        <p>e.g</p>
        <img src={fearImg} alt="" className="example" />
      </div>
      {fImage!==''?
      <div className="btn-taken">
<button onClick={(e)=>
{
e.preventDefault();
setFImage('')
}}
className="webcam-btn retake">
Retake Image</button> 
<button className="webcam-btn next" onClick={toggle5}>Next</button>
</div>:
<button onClick={(e)=>{
e.preventDefault();
capture(setFImage);
}}
className="webcam-btn capture">Capture</button>
}

      </div>  
      }
      {anger && 
      <div className="anger">
        <h1 className="anger-head head">
          Anger
        </h1>
        <div className="image-container">
        {anImage === '' ?<Webcam
        audio={false}
        height={220}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={220}
        videoConstraints={videoConstraints}
      /> : <img src={anImage} alt="Anger" className="webcam-img" />}
      </div>
      <div className="instruction">
        <p className="instrucion-set">
          <b>Note: </b>Two vertical lines between your eyebrows come up when you pull your eyebrows down and harden your lip when you do it, you notice you feel a little irritated that’s called The Facial Feedback Hypothesis.</p>
        <p>e.g</p>
        <img src={angerImg} alt="" className="example" />
      </div>
      {anImage!==''?
      <div className="btn-taken">
<button onClick={(e)=>
{
e.preventDefault();
setAnImage('')
}}
className="webcam-btn retake">
Retake Image</button> 
<button className="webcam-btn next" onClick={toggle6}>Next</button>
</div>:
<button onClick={(e)=>{
e.preventDefault();
capture(setAnImage);
}}
className="webcam-btn capture">Capture</button>
}
</div>  
      }
{disgust && 
      <div className="disgust">
        <h1 className="disgust-head head">
          Disgust
        </h1>
        <div className="image-container">
        {diImage === '' ?<Webcam
        audio={false}
        height={220}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={220}
        videoConstraints={videoConstraints}
      /> : <img src={diImage} alt="Disgust" className="webcam-img" />}
      </div>
      <div className="instruction">
        <p className="instrucion-set">
          <b>Note: </b>The face you make when you smell something bad or do not like something. Show your upper teeth and crinkle your nose to make an “ughh” gesture. </p>
        <p>e.g</p>
        <img src={disgustImg} alt="" className="example" />
      </div>
      {diImage!==''?
      <div className="btn-taken">
<button onClick={(e)=>
{
e.preventDefault();
setDiImage('')
}}
className="webcam-btn retake">
Retake Image</button> 
<button className="webcam-btn next" onClick={toggle7}>Next</button>
</div>:
<button onClick={(e)=>{
e.preventDefault();
capture(setDiImage);
}}
className="webcam-btn capture">Capture</button>
}
      </div>  
      }
      {surprise && 
      <div className="surprise">
        <h1 className="surprise-head head">
          Surprise
        </h1>
        <div className="image-container">
        {suImage === '' ?<Webcam
        audio={false}
        height={220}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={220}
        videoConstraints={videoConstraints}
      /> : <img src={suImage} alt="Disgust" className="webcam-img" />}
      </div>
      <div className="instruction">
        <p className="instrucion-set">
          <b>Note: </b>You raise up your eyebrows as far as you can then open your mouth as wide as possible.</p>
        <p>e.g</p>
        <img src={surpriseImg} alt="" className="example" />
      </div>
      {suImage!==''?
      <div className="btn-taken">
<button onClick={(e)=>
{
e.preventDefault();
setSuImage('')
}}
className="webcam-btn retake">
Retake Image</button> 
<button className="webcam-btn next" onClick={upload}>{isPending ? <p>Uploading</p> : <p>Upload</p>}</button>
</div>:
<button onClick={(e)=>{
e.preventDefault();
capture(setSuImage);
}}
className="webcam-btn capture">Capture</button>
}
      </div>  
      }

      {
        thanks &&
        <div className="thanks">
          <h1 className="appreciation">Thanks for participating in this survey.</h1>
        </div>
      }

      </div>
    </div>
  );
}

export default App;

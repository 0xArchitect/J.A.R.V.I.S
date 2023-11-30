import FLIGHT_CHECKER from 'assets/audio-video/flight-checker-circle.mp4';
import UI_LEFT from 'assets/audio-video/UI-left.mp4';
import UI_RIGHT from 'assets/audio-video/UI-right.mp4';
import { ReactComponent as PageDecoration } from 'assets/images/img-flight-list-page-decoration.svg';
import Button from 'components/Button';
import PassengersSocialButtons from 'components/PassengersSocialButtons';
import { FlightState } from 'constants/common';
import gsap, { Power2, Power4 } from 'gsap';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sound from 'utils/sound';
import axios from "axios";
import send from "../../../assets/images/sendPrompt.png"


interface FlightListBackgroundProps {
  playing: boolean;
  status: FlightState;
}

export default function FlightListBackground({ playing, status }: FlightListBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const uiLeftRef = useRef<HTMLVideoElement>(null);
  const uiRightRef = useRef<HTMLVideoElement>(null);
  const uiVideosRef = useRef(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([""]);
  const [id, setID] = useState("");

  const[follow, setFollow] = useState([""]);

  const [prompt, setPrompt] = useState("");
  // const [userchats, setUserChats] = useState([""]);
  // const [aichats, setAichats] = useState([""]);

  const navigate = useNavigate();
  const [mutedAudio, setMutedAudio] = useState(Sound.getMute());

  const handlepromptChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt((e.target.value)); 
  };


  useEffect(() => {
    Sound.setMute(mutedAudio);
  }, [mutedAudio]);

  useEffect(() => {
    if (!videoRef.current || !uiLeftRef.current || !uiRightRef.current || !uiVideosRef.current)
      return;

    if (playing) {
      videoRef.current.play();
      uiLeftRef.current.play();
      uiRightRef.current.play();

      gsap.to(uiVideosRef.current, { opacity: 1, duration: 3, ease: Power2.easeInOut});
      return;
    }

    videoRef.current.pause();
    uiLeftRef.current.pause();
    uiRightRef.current.pause();

    gsap.to(uiVideosRef.current, { opacity: 0, duration: 1, ease: Power4.easeIn});
  }, [playing]);

  useEffect(() => {
    if (status === FlightState.FlightSpots || status === FlightState.NoDataFound)
      gsap.to(videoRef.current, { opacity: 0, duration: 1, display: "none", zIndex: -100});
  });

  function toggleAudio() {
    setMutedAudio((muted) => !muted);
  }

  function goHome() {
    navigate('/');
  }

  async function promptExec(prompt: string){
    try{
      const arr = data;
      setLoading(true);

      console.log(prompt, id);
      if(id === ""){
        console.log("no id")
        await axios.post("https://jesusai-dyvdf.ondigitalocean.app/rest/chat", {chatId: id ,chat: prompt}).then((res: any)=>{console.log(res); arr.pop(); arr.push(res.data.result); setID(res.data.chatId); setLoading(false)}).catch((err)=>{setLoading(false)});
      }

      else{
        await axios.post("https://jesusai-dyvdf.ondigitalocean.app/rest/chat", {chat: prompt}).then((res: any)=>{console.log(res); arr.pop(); arr.push(res.data.result); setLoading(false)}).catch((err)=>{setLoading(false)});;
      }


      setData(arr);
      console.log("DONE");
      
    }
    catch(err){
      console.log(err);
    }
  }

  async function followUp(){
    console.log("followup", id)
    if(id){

      try{
        const arr = follow;
        await axios.post("https://jesusai-dyvdf.ondigitalocean.app/rest/chat/followup", {chatId: id }).then((res: any)=>{
          console.log(res.data.result); 
          const result = res.data.result;
          const followups = result.split("\n");
  
          console.log(followups);
        })
      }
      catch(err){
        console.log(err);
      }
    }
  }

  useEffect(() => {
    if (data) {
      contentRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [data, prompt]);

  useEffect(()=>{
    followUp();
  }, [data])


  return (
    <div className="cover h-screen w-screen bg-gradient-to-tr from-[rgb(32,35,102)] to-black overflow-hidden relative pt-[60px]">
      <div className="h-full w-full relative">
        <div className="cover flex justify-center items-center overflow-hidden">
          <div
            ref={uiVideosRef}
            className="mix-blend-screen min-w-[20vh] flex h-full w-full opacity-0"
          >
            <video ref={uiLeftRef} src={UI_LEFT} muted playsInline loop className="h-full max-[1000px]:hidden" />

           

            {status === FlightState.FlightSpots || status === FlightState.NoDataFound && <div className='relative z-[50] overflow-scroll noscr p-5 w-[50%] max-[1000px]:w-full h-[80%] mt-10 pb-20'>

            <div className='mx-auto text-center'>
                  <h4 className='prompt text-cyan-400 min-[801px]:text-[3vw] text-[7vw]'>[ j.a.r.v.i.s. ]</h4>
                </div>

             <div className=' w-[50%] block mt-10'>
                  <h4 className='prompt text-yellow-400 bg-gradient-to-b min-[801px]:text-[1.3vw] text-[4vw] from-blue-400/10 to-blue-400/20 p-5'>Greetings, my friend. I am J.A.R.V.I.S. may I kindly ask your name?</h4>
              </div> 

          <div className=''>

              {data.map((chat, i)=>(
                

                <div className={`${i == 0 && "hidden"} ${chat === ""? "p-5": "p-5"} w-[70%] my-5 flex ${i%2 == 0 ? "bg-gradient-to-b from-blue-400/10 to-blue-400/20": "bg-cyan-400 float-right"}`}>
                <h4 className={` ${i%2 == 0? "text-yellow-400 " : "text-black"} min-[801px]:text-[1.3vw] text-[4vw] prompt `}>{i == data.length-1 && loading ? "...": chat}</h4>
   
              
            </div>
                 
              )) }
        
             
              
              <form onSubmit={(e)=>{

                e.preventDefault();

                const arr = data;

                if(prompt !== ""){

                  promptExec(prompt);
                  arr.push(prompt);
                  arr.push("");
                  setData(arr);
                  setPrompt("");
                }
              }} className='fixed w-[47%] max-[1000px]:w-[95%] bottom-12 mx-auto flex z-[50] border-[1px] border-cyan-400'>
              <input placeholder="Write a message..." disabled={loading} type="text" value={prompt} onChange={handlepromptChange} className="w-[95%] min-[801px]:text-[1.3vw] text-[4.5vw] text-cyan-400 text-lg bg-transparent  rounded-lg py-8 min-[801px]:py-4 px-5 prompt ">
                </input>
                <button type='submit' className='mx-3 rounded-full'>
                  <img className='w-[80%] -rotate-90 shadow-xl hover:shadow-cyan-400/30 rounded-full' src={send}/>
                </button>
              </form>
              <div ref={contentRef} />
        </div>
            </div>}


            <video ref={uiRightRef} src={UI_RIGHT} muted playsInline loop className="h-full max-[1000px]:hidden" />
          </div>
          { status === FlightState.FlightSpots || status === FlightState.NoDataFound ? null :<div className="cover mix-blend-screen justify-center items-center h-full w-full absolute z-[0]">
            <div className="flex flex-1" />
            <video
              ref={videoRef}
              src={FLIGHT_CHECKER}
              muted
              playsInline
              autoPlay
              loop
              className="h-full object-cover abs-center-x"
            />
            
            <div className="flex flex-1" />
          </div>}
        </div>
      </div>
      <div className="absolute left-0 top-0 h-full mix-blend-screen" />
      <div className="absolute right-0 top-0 h-full mix-blend-screen" />
      <div className="absolute top-8 w-full px-20 hidden md:block" />
      <div className="fixed top-0 w-full h-[10%] bg-gradient-to-t from-[rgba(12,255,255,0)] to-[rgb(0,240,255)] opacity-20" />
      <div className="fixed bottom-0 w-full h-[10%] z-[-10] bg-gradient-to-b from-[rgba(12,255,255,0)] to-[rgb(0,240,255)] opacity-20" />
      <div className="fixed top-10 right-10 left-10 flex justify-between pointer-events-auto">
        <Button onClick={goHome} small={false}>
          home
        </Button>
        <div className="flex-1  px-8 items-center hidden md:flex">
          <div className="w-full relative">
            <PageDecoration />
            <div className="absolute bottom-[1px] left-[100px] right-8 h-[1px] bg-primary-blue" />
          </div>
        </div>
        
        <div className="flex flex-grow-0">
          <PassengersSocialButtons muteButton muted={mutedAudio} onToggleMusic={toggleAudio} />
        </div>
      </div>
    </div>
  );
}

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


interface FlightListBackgroundProps {
  playing: boolean;
  status: FlightState;
}

export default function FlightListBackground({ playing, status }: FlightListBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const uiLeftRef = useRef<HTMLVideoElement>(null);
  const uiRightRef = useRef<HTMLVideoElement>(null);
  const uiVideosRef = useRef(null);

  const [prompt, setPrompt] = useState("");

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


  return (
    <div className="cover h-screen w-screen bg-gradient-to-tr from-[rgb(32,35,102)] to-black overflow-hidden relative pt-[60px]">
      <div className="h-full w-full relative">
        <div className="cover flex justify-center items-center overflow-hidden">
          <div
            ref={uiVideosRef}
            className="mix-blend-screen min-w-[175vh] flex justify-between h-full w-full opacity-0"
          >
            <video ref={uiLeftRef} src={UI_LEFT} muted playsInline loop className="h-full " />


            <div className='relative z-[50] bg-cyan-500/10 border-2 p-5 border-cyan-400 w-full h-[90%] my-auto'>

             <div className='bg-cyan-600/40 p-5 w-[50%] block'>
                  <h4 className=''>Hello, i am J.A.R.V.I.S, your personal AI assistant. Ask me anything!</h4>
              </div> 
              
              <div className='absolute w-[97.5%] bottom-3 mx-auto flex z-[50]'>
              <input placeholder="Type something..." type="text" value={prompt} onChange={handlepromptChange} className="w-[95%] text-cyan-400 text-lg bg-cyan-600/10 border-[1px] border-cyan-400 rounded-lg py-4 px-5 prompt ">
                </input>
                <div className='hover:from-cyan-300 hover:to-cyan-700/30 bg-gradient-to-tr from-cyan-400 to-cyan-800/30 py-4 px-5 mx-3 rounded-lg border-[1px] text-lg border-cyan-400'>
                  <h4>Ask</h4>
                </div>
              </div>
            </div>


            <video ref={uiRightRef} src={UI_RIGHT} muted playsInline loop className="h-full " />
          </div>
          <div className="cover mix-blend-screen justify-center items-center h-full w-full absolute z-[-20]">
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
          </div>
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

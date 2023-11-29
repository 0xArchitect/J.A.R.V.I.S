import { FlightState, PASSENGERS_API_CHECK } from 'constants/common';

import FlightListBackground from 'components/FlightList/FlightListBackground';
import FlightListButtons from 'components/FlightList/FlightListButtons';
import FlightListContent from 'components/FlightList/FlightListContent';
import React, { useEffect, useMemo, useState } from 'react';
import { FlightResponse } from 'types/interface';
import Sound, { audio } from 'utils/sound';

const { connor1, connor2, connor3 } = audio;

export default function FlightList() {
  const error = null;

  const [flightData, setFlightData] = useState<FlightResponse | undefined>();
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [userEntered, setUserEntered] = useState(false);

  const noData = useMemo(() => {
    if (!flightData) return true;
    return !flightData.flight && !flightData.og && !flightData.reserve;
  }, [flightData]);

  const state = useMemo(() => {
    if (!userEntered) return FlightState.EnterScreen;
    if (!isConnected! && !isLoading && !error) return FlightState.Console;
    if (isLoading || isLoadingData) return FlightState.CheckingProgress;
    if (error || noData) return FlightState.NoDataFound;

    return FlightState.FlightSpots;
  }, [userEntered, isLoading, isConnected, error, isLoadingData, noData]);

  useEffect(() => {
    if (state === FlightState.Console) {
      Sound.play(connor1);
      return () => Sound.stop(connor1);
    }
    if (state === FlightState.FlightSpots) {
      Sound.play(connor2);
      return () => Sound.stop(connor2);
    }
    return undefined;
  }, [state]);

  useEffect(() => {
    if (state !== FlightState.NoDataFound) return undefined;

    Sound.play(connor3);
    Sound.playFlightSfxError();

    return () => {
      Sound.stop(connor3);
      Sound.stop(audio.flightSfxError);
    };
  }, [state]);

  useEffect(
    () => () => {
      audio.flightSfxAmbience.pause();
      audio.flightSfxUiBegins.pause();
      audio.flightSfxError.pause();
      audio.connor1.pause();
      audio.connor2.pause();
      audio.connor3.pause();
    },
    []
  );

  function onEnterConsole() {
    setUserEntered(true);
    Sound.playFlightAmbience();
    Sound.playFlightSfxUiBegins();
  }

  function onCheckFlightStatus() {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsConnected(true);
    }, 1000);
  }

  const videosPlaying = state !== FlightState.EnterScreen;

  return (
    <div className="passengers h-screen w-screen overflow-hidden">
      <FlightListBackground playing={videosPlaying} status={state} />
      <div className="h-full w-full pt-[96px] pointer-events-none">
        {state !== FlightState.NoDataFound && <div className="h-full w-full relative pointer-events-auto z-[10]">
          <FlightListButtons
            onCheckFlightStatus={onCheckFlightStatus}
            onEnterConsole={onEnterConsole}
            state={state}
          />
          <FlightListContent state={state} />
        </div>}
      </div>
    </div>
  );
}

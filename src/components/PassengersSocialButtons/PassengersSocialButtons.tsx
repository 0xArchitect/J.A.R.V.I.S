import { SOCIAL_MEDIA } from 'constants/common';

import { ReactComponent as IcMenu } from 'assets/icons/ic-menu.svg';
import Button from 'components/Button';
import React, { useEffect, useState } from 'react';
import * as THREE from 'three';

interface PassengerSocialButtonsProps {
  muted?: boolean;
  onToggleMusic?: () => void;
  openMobileMenu?: () => void;
  muteButton?: boolean;
  mobileMenu?: boolean;
  socialsEnabled?: boolean;
}

export default function PassengersSocialButtons({
  muteButton,
  openMobileMenu,
  mobileMenu,
  socialsEnabled,
  ...props
}: PassengerSocialButtonsProps) {
  function openLink(to: string) {
    return () => window.open(to);
  }
  const { discord, twitter, telegram } = SOCIAL_MEDIA.passenger;
  const TwitterIcon = twitter.icon;
  const DiscordIcon = discord.icon;
  const TeleIcon = telegram.icon;
  return (
    <div className="flex flex-row-reverse w-full justify-between transition-all">
      {(muteButton || mobileMenu) && (
        <div className="flex row gap-6">
          {muteButton && <MusicButton {...props} />}
          {mobileMenu && (
            <Button onClick={openMobileMenu}>
              <IcMenu />
            </Button>
          )}
        </div>
      )}
      {socialsEnabled && (
        <div className="flex row gap-6">
          <Button onClick={openLink(discord.link)}>
            <DiscordIcon />
          </Button>
          <Button onClick={openLink(twitter.link)}>
            <TwitterIcon />
          </Button>
          <Button onClick={openLink(telegram.link)}>
          <svg stroke="white" fill="white" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"></path></svg>
          </Button>
        </div>
      )}
    </div>
  );
}

const MIN_SCALE = 0.1;
const ANIMATION_DURATION = 0.2;
const BARS = [0, 1, 2];
function MusicButton({ muted, onToggleMusic }: PassengerSocialButtonsProps) {
  return (
    <Button onClick={onToggleMusic}>
      <div className="flex flex-1 justify-between h-full w-full">
        {BARS.map(v => (
          <AnimatedBar animated={!muted} key={v} />
        ))}
      </div>
    </Button>
  );
}

interface AnimatedBarProps {
  animated: boolean;
}
function AnimatedBar({ animated }: AnimatedBarProps) {
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    if (!animated) {
      setScale(MIN_SCALE);
      return undefined;
    }
    const interval = setInterval(() => {
      const value = THREE.MathUtils.lerp(MIN_SCALE, 1, Math.random());
      setScale(value);
    }, ANIMATION_DURATION * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [animated]);

  const translateY = (1 - scale) * 50;
  return (
    <div className="transition-transform duration-200" style={{ transform: `translateY(${translateY}%)` }}>
      <div
        className="h-full w-[4px] bg-white transition-transform duration-200"
        style={{ transform: `scale(1, ${scale})` }}
      />
    </div>
  );
}

import DISCORD_ICON from 'assets/icons/discord.png';
import { ReactComponent as DISCORD_PASSENGER_ICON } from 'assets/icons/discord_passenger.svg';
import EMAIL_ICON from 'assets/icons/email.png';
import { ReactComponent as EMAIL_PASSENGER_ICON } from 'assets/icons/email_passenger.svg';
import TWITTER_ICON from 'assets/icons/twitter.png';
import { ReactComponent as TWITTER_PASSENGER_ICON } from 'assets/icons/twitter_passenger.svg';
import { ReactComponent as TELEGRAM_PASSENGER_ICON } from "assets/icons/twitter_passenger.svg";

export const VIEW_PORT_INTERSECTION_TAG = 'view-port-intersection';
export const VIRTUAL_SCROLL_EASING_DURATION = 0.5;
export const THREE_HTML_DISTANCE_MULTIPLIER = 1;

export enum Pages {
  passengers = '/passengers',
  waltsVault = '/walts',
}

export const SOCIAL_MEDIA = {
  whiteList: {
    discord: { link: 'http://discord.gg/the-whitelist', icon: DISCORD_ICON, alt: 'discord' },
    twitter: { link: 'https://twitter.com/_thewhitelist_', icon: TWITTER_ICON, alt: 'twitter' },
    email: { link: 'mailto:#', icon: EMAIL_ICON, alt: 'email' },
  },
  passenger: {
    discord: { link: 'https://discord.gg/passengers', icon: DISCORD_PASSENGER_ICON, alt: 'discord' },
    twitter: { link: 'https://twitter.com/Passengers_NFT', icon: TWITTER_PASSENGER_ICON, alt: 'twitter' },
    telegram: {link: "nada", icon: TELEGRAM_PASSENGER_ICON, alt: 'twitter'},
    email: { link: 'mailto:info@passengers.space', icon: EMAIL_PASSENGER_ICON, alt: 'email' },
  },
};

export const FOOTER_LEGAL_COPYRIGHT = {
  whiteList: 'THE WHITE LIST © ALL RIGHTS RESERVED.',
  passenger: 'PASSENGERS. ALL RIGHTS RESERVED.',
};

export enum BREAKPOINTS {
  sm = 640,
  md = 768,
  lg = 1024,
  xl = 1280,
  xxl = 1536,
}

export enum LocalStorageKeys {
  MUTE = 'mute',
}

export const ENABLE_GUI = false;

export enum FlightState {
  'EnterScreen',
  'Console',
  'CheckingProgress',
  'NoDataFound',
  'FlightSpots',
}

export const PASSENGERS_API_CHECK = 'https://api-worker.passengers.workers.dev/check';

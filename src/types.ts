export type AppStep = 'WELCOME' | 'SUNFLOWERS_GROWING' | 'ILLUSTRATION_SHOW' | 'FINAL_CARD';

export interface LoveNote {
  id: string;
  title: string;
  content: string;
  icon: string;
}

export interface AppConfig {
  userName: string;
  customImageUri: string | null;
  musicPlaying: boolean;
  musicVolume: number;
}

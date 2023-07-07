export interface SessionTimerConfig {
  sessionLength: number;
  sessionDuration: number;
  breakDuration: number;
  endOfSessionSound: string;
  endOfBreakSound: string;
}

export const defaultSessionTimerConfig: SessionTimerConfig = {
  sessionLength: 25,
  sessionDuration: 25,
  breakDuration: 5,
  endOfSessionSound: "/music/ringtone1.wav",
  endOfBreakSound: "/music/ringtone2.wav",
};

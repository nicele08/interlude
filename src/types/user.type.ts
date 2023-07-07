import { SessionTimerConfig } from "./setting.type";

export type User = {
  isLoggedIn: boolean;
  id: string;
  email: string;
  name: string;
  settings: SessionTimerConfig;
};

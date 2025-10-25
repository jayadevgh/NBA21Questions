export type Player = {
  name: string;
  teams: string[];
  position: string;
  height: number; // centimeters
  college: string;
  mvp: boolean;
  championships: number;
  active: boolean;
};

export type Message = {
  role: "user" | "bot" | "system";
  text: string;
};

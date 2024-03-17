const STATUSES = ["created", "process", "done"] as const;

export type TStatus = (typeof STATUSES)[number];

export interface IEvent {
  id: string;
  name: string;
  date: string;
  status: TStatus;
  result: IResult;
}

export interface IMessage {
  start: number;
  end: number;
  text: string;
  speaker: string;
}

export interface IResult {
  full: IMessage[];
  speakers: string[];
  shot: string;
  task: string[];
}

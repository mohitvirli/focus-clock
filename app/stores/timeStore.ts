import { create } from 'zustand'

interface TimeStore {
  time: Date;
  hour: number;
  minute: number;
  second: number;
  setTime: (time: Date) => void;
}
export const useTimeStore = create<TimeStore>((set) => {
  const time = new Date();

  return {
    time,
    hour: time.getHours(),
    minute: time.getMinutes(),
    second: time.getSeconds(),

    setTime: (newTime: Date) => set({
      time: newTime,
      hour: newTime.getHours(),
      minute: newTime.getMinutes(),
      second: newTime.getSeconds(),
    }),
  };
});
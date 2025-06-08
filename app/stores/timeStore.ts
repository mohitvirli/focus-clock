import { create } from 'zustand'

interface TimeStore {
  time: Date;
  hours: number;
  minutes: number;
  seconds: number;
  setTime: (time: Date) => void;
}
export const useTimeStore = create<TimeStore>((set) => {
  const time = new Date();

  return {
    time,
    hours: time.getHours(),
    minutes: time.getMinutes(),
    seconds: time.getSeconds(),

    setTime: (newTime: Date) => set({
      time: newTime,
      hours: newTime.getHours(),
      minutes: newTime.getMinutes(),
      seconds: newTime.getSeconds(),
    }),
  };
});
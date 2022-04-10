import create from "zustand"

export const useStore = create((set, get) => ({
  stateTest: null,
  setStateTest: (v) => set({ stateTest: v }),

  img: null,
  setImg: (v) => set({ img: v }),
  ready: false,
  setReady: (v) => set({ ready: v }),

  ////////////////////////////////
  texture: null,
  setTexture: (v) => set({ texture: v }),
}))

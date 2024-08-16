import React from "react";
import {create} from "zustand";

const useParkingStore = create((set) => ({
  selectedParkingID: null,
  isInfoWindowOpen: false,
  setSelectedParkingID: (id) => set({ selectedParkingID: id }),
  setInfoWindowOpen: (isOpen) => set({isInfoWindowOpen: isOpen}),  
}));

export default useParkingStore;

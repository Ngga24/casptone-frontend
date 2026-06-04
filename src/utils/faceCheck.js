// src/utils/faceCheck.js

export const isFaceCheckedToday = () => {
  const savedDate = localStorage.getItem("faceCheckedDate");

  if (!savedDate) return false;

  const today = new Date().toDateString();

  return savedDate === today;
};

export const setFaceCheckedToday = () => {
  const today = new Date().toDateString();
  localStorage.setItem("faceCheckedDate", today);
};
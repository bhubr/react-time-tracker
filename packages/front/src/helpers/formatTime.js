const formatTime = (timeSeconds) => {
  const minutes = Math.floor(timeSeconds / 60);
  const seconds = timeSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${
    seconds.toString().padStart(2, '0')}`;
};

export default formatTime;

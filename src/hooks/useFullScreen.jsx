import { useRef } from "react";

const useFullScreen = () => {
  const fullScreenRef = useRef(null);

  const handleFullScreenToggle = () => {

    console.log("innin")
    const element = fullScreenRef.current;



    if (document?.fullscreenElement) {
      document?.exitFullscreen();
    } else {
      element?.requestFullscreen().catch(err => {
        console.error('Error attempting to enable full-screen mode:', err.message);
      });
    }
  };
  return { handleFullScreenToggle }
}
export default useFullScreen
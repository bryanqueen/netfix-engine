import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';


export default function Home() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Handle initial page load and video setup
  useEffect(() => {
    const handleVisibilityChange = () => {
      // Try to play when page becomes visible again
      if (document.visibilityState === 'visible' && videoRef.current && hasInteracted) {
        videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Attempt to preload the video
    if (videoRef.current) {
      videoRef.current.load();
    }
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [hasInteracted]);

  // Handle user interaction
  useEffect(() => {
    const handleUserInteraction = () => {
      setHasInteracted(true);
      if (videoRef.current && !videoEnded) {
        // Try to play with sound
        videoRef.current.muted = false;
        videoRef.current.play().catch(e => {
          console.log("Play with sound failed:", e);
          // Fallback: play muted if unmuted playback fails
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(e => console.log("Even muted play failed:", e));
          }
        });
      }
      
      // Remove event listeners after first interaction
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, [videoEnded]);

  // Handle navigation after video ends
  useEffect(() => {
    if (videoEnded) {
      const timer = setTimeout(() => {
        router.push('/dashboard');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [videoEnded, router]);

  // Handle video events
  const handleVideoEnded = () => {
    setVideoEnded(true);
  };

  const handleVideoLoaded = () => {
    setIsLoaded(true);
    // Initial autoplay attempt - will likely be muted
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log("Initial autoplay prevented:", e));
    }
  };

  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center overflow-hidden">
      {/* {!hasInteracted && (
        <div className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer" 
             onClick={() => setHasInteracted(true)}>
          <div className="bg-white bg-opacity-10 p-4 rounded-lg animate-pulse">
            <p className="text-white text-center">Tap anywhere to continue</p>
          </div>
        </div>
      )} */}
      
      <div className="w-full h-full relative">

        
        <video
          ref={videoRef}
          playsInline
          autoPlay
          muted={!hasInteracted} // Start muted, unmute after interaction
          preload="auto"
          onEnded={handleVideoEnded}
          onLoadedData={handleVideoLoaded}
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{ 
            opacity: videoEnded ? 0 : (isLoaded ? 1 : 0), 
            transition: 'opacity 0.5s ease-out' 
          }}
        >
          <source src="/netflix-intro.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
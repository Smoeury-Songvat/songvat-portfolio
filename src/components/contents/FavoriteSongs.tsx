import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Image from "next/image";
import { 
  Music, 
  Play, 
  Pause, 
  ExternalLink, 
  Clock,
  User,
  Volume2,
  VolumeX
} from "lucide-react";

interface Song {
  id: string;
  title: string;
  artist: string;
  featuring?: string;
  duration: string;
  genre: string;
  year: string;
  youtubeUrl?: string;
  spotifyUrl?: string;
  audioUrl?: string; // Direct audio file URL
  coverColor: string;
  language: string;
  mood: string;
  coverImageUrl?: string;
}

interface FavoriteSongsProps {
  theme: string;
}

const FavoriteSongs = ({ theme }: FavoriteSongsProps) => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isDark = theme === "primary";

  const favoriteSongs: Song[] = [
    {
      id: "1",
      title: "មេឃបើកថ្ងៃ",
      artist: "KWAN",
      featuring: "Vannda",
      duration: "3:42",
      genre: "Khmer Pop",
      year: "2023",
      youtubeUrl: "https://www.youtube.com/watch?v=toJ4nn_WmeQ",
      spotifyUrl: "https://open.spotify.com/track/6HWbL3uNRzkisSZoyqydaT",
      audioUrl: "berkthgai.mp3", 
      coverColor: "from-orange-400 to-red-500",
      language: "Khmer",
      mood: "Uplifting",
      coverImageUrl: "https://i.ytimg.com/vi/-9iQ_gmFjmA/maxresdefault.jpg" 
    },
    {
      id: "2", 
      title: "ឆាឆាឆា (CHA CHA CHA)",
      artist: "2MDIE",
      duration: "4:48",
      genre: "Khmer Hip-Hop",
      year: "2024",
      youtubeUrl: "https://www.youtube.com/watch?v=r67B4cS-oCo",
      spotifyUrl: "https://open.spotify.com/track/68EWw08VyD1oZwofVltpjv",
      audioUrl: "2MDIE.mp3", // Sample audio
      coverColor: "from-purple-400 to-pink-500",
      language: "Khmer",
      mood: "Energetic",
      coverImageUrl: "https://i.ytimg.com/vi/r67B4cS-oCo/maxresdefault.jpg" // Sample cover image
    }
  ];

  // Audio functionality
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      if (audio.currentTime) {
        setCurrentTime(audio.currentTime);
      }
    };
    
    const updateDuration = () => {
      if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    
    const handleLoadedData = () => {
      if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    
    const handleCanPlay = () => {
      if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    
    const handleEnded = () => {
      setPlayingId(null);
      setCurrentTime(0);
    };

    const handleError = (e: unknown) => {
      console.error('Audio error:', e);
      setPlayingId(null);
      setCurrentTime(0);
      setDuration(0);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [playingId]);

 const handlePlayPause = async (song: Song, startTime?: number) => {
  const audio = audioRef.current;
  
  if (playingId === song.id && !startTime) {
    if (audio) {
      audio.pause();
    }
    setPlayingId(null);
  } else {
    // Stop current audio if playing
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    
    if (song.audioUrl) {
      const newAudio = new Audio(song.audioUrl);
      newAudio.volume = isMuted ? 0 : volume;
      newAudio.preload = 'auto'; // Changed from 'metadata' to 'auto' for full loading
      audioRef.current = newAudio;
      
      try {
        // Wait for the audio to be fully loaded
        await new Promise((resolve, reject) => {
          const onLoadedData = () => {
            // Check if we have valid duration
            if (newAudio.duration && !isNaN(newAudio.duration) && isFinite(newAudio.duration)) {
              setDuration(newAudio.duration);
              
              // Set start time if specified, after duration is available
              if (startTime && startTime > 0 && startTime < newAudio.duration) {
                newAudio.currentTime = startTime;
                setCurrentTime(startTime);
              } else {
                setCurrentTime(0);
              }
              
              cleanup();
              resolve(null);
            }
          };
          
          const onCanPlayThrough = () => {
            // Audio can play through without interruption
            if (newAudio.duration && !isNaN(newAudio.duration) && isFinite(newAudio.duration)) {
              setDuration(newAudio.duration);
              
              // Set start time if specified
              if (startTime && startTime > 0 && startTime < newAudio.duration) {
                newAudio.currentTime = startTime;
                setCurrentTime(startTime);
              } else {
                setCurrentTime(0);
              }
              
              cleanup();
              resolve(null);
            }
          };
          
          const onError = (e: unknown) => {
            console.error('Audio loading error:', e);
            cleanup();
            reject(new Error('Failed to load audio'));
          };
          
          const onTimeout = () => {
            console.error('Audio loading timeout');
            cleanup();
            reject(new Error('Audio loading timeout'));
          };
          
          const cleanup = () => {
            newAudio.removeEventListener('loadeddata', onLoadedData);
            newAudio.removeEventListener('canplaythrough', onCanPlayThrough);
            newAudio.removeEventListener('error', onError);
            clearTimeout(timeoutId);
          };
          
          // Set up event listeners
          newAudio.addEventListener('loadeddata', onLoadedData);
          newAudio.addEventListener('canplaythrough', onCanPlayThrough);
          newAudio.addEventListener('error', onError);
          
          // Set timeout to prevent infinite waiting
          const timeoutId = setTimeout(onTimeout, 10000); // 10 seconds timeout
          
          // Load the audio
          newAudio.load();
          
          // If already loaded, trigger immediately
          if (newAudio.readyState >= 2) { // HAVE_CURRENT_DATA or higher
            onLoadedData();
          } else if (newAudio.readyState >= 4) { // HAVE_ENOUGH_DATA
            onCanPlayThrough();
          }
        });
        
        // Now play the audio
        await newAudio.play();
        setPlayingId(song.id);
        
      } catch (e) {
        console.error('Error loading/playing audio:', e);
        setPlayingId(null);
        setCurrentTime(0);
        setDuration(0);
        
        // Show user-friendly error message
        alert(`Unable to play "${song.title}". The audio file may not be available or there was a network error.`);
      }
    }
  }
};

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : newVolume;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.volume = !isMuted ? 0 : volume;
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration || duration === 0) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const newTime = percentage * duration;
    
    try {
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    } catch (error) {
      console.error('Error seeking:', error);
    }
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time) || !isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Function to play song from specific time
//   const playFromTime = (song: Song, timeString: string) => {
//     const timeParts = timeString.split(':');
//     let seconds = 0;
    
//     if (timeParts.length === 2) {
//       // MM:SS format
//       seconds = parseInt(timeParts[0]) * 60 + parseInt(timeParts[1]);
//     } else if (timeParts.length === 1) {
//       // Just seconds
//       seconds = parseInt(timeParts[0]);
//     }
    
//     if (!isNaN(seconds) && seconds >= 0) {
//       handlePlayPause(song, seconds);
//     }
//   };

  const getCurrentSong = () => {
    return favoriteSongs.find(song => song.id === playingId);
  };

  const getMoodColor = (mood: string) => {
    switch (mood.toLowerCase()) {
      case "uplifting":
        return isDark 
          ? "bg-yellow-900/30 text-yellow-400 border-yellow-900/50"
          : "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "energetic":
        return isDark
          ? "bg-red-900/30 text-red-400 border-red-900/50"
          : "bg-red-100 text-red-700 border-red-200";
      case "chill":
        return isDark
          ? "bg-blue-900/30 text-blue-400 border-blue-900/50"
          : "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return isDark
          ? "bg-gray-800/30 text-gray-400 border-gray-800/50"
          : "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <section className="w-full mt-6">
      <div className={`flex items-center gap-3 mb-6 text-${isDark ? 'white' : 'gray-900'}`}>
        <Music className="w-5 h-5" />
        <h2 className="text-xl font-semibold tracking-tight">Favorite Songs</h2>
      </div>

      <div className="space-y-4">
        {favoriteSongs.map((song) => (
          <Card
            key={song.id}
            className={`transition-all duration-300 group hover:shadow-lg ${
              isDark
                ? "bg-gray-800/50 border-gray-700/50 hover:border-gray-600"
                : "bg-white border-gray-200 hover:border-gray-300"
            }`}
          >
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                {/* Album Art / Play Button */}
                <div
                  className={`relative w-16 h-16 rounded-lg bg-gradient-to-br ${song.coverColor} flex items-center justify-center cursor-pointer transition-transform hover:scale-105`}
                  onClick={() => handlePlayPause(song)}
                >
                  {/* If you have a cover image URL, use it as background */}
                  {song.coverImageUrl ? (
                    <Image
                      src={song.coverImageUrl}
                      alt={song.title}
                      width={300}
                      height={300}
                      className="w-16 h-16 rounded-lg object-cover"
                      quality={100}
                      priority
                      unoptimized={false}
                    />
                  ) : (
                    <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-white/80 select-none pointer-events-none">
                      {song.title.charAt(0)}
                    </span>
                  )}
                  <span className="absolute inset-0 flex items-center justify-center z-10">
                    {playingId === song.id ? (
                      <Pause className="w-6 h-6 text-white" />
                    ) : (
                      <Play className="w-6 h-6 text-white ml-1" />
                    )}
                  </span>
                  {playingId === song.id && (
                    <div className="absolute -top-1 -right-1">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>

                {/* Song Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="min-w-0 flex-1">
                      <h3 className={`font-semibold text-lg leading-tight truncate ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}>
                        {song.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <User className={`w-3 h-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                        <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                          {song.artist}
                          {song.featuring && (
                            <span className={isDark ? "text-gray-400" : "text-gray-500"}>
                              {" "}ft. {song.featuring}
                            </span>
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <Clock className={`w-3 h-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                      <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                        {song.duration}
                      </span>
                    </div>
                  </div>

                  {/* Song Details */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge
                      variant="outline"
                      className={`text-xs px-2 py-1 ${
                        isDark
                          ? "bg-gray-700/50 text-gray-300 border-gray-600"
                          : "bg-gray-50 text-gray-700 border-gray-200"
                      }`}
                    >
                      {song.genre}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`text-xs px-2 py-1 ${getMoodColor(song.mood)}`}
                    >
                      {song.mood}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`text-xs px-2 py-1 ${
                        isDark
                          ? "bg-blue-900/30 text-blue-400 border-blue-900/50"
                          : "bg-blue-100 text-blue-700 border-blue-200"
                      }`}
                    >
                      {song.language}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`text-xs px-2 py-1 ${
                        isDark
                          ? "bg-green-900/30 text-green-400 border-green-900/50"
                          : "bg-green-100 text-green-700 border-green-200"
                      }`}
                    >
                      {song.year}
                    </Badge>
                  </div>

                  {/* External Links */}
                  <div className="flex items-center gap-3 flex-wrap">
                    {song.youtubeUrl && (
                      <button
                        onClick={() => window.open(song.youtubeUrl, "_blank")}
                        className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full transition-colors ${
                          isDark
                            ? "bg-red-900/30 text-red-400 hover:bg-red-900/50"
                            : "bg-red-50 text-red-600 hover:bg-red-100"
                        }`}
                      >
                        <ExternalLink className="w-3 h-3" />
                        YouTube
                      </button>
                    )}
                    {song.spotifyUrl && (
                      <button
                        onClick={() => window.open(song.spotifyUrl, "_blank")}
                        className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full transition-colors ${
                          isDark
                            ? "bg-green-900/30 text-green-400 hover:bg-green-900/50"
                            : "bg-green-50 text-green-600 hover:bg-green-100"
                        }`}
                      >
                        <ExternalLink className="w-3 h-3" />
                        Spotify
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Music Player Controls - Only show when playing */}
      {playingId && getCurrentSong() && (
        <Card className={`mt-6 ${
          isDark
            ? "bg-gray-800/50 border-gray-700/50"
            : "bg-white border-gray-200"
        }`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <h4 className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                  Now Playing: {getCurrentSong()?.title}
                </h4>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  {getCurrentSong()?.artist}
                </p>
              </div>
              
              {/* Volume Control */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className={`p-1 rounded transition-colors ${
                    isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  }`}
                >
                  {isMuted ? (
                    <VolumeX className={`w-4 h-4 ${isDark ? "text-gray-400" : "text-gray-600"}`} />
                  ) : (
                    <Volume2 className={`w-4 h-4 ${isDark ? "text-gray-400" : "text-gray-600"}`} />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="w-16"
                />
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-3">
              <div className="flex items-center gap-2 text-xs">
                <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                  {formatTime(currentTime)}
                </span>
                <div
                  className={`flex-1 h-2 rounded-full cursor-pointer relative ${
                    isDark ? "bg-gray-700" : "bg-gray-200"
                  }`}
                  onClick={handleSeek}
                >
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all"
                    style={{
                      width: duration > 0 ? `${Math.min(100, (currentTime / duration) * 100)}%` : "0%"
                    }}
                  />
                  {/* Progress indicator dot */}
                  {duration > 0 && (
                    <div
                      className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-sm"
                      style={{
                        left: `${Math.min(100, (currentTime / duration) * 100)}%`,
                        marginLeft: '-6px'
                      }}
                    />
                  )}
                </div>
                <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                  {duration > 0 ? formatTime(duration) : "--:--"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Music Note */}
      <div className={`mt-6 p-4 rounded-lg ${
        isDark ? "bg-gray-800/30" : "bg-gray-50"
      }`}>
        <p className={`text-sm text-center ${
          isDark ? "text-gray-400" : "text-gray-600"
        }`}>
          <Music className="w-4 h-4 inline mr-2" />
          Music fuels my creativity and keeps me motivated while coding
        </p>
      </div>
    </section>
  );
};

export { FavoriteSongs };
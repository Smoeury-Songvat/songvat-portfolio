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

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setPlayingId(null);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [playingId]);

  const handlePlayPause = async (song: Song) => {
    const audio = audioRef.current;
    
    if (playingId === song.id) {
      // Pause current song
      if (audio) {
        audio.pause();
      }
      setPlayingId(null);
    } else {
      // Play new song
      if (audio) {
        audio.pause();
      }
      
      if (song.audioUrl) {
        const newAudio = new Audio(song.audioUrl);
        newAudio.volume = isMuted ? 0 : volume;
        audioRef.current = newAudio;
        
        try {
          await newAudio.play();
          setPlayingId(song.id);
        } catch (error) {
          console.error('Error playing audio:', error);
          // Fallback to YouTube if direct audio fails
          if (song.youtubeUrl) {
            window.open(song.youtubeUrl, '_blank');
          }
        }
      } else if (song.youtubeUrl) {
        // Fallback to YouTube
        window.open(song.youtubeUrl, '_blank');
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
    if (!audio || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

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
        {/* <Heart className={`w-4 h-4 ${isDark ? 'text-red-400' : 'text-red-500'}`} /> */}
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
                  <div className="flex items-center gap-3">
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
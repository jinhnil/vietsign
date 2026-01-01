"use client";

import React from "react";
import { ArrowLeft, BookOpen, Star, Share2, Play, Pause, Eye, Calendar, Award, TrendingUp, Info, ArrowRight, Volume2, VolumeX, Maximize } from "lucide-react";
import Link from "next/link";
import { dictionaryItems } from "@/src/data";
import { useParams, useRouter } from "next/navigation";

export const DictionaryDetail: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const progressRef = React.useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [volume, setVolume] = React.useState(0.5);
  const [isMuted, setIsMuted] = React.useState(true);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const [playbackSpeed, setPlaybackSpeed] = React.useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = React.useState(false);
  const id = Number(params.id);
  
  const item = dictionaryItems.find(i => i.id === id);

  // Format time display (mm:ss)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Handle video autoplay when component mounts or item changes
  React.useEffect(() => {
    const video = videoRef.current;
    if (video && item) {
      video.load();
      video.volume = volume;
      video.muted = isMuted;
      video.playbackRate = playbackSpeed;
      
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  }, [item?.id]);

  // Update progress bar as video plays
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false));
        }
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      if (newVolume === 0) {
        setIsMuted(true);
        videoRef.current.muted = true;
      } else if (isMuted) {
        setIsMuted(false);
        videoRef.current.muted = false;
      }
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current && videoRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const clickPosition = (e.clientX - rect.left) / rect.width;
      const newTime = clickPosition * duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      setProgress(clickPosition * 100);
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setShowSpeedMenu(false);
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const speedOptions = [
    { label: 'Rất nhanh', value: 2 },
    { label: 'Nhanh', value: 1.5 },
    { label: 'Bình thường', value: 1 },
    { label: 'Chậm', value: 0.5 },
  ];

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy từ này</h2>
        <button 
          onClick={() => router.back()}
          className="px-6 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
        >
          Quay lại từ điển
        </button>
      </div>
    );
  }

  // Lấy các từ liên quan (cùng category)
  const relatedItems = dictionaryItems
    .filter(i => i.category === item.category && i.id !== item.id)
    .slice(0, 3);

  // Lấy từ trước và sau dựa trên ID
  const prevItem = dictionaryItems.find(i => i.id === id - 1);
  const nextItem = dictionaryItems.find(i => i.id === id + 1);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Top Navigation & Breadcrumbs */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => router.push(`/dictionary`)}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary-600 hover:bg-white rounded-xl transition-all font-medium border border-transparent hover:border-gray-200 hover:shadow-sm group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Quay lại</span>
        </button>
        
        <nav className="hidden md:flex items-center gap-2 text-sm text-gray-500 font-medium">
          <Link href="/home" className="hover:text-primary-600">Trang chủ</Link>
          <span>/</span>
          <Link href="/dictionary" className="hover:text-primary-600">Từ điển</Link>
          <span>/</span>
          <span className="text-gray-900">{item.word}</span>
        </nav>
      </div>

      {/* Unified Content Box: Word & Video */}
      <div className="bg-white rounded-[40px] shadow-2xl border border-gray-100 overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Media Section: 3/4 Width */}
          <div className="lg:w-3/4 bg-gray-900 relative group">
            <div className="aspect-[16/9] lg:aspect-auto lg:h-[600px] w-full relative overflow-hidden bg-black">
              {/* Real Video Player */}
              <video 
                key={item.id}
                ref={videoRef}
                className="w-full h-full object-cover cursor-pointer"
                poster={`https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=90&sig=${item.id}`}
                controls={false}
                muted
                loop
                playsInline
                onClick={togglePlay}
              >
                <source src={item.videoUrl} type="video/mp4" />
                Trình duyệt của bạn không hỗ trợ video.
              </video>

              {/* Advanced Video Controls Mock (Simplified for real playback) */}
              {!isPlaying && (
                <div 
                  onClick={togglePlay}
                  className="absolute inset-0 bg-black/20 flex items-center justify-center cursor-pointer transition-opacity duration-500"
                >
                  <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-2xl">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-inner">
                      <Play size={32} className="text-primary-600 fill-current ml-1" />
                    </div>
                  </div>
                </div>
              )}
              {/* Advanced Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/95 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="space-y-4">
                  {/* Progress Bar */}
                  <div className="flex items-center gap-3">
                    <span className="text-white text-xs font-medium min-w-[40px]">{formatTime(currentTime)}</span>
                    <div 
                      ref={progressRef}
                      onClick={handleProgressClick}
                      className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden cursor-pointer group/progress hover:h-3 transition-all"
                    >
                      <div 
                        className="h-full bg-gradient-to-r from-primary-500 to-primary-400 relative transition-all"
                        style={{ width: `${progress}%` }}
                      >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg scale-0 group-hover/progress:scale-100 transition-transform"></div>
                      </div>
                    </div>
                    <span className="text-white text-xs font-medium min-w-[40px]">{formatTime(duration)}</span>
                  </div>

                  {/* Control Buttons */}
                  <div className="flex items-center justify-between text-white">
                    {/* Left Controls */}
                    <div className="flex items-center gap-4">
                      {/* Play/Pause */}
                      <button 
                        onClick={togglePlay} 
                        className="p-2.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                        title={isPlaying ? 'Tạm dừng' : 'Phát'}
                      >
                        {isPlaying ? <Pause size={20} className="fill-current" /> : <Play size={20} className="fill-current ml-0.5" />}
                      </button>

                      {/* Volume Control */}
                      <div className="flex items-center gap-2 group/volume">
                        <button 
                          onClick={toggleMute} 
                          className="p-2 hover:bg-white/10 rounded-full transition-colors"
                          title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
                        >
                          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                        </button>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={isMuted ? 0 : volume}
                          onChange={handleVolumeChange}
                          className="w-0 group-hover/volume:w-20 transition-all duration-300 h-1 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
                        />
                      </div>

                      {/* Time Display */}
                      <span className="text-sm font-medium opacity-80">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>

                    {/* Right Controls */}
                    <div className="flex items-center gap-3">
                      {/* Speed Control */}
                      <div className="relative">
                        <button 
                          onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                          className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-bold transition-colors"
                          title="Tốc độ phát"
                        >
                          {playbackSpeed}x
                        </button>
                        {showSpeedMenu && (
                          <div className="absolute bottom-full right-0 mb-2 bg-gray-900/95 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl border border-white/10">
                            {speedOptions.map((option) => (
                              <button
                                key={option.value}
                                onClick={() => handleSpeedChange(option.value)}
                                className={`w-full px-4 py-2.5 text-left text-sm font-medium hover:bg-white/10 transition-colors whitespace-nowrap ${
                                  playbackSpeed === option.value ? 'text-primary-400 bg-white/5' : 'text-white'
                                }`}
                              >
                                {option.label} ({option.value}x)
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Fullscreen */}
                      <button 
                        onClick={handleFullscreen}
                        className="p-2.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                        title="Phóng to"
                      >
                        <Maximize size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Info Section: 1/4 Width */}
          <div className="lg:w-1/4 p-10 bg-white flex flex-col justify-between relative overflow-hidden border-l border-gray-100">
            <div className="space-y-10 relative z-10">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-50 text-primary-700 rounded-lg text-[10px] font-black uppercase tracking-[0.2em]">
                  {item.category}
                </div>
                
                <div>
                  <h1 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-2 italic">
                    {item.word}
                  </h1>
                  <p className="text-sm text-gray-400 font-medium leading-relaxed">
                    Từ vựng phổ biến trong bộ ngôn ngữ ký hiệu chủ đề {item.category}.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-[24px] hover:bg-white hover:shadow-xl transition-all duration-500 border border-transparent hover:border-gray-100 group/item">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                    <Award size={24} className="text-amber-500" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Độ khó</h4>
                    <p className="font-bold text-gray-800 italic">Cơ bản 1/5</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-[24px] hover:bg-white hover:shadow-xl transition-all duration-500 border border-transparent hover:border-gray-100 group/item">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                    <TrendingUp size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Phổ biến</h4>
                    <p className="font-bold text-gray-800 italic">Top 10%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-10 relative z-10">
              <button className="w-full flex items-center justify-center gap-3 px-6 py-5 bg-primary-600 text-white rounded-[24px] hover:bg-primary-700 transition-all font-black shadow-2xl shadow-primary-600/30 active:scale-95 text-sm uppercase tracking-widest">
                <Star size={20} className="fill-current" />
                <span>Yêu thích</span>
              </button>
              <button className="w-full flex items-center justify-center gap-3 py-4 text-gray-400 hover:text-gray-900 transition-all font-bold text-sm">
                <Share2 size={20} />
                <span>Chia sẻ từ này</span>
              </button>
            </div>

            {/* Subtle background decoration */}
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary-50 rounded-full translate-x-1/2 translate-y-1/2 opacity-30"></div>
          </div>
        </div>
      </div>

      {/* Navigation: Previous / Next Word */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
        {prevItem ? (
          <Link 
            href={`/dictionary/${prevItem.id}`}
            className="group relative overflow-hidden bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary-200 transition-all duration-300"
          >
            <div className="relative z-10 flex items-center gap-6">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-primary-600 transition-colors duration-300">
                <ArrowLeft size={28} className="text-gray-400 group-hover:text-white group-hover:-translate-x-1 transition-all" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-1 group-hover:text-primary-600 transition-colors">Trước đó</span>
                <span className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">{prevItem.word}</span>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </Link>
        ) : <div />}

        {nextItem ? (
          <Link 
            href={`/dictionary/${nextItem.id}`}
            className="group relative overflow-hidden bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary-200 transition-all duration-300 text-right"
          >
            <div className="relative z-10 flex items-center justify-end gap-6">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-1 group-hover:text-primary-600 transition-colors">Tiếp theo</span>
                <span className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">{nextItem.word}</span>
              </div>
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-primary-600 transition-colors duration-300">
                <ArrowRight size={28} className="text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </div>
            <div className="absolute top-0 left-0 w-32 h-32 bg-primary-50 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </Link>
        ) : <div />}
      </div>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, User } from 'lucide-react';
import { VideoPlayer } from '../video/VideoPlayer';
import { useAppStore } from '../../store/appStore';
import { generateMockData } from '../../lib/utils';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { VideoService } from '../../lib/videoService';
import { useWallet } from '../../hooks/useWallet';

export const HomeFeed: React.FC = () => {
  const { videoFeed, currentVideoIndex, setVideoFeed, setCurrentVideoIndex, currentUser, setActivePage, activePage } = useAppStore();
  const [feedType, setFeedType] = useState<'foryou' | 'following' | 'trending'>('foryou');
  const [isLoading, setIsLoading] = useState(true);
  const { newAuthActor } = useWallet();

  useEffect(() => {
    const loadVideos = async () => {
      setIsLoading(true);
      try {
        if (newAuthActor) {
          console.log('Loading videos from backend using VideoService...');
          const videoService = new VideoService(newAuthActor);
          
          let videos;
          if (feedType === 'trending') {
            videos = await videoService.getTrendingVideos();
          } else if (feedType === 'following') {
            // For now, load all videos - could be enhanced to filter by followed users
            videos = await videoService.getAllVideos();
          } else {
            // For You feed - load all videos
            videos = await videoService.getAllVideos();
          }
          
          console.log(`Loaded ${videos.length} videos from backend for feed type: ${feedType}`);
          setVideoFeed(videos);
        } else {
          console.log('No actor available, using mock data...');
          const { mockVideos } = generateMockData();
          setVideoFeed(mockVideos);
        }
      } catch (error) {
        console.error('Error loading videos:', error);
        // Fallback to mock data on error
        const { mockVideos } = generateMockData();
        setVideoFeed(mockVideos);
      } finally {
        setIsLoading(false);
      }
    };

    loadVideos();
  }, [setVideoFeed, newAuthActor, feedType]);

  // Set feed type based on active page
  useEffect(() => {
    if (activePage === 'following') {
      setFeedType('following');
    } else if (activePage === 'discover' || activePage === 'trending') {
      setFeedType('trending');
    } else {
      setFeedType('foryou');
    }
  }, [activePage]);

  const handleVideoEnd = () => {
    if (currentVideoIndex < videoFeed.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const videoHeight = container.clientHeight;
    const scrollTop = container.scrollTop;
    const newIndex = Math.round(scrollTop / videoHeight);
    
    if (newIndex !== currentVideoIndex && newIndex < videoFeed.length) {
      setCurrentVideoIndex(newIndex);
    }
  };

  const feedTabs = [
    { id: 'foryou', label: 'For You' },
    { id: 'following', label: 'Following' },
    { id: 'trending', label: 'Trending' },
  ] as const;

  return (
    <div className="h-screen animated-bg overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-flux-bg-primary/80 via-flux-bg-primary/60 to-transparent backdrop-blur-sm border-b border-flux-border-accent/20">
        <div className="flex items-center justify-between p-4 pt-12">
          <div className="flex items-center space-x-4">
            {feedTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setFeedType(tab.id);
                  if (tab.id === 'following') {
                    setActivePage('following');
                  } else if (tab.id === 'trending') {
                    setActivePage('discover');
                  } else {
                    setActivePage('home');
                  }
                }}
                className={`text-flux-text-primary font-semibold transition-all duration-300 px-4 py-2 rounded-lg relative overflow-hidden ${
                  feedType === tab.id
                    ? 'bg-flux-gradient text-white glow-cyan shadow-lg'
                    : 'text-flux-text-secondary hover:text-flux-text-primary hover:bg-flux-bg-tertiary/50 border border-transparent hover:border-flux-border-accent/30'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <Button size="sm" variant="ghost" className="text-flux-text-primary hover:bg-flux-bg-tertiary/50 border border-flux-border-primary/30 hover:border-flux-border-accent/50">
              <Search className="w-5 h-5" />
            </Button>
            <Button size="sm" variant="ghost" className="text-flux-text-primary hover:bg-flux-bg-tertiary/50 border border-flux-border-primary/30 hover:border-flux-border-accent/50">
              <Bell className="w-5 h-5" />
            </Button>
            <button onClick={() => setActivePage('profile')} className="hover:opacity-80 transition-opacity">
              {currentUser ? (
                <Avatar
                  src={currentUser.avatar}
                  alt={currentUser.displayName}
                  size="sm"
                />
              ) : (
                <User className="w-5 h-5 text-flux-text-primary" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Video Feed */}
      {isLoading ? (
        <div className="h-full flex items-center justify-center">
          <div className="text-center card-futuristic p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-flux-primary mx-auto mb-4 glow-cyan"></div>
            <p className="text-flux-text-secondary">Loading videos...</p>
          </div>
        </div>
      ) : videoFeed.length === 0 ? (
        <div className="h-full flex items-center justify-center">
          <div className="text-center card-futuristic p-8">
            <p className="text-flux-text-primary text-lg mb-2">No videos available</p>
            <p className="text-flux-text-secondary text-sm">Upload some videos to get started!</p>
          </div>
        </div>
      ) : (
        <div
          className="h-full snap-y snap-mandatory overflow-y-scroll"
          onScroll={handleScroll}
        >
          {videoFeed.map((video, index) => (
            <div
              key={`video-${video.id}`}
              className="h-screen snap-start"
            >
              <VideoPlayer
                video={video}
                isActive={index === currentVideoIndex}
                onVideoEnd={handleVideoEnd}
                className="w-full h-full"
              />
            </div>
          ))}
        </div>
      )}

      {/* Loading indicator for infinite scroll */}
      {!isLoading && videoFeed.length > 0 && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-flux-text-secondary text-sm bg-flux-bg-tertiary/50 backdrop-blur-sm px-3 py-1 rounded-full border border-flux-border-accent/30">
          {currentVideoIndex + 1} / {videoFeed.length}
        </div>
      )}
    </div>
  );
};
"use client";

import { useState, useEffect } from "react";
import { Eye, Heart, User } from "lucide-react";

type Stats = {
  viewerCount: number;
  likeCount: number;
  followCount: number;
};

export default function TiktokConnector() {
  const [username, setUsername] = useState("bestdev01");
  const [stats, setStats] = useState<Stats>({
    viewerCount: 0,
    likeCount: 0,
    followCount: 0,
  });
  const [pollingInterval, setPollingInterval] = useState(null);

  useEffect(() => {
    connectToTikTok();
  }, [username]);

  const connectToTikTok = async () => {
    if (!username) return;

    const response = await fetch(
      `/api/tiktok-live?username=${encodeURIComponent(username)}&action=connect`
    );
    const data = await response.json();

    if (response.ok && data.success) {
      startPolling();
    }
  };

  const fetchUpdates = async () => {
    const response = await fetch(
      `/api/tiktok-live?username=${encodeURIComponent(
        username
      )}&action=statistic`
    );

    if (response.ok) {
      const data = await response.json();
      setStats(data.stats);
    } else {
      const data = await response.json();
      if (data.error === "Not connected") {
        stopPolling();
      }
    }
  };

  const startPolling = () => {
    stopPolling();
    const interval = setInterval(fetchUpdates, 2000);
    setPollingInterval(interval);
  };

  const stopPolling = () => {
    if (pollingInterval) {
      clearInterval(pollingInterval);
      setPollingInterval(null);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-4 max-w-4xl mx-auto">
      <a
        href={`https://www.tiktok.com/@${username}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1"
      >
        <span className="animate-pulse rounded-full h-2 w-2 bg-red-500" />
        <span>@{username}</span>
      </a>
      <div className="flex items-center gap-2">
        <Eye className="h-6 w-6" /> {stats.viewerCount}
      </div>
    </div>
  );
}

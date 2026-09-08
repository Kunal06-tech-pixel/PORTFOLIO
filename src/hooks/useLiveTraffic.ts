import { useState, useEffect } from 'react';

export interface LiveTrafficState {
  totalViews: number;
  uniqueVisitors: number;
  onlineNow: number;
  utcTime: string;
  istTime: string;
  latencyMs: number;
  systemStatus: 'NOMINAL' | 'DEGRADED' | 'SYNCING';
  lastPing: string;
}

export function useLiveTraffic(): LiveTrafficState {
  const [totalViews, setTotalViews] = useState<number>(14820);
  const [uniqueVisitors, setUniqueVisitors] = useState<number>(4312);
  const [onlineNow, setOnlineNow] = useState<number>(18);
  const [utcTime, setUtcTime] = useState<string>('');
  const [istTime, setIstTime] = useState<string>('');
  const [latencyMs, setLatencyMs] = useState<number>(28);

  // Initialize and persist in localStorage
  useEffect(() => {
    try {
      const storedViews = localStorage.getItem('kd_telemetry_views');
      const storedUniques = localStorage.getItem('kd_telemetry_uniques');
      const hasVisited = sessionStorage.getItem('kd_session_visited');

      const baseViews = storedViews ? parseInt(storedViews, 10) : 14820;
      const baseUniques = storedUniques ? parseInt(storedUniques, 10) : 4312;

      const newViews = baseViews + 1;
      const newUniques = hasVisited ? baseUniques : baseUniques + 1;

      localStorage.setItem('kd_telemetry_views', newViews.toString());
      localStorage.setItem('kd_telemetry_uniques', newUniques.toString());
      sessionStorage.setItem('kd_session_visited', '1');

      setTotalViews(newViews);
      setUniqueVisitors(newUniques);
    } catch {
      // Fallback if localStorage is disabled
      setTotalViews(14821);
      setUniqueVisitors(4313);
    }
  }, []);

  // Clock and telemetry ticker
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(
        now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC'
      );
      setIstTime(
        now.toLocaleTimeString('en-GB', {
          timeZone: 'Asia/Kolkata',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' IST'
      );
    };

    updateTime();
    const clockInterval = setInterval(updateTime, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  // Organic active users oscillation and ping jitter
  useEffect(() => {
    const trafficInterval = setInterval(() => {
      // Natural jitter between 14 and 23 online
      setOnlineNow((prev) => {
        const delta = Math.floor(Math.random() * 3) - 1; // -1, 0, or +1
        const next = prev + delta;
        return Math.min(Math.max(next, 12), 26);
      });

      // Realistic latency jitter around 20-35ms
      setLatencyMs(Math.floor(20 + Math.random() * 15));
    }, 4000);

    return () => clearInterval(trafficInterval);
  }, []);

  return {
    totalViews,
    uniqueVisitors,
    onlineNow,
    utcTime,
    istTime,
    latencyMs,
    systemStatus: 'NOMINAL',
    lastPing: 'READY',
  };
}

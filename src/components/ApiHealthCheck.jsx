'use client'

import { useState, useEffect } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export default function ApiHealthCheck() {
  const [status, setStatus] = useState('checking');
  const [message, setMessage] = useState('Checking API connection...');

  useEffect(() => {
    const checkApiHealth = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/health`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          signal: AbortSignal.timeout(3000), // 3 second timeout
        });

        if (response.ok) {
          const data = await response.json();
          setStatus('connected');
          setMessage(data.message || 'API server is running');
        } else {
          throw new Error(`HTTP ${response.status}`);
        }
      } catch (error) {
        setStatus('disconnected');
        setMessage(`API server unavailable: ${error.message}`);
      }
    };

    checkApiHealth();
    
    // Check every 30 seconds
    const interval = setInterval(checkApiHealth, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    switch (status) {
      case 'connected': return 'text-green-600';
      case 'disconnected': return 'text-red-600';
      default: return 'text-yellow-600';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'connected': return '🟢';
      case 'disconnected': return '🔴';
      default: return '🟡';
    }
  };

  return (
    <div className="flex items-center space-x-2 text-sm">
      <span className="text-lg">{getStatusIcon()}</span>
      <span className={`font-medium ${getStatusColor()}`}>
        API: {status === 'connected' ? 'Online' : status === 'disconnected' ? 'Offline' : 'Checking...'}
      </span>
    </div>
  );
}
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bell } from 'lucide-react';

export interface Notification {
    id: string;
    type: 'success' | 'warning' | 'info';
    title: string;
    message: string;
    time: string;
    read: boolean;
}

export function NotificationButton() {
    const router = useRouter();
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem('notifications');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setNotifications(Array.isArray(parsed) ? parsed : []);
            } catch (error) {
                console.error('Failed to parse notifications:', error);
                localStorage.removeItem('notifications');
            }
        }
    }, []);

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <button
            onClick={() => router.push('/notifications')}
            className="relative p-2 min-w-[44px] min-h-[44px] rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} non lues)` : ''}`}
        >
            <Bell className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center" aria-label={`${unreadCount} notifications non lues`}>
                    {unreadCount}
                </span>
            )}
        </button>
    );
}

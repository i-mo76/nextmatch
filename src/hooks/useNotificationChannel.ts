import { pusherClient } from '@/lib/pusher';
import { usePathname, useSearchParams } from 'next/navigation';
import { Channel } from 'pusher-js'
import { useCallback, useEffect, useRef } from 'react'
import useMessageStore from './useMessageStore';
import { MessageDto } from '@/types';
import { newLikeToast, newMessageToast } from '@/components/NotificationToast';

export const useNotificationChannel = (userId: string | null, profileComplete: boolean) => {
    const channelRef = useRef<Channel | null>(null);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const add = useMessageStore(state => state.add)
    const updateUnreadCount = useMessageStore(state => state.updateUnreadCount)

    const handleNewMessage = useCallback((message: MessageDto) => {
        if (pathname === '/messages' && searchParams.get('container') !== 'outbox') {
            add(message);
            updateUnreadCount(1);
        } else if (pathname !== `/members/${message.senderId}/chat`) {
            newMessageToast(message);
            updateUnreadCount(1);
        }
    }, [add, pathname, searchParams, updateUnreadCount]);

    const handleNewLike = (data: { name: string, image: string | null, userId: string }) => {
        newLikeToast(data.name, data.image, data.userId);
    }

    useEffect(() => {
        if (!userId || !profileComplete) return;
        if (!channelRef.current) {
            channelRef.current = pusherClient.subscribe(`private-${userId}`);
            channelRef.current.bind('message:new', handleNewMessage);
            channelRef.current.bind('like:new', handleNewLike);
        }

        return () => {
            if (channelRef.current && channelRef.current.subscribed) {
                channelRef.current.unsubscribe();
                channelRef.current.unbind_all();
                // channelRef.current.unbind('message:new', handleNewMessage);
                // channelRef.current.unbind('like:new', handleNewLike);
                channelRef.current = null;
            }
        }
    }, [userId, handleNewMessage, profileComplete])
}
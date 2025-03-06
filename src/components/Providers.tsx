"use client";

import { getUnreadMessageCount } from '@/app/actions/messageActions';
import useMessageStore from '@/hooks/useMessageStore';
import { useNotificationChannel } from '@/hooks/useNotificationChannel';
import { usePresenceChannel } from '@/hooks/usePresenceChannel';
import { HeroUIProvider } from '@heroui/system'
import { ReactNode, useCallback, useEffect, useRef } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Providers({ userId, children }: { userId: string | null, children: ReactNode }) {
  const isUnreadCountSet = useRef(false);
  const  updateUnreadCount  = useMessageStore(state => (state.updateUnreadCount));

  const setUnreadCount = useCallback((amount: number) => {
    updateUnreadCount(amount);
  }, [updateUnreadCount])

  useEffect(() => {
    if (!isUnreadCountSet.current && userId) {
      getUnreadMessageCount().then(count => {
        setUnreadCount(count)
      });
      isUnreadCountSet.current = true;
    }
  }, [setUnreadCount, userId])

  usePresenceChannel(userId);
  useNotificationChannel(userId);
  return (
      <HeroUIProvider>
           <ToastContainer position='bottom-right' hideProgressBar className='z-50' />
        {children}
    </HeroUIProvider>
  )
}

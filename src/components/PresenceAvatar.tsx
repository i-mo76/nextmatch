import usePresenceStore from '@/hooks/usePresenceStore';
import { Avatar } from '@heroui/avatar';
import { Badge } from '@heroui/badge';
import React from 'react'
// import { useShallow } from 'zustand/shallow';

type Props = {
    userId?: string;
    src?: string | null;
}

export default function PresenceAvatar({ userId, src }: Props) {
    //other approach instead of useShallow
    const members = usePresenceStore(state => state.members);
    
    // const { members } = usePresenceStore(
    //     useShallow(
    //     state => ({
    //     members: state.members
    // })))

    const isOnline = userId && members.indexOf(userId) !== -1;

    return (
        <Badge content="" color="success" shape='circle' isInvisible={!isOnline}>
            <Avatar src={src || '/images/user.png'} alt='User avatar' />
        </Badge>
    )
}

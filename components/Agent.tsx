"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // ✅ FIXED import
import { vapi } from '@/lib/vapi.sdk';

enum CallStatus {
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED"
}

interface SavedMessage {
    role: 'user' | 'system' | 'assistant';
    content: string;
}

interface AgentProps {
    userName: string;
    userId: string;
    type: string;
}

const Agent = ({ userName, userId, type }: AgentProps) => {
    const router = useRouter();
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const [messages, setMessages] = useState<SavedMessage[]>([]);

    useEffect(() => {
        const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
        const onCallEnd = () => setCallStatus(CallStatus.FINISHED);

        const onMessage = (message: any) => {
            if (message.type === 'transcript' && message.transcriptType === 'final') {
                const newMessage = { role: message.role, content: message.transcript };
                setMessages((prev) => [...prev, newMessage]);
            }
        };

        const onSpeechStart = () => setIsSpeaking(true);
        const onSpeechEnd = () => setIsSpeaking(false);
        const onError = (error: Error) => console.log("Error", error);

        vapi.on('call-start', onCallStart);
        vapi.on('call-end', onCallEnd);
        vapi.on('message', onMessage);
        vapi.on('speech-start', onSpeechStart);
        vapi.on('speech-end', onSpeechEnd);
        vapi.on('error', onError);

        return () => {
            vapi.off('call-start', onCallStart);
            vapi.off('call-end', onCallEnd);
            vapi.off('message', onMessage);
            vapi.off('speech-start', onSpeechStart);
            vapi.off('speech-end', onSpeechEnd);
            vapi.off('error', onError);
        };
    }, []);

    useEffect(() => {
        if (callStatus === CallStatus.FINISHED) router.push('/');
    }, [messages, callStatus, type, userId]);

    const handleCall = async () => {
        setCallStatus(CallStatus.CONNECTING);
        await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
            variableValues: {
                username: userName,
                userid: userId,
            }
        });
    };

    const handleDisconnect = async () => {
        setCallStatus(CallStatus.FINISHED);
        vapi.stop();
    };

    const latestMessage = messages[messages.length - 1]?.content;
    const isCallInactiveOrFinished = callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED;

    return (
        <div className='call-container flex flex-col items-center w-full max-w-3xl mx-auto'>
            <div className='call-view flex justify-between w-full'>
                <div className='card flex flex-col items-center justify-center w-1/2 h-64 bg-gray-100 rounded-lg p-4 shadow-md'>
                    <div className='avatar relative'>
                        <Image src='/ai-avatar.png' alt="AI Interviewer" width={100} height={100} className="object-cover rounded-full" />
                        {isSpeaking && <span className='animate-speak'></span>}
                    </div>
                    <h3 className='mt-3 text-lg font-semibold'>AI Interviewer</h3>
                </div>

                <div className='card flex flex-col items-center justify-center w-1/2 h-64 bg-gray-100 rounded-lg p-4 shadow-md'>
                    <Image src="/user-avatar.png" alt='User avatar' width={100} height={100} className="rounded-full object-cover" />
                    <h3 className='mt-3 text-lg font-semibold'>{userName}</h3>
                </div>
            </div>

            {messages.length > 0 && (
                <div className='transcript-border mt-4 p-2 rounded-md w-full text-center'>
                    <p className="animate-fadeIn">{latestMessage}</p>
                </div>
            )}

            <div className='call-status w-full flex justify-center mt-6'>
                {callStatus === CallStatus.ACTIVE ? (
                    <button
                        className='btn-disconnect px-6 py-2 bg-red-500 text-white rounded-lg shadow-md'
                        onClick={handleDisconnect}
                    >
                        FINISH
                    </button>
                ) : (
                    <button
                        className='btn-connect px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md'
                        onClick={handleCall}
                    >
                        {isCallInactiveOrFinished ? 'Call' : '. . .'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Agent;

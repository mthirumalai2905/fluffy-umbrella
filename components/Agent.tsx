import React from 'react';
import Image from 'next/image';

enum CallStatus {
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED"
}

const Agent = ({ userName }: AgentProps) => {
    const isSpeaking = true;
    const callStatus = CallStatus.FINISHED;
    const messages = ['Whats your name?', "My Name is John Doe, nice to meet you!"];
    const lastMessage = messages[messages.length - 1];

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
                <div className='transcript-border mt-4 p-2  rounded-md w-full text-center'>
                    <p className="animate-fadeIn">{lastMessage}</p>
                </div>
            )}

            <div className='call-status w-full flex justify-center mt-6'>
                {callStatus === CallStatus.ACTIVE ? (
                    <button className='btn-disconnect px-6 py-2 bg-red-500 text-white rounded-lg shadow-md'>
                        FINISH
                    </button>
                ) : (
                    <button className='btn-connect px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md'>
                        {callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED ? 'Call' : '. . .'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Agent;

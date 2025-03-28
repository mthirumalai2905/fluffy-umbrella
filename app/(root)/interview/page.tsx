import React from 'react';
import Agent from '@/components/Agent';

const Page = () => {
    return (
        <div>
            <div>Interview Page</div>
            <Agent userName="You" userId="user1" type="generate" />
        </div>
    );
};

export default Page;

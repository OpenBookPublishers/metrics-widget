import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/outline';

export default function NoData() {
    return (
        <div className="flex w-full h-full justify-center items-center bg-gray-100">
            <div className="flex flex-row gap-1 text-gray-600">
                <ExclamationCircleIcon className="h-5 w-5 block" />
                <span>No data available.</span>
            </div>
        </div>
    );
}

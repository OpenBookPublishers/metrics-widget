import React from 'react';
import { SpinnerRound } from 'spinners-react';

export default function Spinner() {
    return (
        <div className="flex w-full h-full justify-center items-center bg-gray-100">
            <SpinnerRound size={100} thickness={70} color="rgba(37, 99, 235, 1)" />
        </div>
    );
}

'use client'
import React from 'react';
import { fetchWrapper } from '@/utils/fetch';

const ToggleIncidentButton: React.FC<{ incidentId: number, status: string }> = ({ incidentId, status }) => {
    const [currentStatus, setCurrentStatus] = React.useState<'ACTIVE' | 'INACTIVE'>(status as 'ACTIVE' | 'INACTIVE');
    React.useEffect(() => {
        setCurrentStatus(status as 'ACTIVE' | 'INACTIVE'); // Set the initial status from the parent component
    }, [status]);

    const handleClick = async () => {
        const response = await fetchWrapper(`/api/incidents/product/${incidentId}`, 'PUT');
        console.log(response); // Log the response here
        setCurrentStatus(response.status); // Assuming the response contains the new status
    };

    return (
        <button
            onClick={handleClick}
            style={{ backgroundColor: currentStatus === 'ACTIVE' ? 'green' : 'red' }}
        >
            {currentStatus === 'ACTIVE' ? 'Resolved' : 'Unresolved'}
        </button>
    );
};

const ToggleProductButton: React.FC<{ productSlug: string, status: string }> = ({ productSlug, status }) => {
    const [currentStatus, setCurrentStatus] = React.useState<'ACTIVE' | 'INACTIVE'>(status as 'ACTIVE' | 'INACTIVE');
    React.useEffect(() => {
        setCurrentStatus(status as 'ACTIVE' | 'INACTIVE'); // Set the initial status from the parent component
    }, [status]);

    const handleClick = async () => {
        const response = await fetchWrapper(`/api/products/${productSlug}/active`, 'PUT');
        console.log(response); // Log the response here
        setCurrentStatus(response.status); // Assuming the response contains the new status
    };

    return (
        <button
            onClick={handleClick}
            style={{ backgroundColor: currentStatus === 'ACTIVE' ? 'green' : 'red' }}
        >
            {currentStatus === 'ACTIVE' ? 'Active' : 'Deactivated'}
        </button>
    );
};

export { ToggleIncidentButton, ToggleProductButton };

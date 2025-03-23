import ImageGallery from '@/components/BentoGrids/BentoGridProsthetic';
import { Filters } from '@/components/shared/filters';
import InitializeFiltersShop from '@/components/shared/FiltersFetcher';
// import FiltersFetcher from '@/components/shared/FiltersFetcher';
import React from 'react';

const Shop = ({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) => {
    return (
        <>
    <div style={{ padding: '20px', backgroundColor: '#333', color: '#fff', borderRadius: '8px' }}>
        <p style={{ marginBottom: '10px', lineHeight: '1.6' }}>
        Before using any of these devices, it is essential to consult with a medical professional. Our volunteers are not healthcare experts, so it’s important to seek advice from a trained specialist to determine if these 3D printed prosthetic devices are suitable for your needs.
        </p>
        <p style={{ lineHeight: '1.6' }}>
        Based on initial testing and observations of the functionality of our experimental 3D printed prosthetics, we believe they are not safe for use in operating heavy machinery, tools, equipment, or vehicles due to insufficient grip strength. However, these prosthetics have shown some ability to assist with gross grasp tasks involving light, flexible objects, but they should not be considered a replacement for a fully functional hand. Additionally, we do not recommend using our experimental 3D printed prosthetics for children under the age of 3, as they may have a higher risk of falling and require sensory feedback through oral stimulation. It is also uncertain whether these prosthetics can withstand the bite force of a small child without breaking. 
        </p>
    </div>
            
        <div>
            <ImageGallery searchParams={searchParams} />
            {/* <InitializeFiltersShop />
            <Filters /> */}
        </div>
        </>
    );
};

export default Shop;
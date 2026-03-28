'use client'

// useScreenDimensions.ts
import { useState, useEffect } from 'react';

interface ScreenDimensions {
    width: number;
    height: number;
    availWidth: number;
    availHeight: number;
    pixelRatio: number;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
}

function getWindowDimensions(): ScreenDimensions {
    return {
        width: window.screen.width,
        height: window.screen.height,
        availWidth: window.screen.availWidth,
        availHeight: window.screen.availHeight,
        pixelRatio: window.devicePixelRatio,
        isMobile: window.innerWidth < 768,
        isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
        isDesktop: window.innerWidth >= 1024,
    };
}

function useDeviceDimensions(): ScreenDimensions {
    const [dimensions, setDimensions] = useState<ScreenDimensions>({
        width: 0,
        height: 0,
        availWidth: 0,
        availHeight: 0,
        pixelRatio: 1,
        isMobile: false,
        isTablet: false,
        isDesktop: false,
    });

    useEffect(() => {
        // Set real values on first client render
        setDimensions(getWindowDimensions());

        const handleResize = () => {
            setDimensions(getWindowDimensions());
        };

        window.addEventListener('resize', handleResize);
        // Handle orientation change for mobile
        window.addEventListener('orientationchange', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('orientationchange', handleResize);
        };
    }, []);

    return dimensions;
}

export default useDeviceDimensions;
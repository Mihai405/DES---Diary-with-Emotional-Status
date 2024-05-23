import NavBar from './NavBar/NavBar';
import React from 'react';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <NavBar />
            <div className="homeScreen-container">{children}</div>
        </div>
    );
}

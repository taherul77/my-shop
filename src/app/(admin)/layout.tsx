import { SidebarM } from '@/components/shared/sidebar/SidebarM';
import React from 'react';

const layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <SidebarM>
            {children}
        </SidebarM>
    );
};

export default layout;
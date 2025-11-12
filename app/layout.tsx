import React from 'react';

export const metadata = {
    title: 'Your App Title',
    description: 'Your App Description',
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <html lang="en">
            <head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
            </head>
            <body>{children}</body>
        </html>
    );
};

export default RootLayout;
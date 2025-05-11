import type { ThemeConfig } from 'antd';

export const theme: ThemeConfig = {
    token: {
        // Primary color
        colorPrimary: '#FE9F43',

        // Border radius
        borderRadius: 6,

        // Font family
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',

        // Colors
        colorSuccess: '#52c41a',
        colorWarning: '#faad14',
        colorError: '#ff4d4f',
        colorInfo: '#1677ff',

        // Components
        colorBgContainer: '#ffffff',
        colorBgElevated: '#ffffff',
        colorBgLayout: '#f5f5f5',

        // Typography
        fontSize: 14,
        lineHeight: 1.5715,
    },
    components: {
        Button: {
            borderRadius: 6,
            controlHeight: 36,
        },
        Card: {
            borderRadius: 8,
        },
        Input: {
            borderRadius: 6,
        },
    },
}; 
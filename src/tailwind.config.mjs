/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './public/**/*.html'],
    theme: {
        extend: {
            fontSize: {
                xs: ['0.75rem', { lineHeight: '1.25', letterSpacing: '0.02em', fontWeight: '400' }],
                sm: ['0.875rem', { lineHeight: '1.3', letterSpacing: '0.03em', fontWeight: '400' }],
                base: ['1rem', { lineHeight: '1.5', letterSpacing: '0.03em', fontWeight: '400' }],
                lg: ['1.125rem', { lineHeight: '1.4', letterSpacing: '0.04em', fontWeight: '500' }],
                xl: ['1.25rem', { lineHeight: '1.4', letterSpacing: '0.04em', fontWeight: '500' }],
                '2xl': ['1.5rem', { lineHeight: '1.3', letterSpacing: '0.05em', fontWeight: '600' }],
                '3xl': ['1.875rem', { lineHeight: '1.2', letterSpacing: '0.05em', fontWeight: '700' }],
                '4xl': ['2.25rem', { lineHeight: '1.15', letterSpacing: '0.06em', fontWeight: '700' }],
                '5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '0.07em', fontWeight: '800' }],
                '6xl': ['3.75rem', { lineHeight: '1.05', letterSpacing: '0.08em', fontWeight: '800' }],
                '7xl': ['4.5rem', { lineHeight: '1.02', letterSpacing: '0.09em', fontWeight: '900' }],
                '8xl': ['6rem', { lineHeight: '1', letterSpacing: '0.1em', fontWeight: '900' }],
                '9xl': ['8rem', { lineHeight: '1', letterSpacing: '0.12em', fontWeight: '900' }],
            },
            fontFamily: {
                heading: "syne",
                paragraph: "space grotesk"
            },
            colors: {
                destructive: '#FF4136',
                'destructive-foreground': '#FFFFFF',
                'pastel-lavender': '#BDB2FF',
                'pastel-mint': '#90EE90',
                'pastel-peach': '#FFDAB9',
                background: '#1A1A2E',
                secondary: '#A0D2DB',
                foreground: '#E0E0E0',
                'secondary-foreground': '#1A1A1A',
                'primary-foreground': '#FFFFFF',
                primary: '#FF6B6B'
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                black: 'rgb(37, 35, 50)',
                blue: '#1C6899',
                red: '#900C3F',
                grey: '#CAD0D9',
                transparent: 'rgba(255, 255, 255, 0.12)',
            },
            fontFamily: {
                food: ['Poppins', 'Ubuntu', 'sans-serif'],
            },
        },
    },
    plugins: [],
}

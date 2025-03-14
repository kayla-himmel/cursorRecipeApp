export const convertTemperatures = (text: string): string => {
    // Match patterns like "180°C" or "180C" or "180 C" or "180 °C"
    return text.replace(/(\d+)\s*(?:°\s*)?[Cc]\b/g, (match, celsius) => {
        const fahrenheit = Math.round(celsius * 9/5 + 32);
        return `${celsius}°C (${fahrenheit}°F)`;
    });
}; 
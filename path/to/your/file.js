async function getFinancialAdvice() {
    try {
        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer YOUR_API_KEY`
            },
            body: JSON.stringify({
                // Your request payload
            })
        });

        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching financial advice:', error);
        throw error;
    }
}

const API_BASE_URL = "http://localhost:8000";

/**
 * Sends an audio blob to the backend for analysis.
 * @param {Blob} audioBlob - The recorded audio blob.
 * @returns {Promise<Object>} - The analysis result containing transcription, dialogue, and SOAP note.
 */
export const analyzeAudio = async (audioBlob) => {
    const formData = new FormData();
    // Ensure the file has a recognizable extension, e.g., .wav or .webm
    formData.append("file", audioBlob, "recording.webm");

    try {
        const response = await fetch(`${API_BASE_URL}/analyze`, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Analysis failed");
        }

        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};

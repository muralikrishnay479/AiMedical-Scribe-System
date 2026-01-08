import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(
    api_key=os.environ.get("GROQ_API_KEY"),
)

async def transcribe_audio(file_path: str):
    with open(file_path, "rb") as file:
        transcription = client.audio.transcriptions.create(
            file=(file_path, file.read()),
            model="whisper-large-v3", # or distinct model if needed
            response_format="json",
            language="en",
            temperature=0.0
        )
    return transcription.text

import json

async def generate_soap_note(transcript: str):
    # Run in parallel to save time? For now sequential is safer/easier to debug, but asyncio.gather is better for UX.
    import asyncio
    
    async def get_dialogue():
        completion = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {
                    "role": "system",
                    "content": """You are an expert medical scribe. Your task is to analyze the transcript and format it as a structured dialogue.
Return a JSON object with a single key "dialogue" containing a list of objects. Each object must have:
- "speaker": "Doctor" or "Patient"
- "text": The spoken text.
Identify speakers based on context.
Example: {"dialogue": [{"speaker": "Doctor", "text": "Hi"}, {"speaker": "Patient", "text": "Hello"}]}"""
                },
                {
                    "role": "user",
                    "content": f"Transcript:\n{transcript}\n\nGenerate structured dialogue JSON:"
                }
            ],
            temperature=0.1,
            max_tokens=4096,
            response_format={"type": "json_object"}
        )
        try:
            return json.loads(completion.choices[0].message.content).get("dialogue", [])
        except:
            return []

    async def get_soap():
        completion = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {
                    "role": "system",
                    "content": """You are an expert medical scribe. Generate a comprehensive SOAP note based on the transcript.
Return a JSON object with the following keys:
- "subjective": String. Patient's history, symptoms, and complaints.
- "objective": String. Physical findings and vital signs (if mentioned).
- "assessment": String. Diagnosis or potential diagnoses.
- "plan": String. Treatment plan, medications, and follow-up.
"""
                },
                {
                    "role": "user",
                    "content": f"Transcript:\n{transcript}\n\nGenerate SOAP Note JSON:"
                }
            ],
            temperature=0.3,
            max_tokens=2048,
            response_format={"type": "json_object"}
        )
        try:
            return json.loads(completion.choices[0].message.content)
        except:
            return {
                "subjective": "Error generating note.",
                "objective": "",
                "assessment": "",
                "plan": ""
            }

    # Execute both
    dialogue, soap_note = await asyncio.gather(get_dialogue(), get_soap())
    
    return {
        "dialogue": dialogue,
        "soap_note": soap_note
    }

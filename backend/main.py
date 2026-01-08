from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from services import transcribe_audio, generate_soap_note
import shutil
import os
import uuid

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/analyze")
async def analyze_audio(file: UploadFile = File(...)):
    # Save the uploaded file temporarily
    file_extension = os.path.splitext(file.filename)[1]
    file_name = f"{uuid.uuid4()}{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, file_name)
    
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        # transcription is the raw text from Whisper
        raw_transcript = await transcribe_audio(file_path)
        
        # analysis is the dict {dialogue: [...], soap_note: "..."}
        analysis = await generate_soap_note(raw_transcript)
        
        return {
            "raw_transcription": raw_transcript,
            "dialogue": analysis.get("dialogue", []),
            "soap_note": analysis.get("soap_note", "")
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        # cleanup
        if os.path.exists(file_path):
            os.remove(file_path)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

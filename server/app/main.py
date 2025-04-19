import logging
import re
from urllib import response

from pydantic import ValidationError
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse, StreamingResponse
from app.api.utils import get_title_from_url, iterfile, pitch_shift
from app.api.model import (
    YouTubePitchShiftRequest,
    YouTubePitchShiftResponse,
    YouTubeURL,
)
import yt_dlp
import logging
from moviepy import VideoFileClip, AudioFileClip
from pathlib import Path

app = FastAPI()


@app.post("/process", response_model=YouTubePitchShiftResponse)
async def process_youtube_url(data: YouTubePitchShiftRequest):
    try:
        url = str(data.url)
        pitch_shift_value = data.pitch_shift

        video_id = (
            url.split("v=")[1].split("&")[0] if "v=" in url else url.split("/")[-1]
        )

        if Path(
            f"/tmp/videos/video_edited_{video_id}_{pitch_shift_value}.mp4"
        ).exists():
            logging.info(f"Video already processed: {video_id}")
            return {
                "videoId": video_id,
                "title": get_title_from_url(url),
                "message": "Video already processed",
            }

        output_file = f"/tmp/videos/video_{video_id}.mp4"
        ydl_opts = {
            "outtmpl": output_file,
            "format": "best",
        }

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            logging.info(url)
            ydl.download([url])
        logging.info(f"Downloaded video: {output_file}")

        video = VideoFileClip(output_file)
        audio_output_file = f"/tmp/audio/audio_{video_id}.mp3"
        audio_output_edited_file = (
            f"/tmp/audio/audio_edited_{video_id}_{pitch_shift_value}.mp3"
        )
        video.audio.write_audiofile(audio_output_file)
        logging.info(f"Converted video to audio: {audio_output_file}")
        pitch_shift(audio_output_file, audio_output_edited_file, pitch_shift_value)

        final_output_file = (
            f"/tmp/videos/video_edited_{video_id}_{pitch_shift_value}.mp4"
        )
        video_with_edited_audio = video.with_audio(
            AudioFileClip(audio_output_edited_file)
        )
        video_with_edited_audio.write_videofile(
            final_output_file,
            codec="libx264",
            audio_codec="aac",
            temp_audiofile_path="/tmp",
        )
        logging.info(f"Replaced audio in video: {final_output_file}")
        return {
            "videoId": video_id,
            "title": get_title_from_url(url),
            "message": "YouTube URL processed successfully",
        }

    except ValidationError as e:
        logging.error(f"Validation error: {e}")
        raise HTTPException(status_code=422, detail="Validation error")
    except Exception as e:
        logging.error(f"Error processing YouTube URL: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


@app.post("/save", response_model=YouTubePitchShiftResponse)
async def save_audio_video_from_url(data: YouTubeURL):
    try:
        url = str(data.url)

        video_id = (
            url.split("v=")[1].split("&")[0] if "v=" in url else url.split("/")[-1]
        )

        if (
            Path(f"/tmp/videos/video_{video_id}.mp4").exists()
            and Path(f"/tmp/audio/audio_{video_id}.mp3").exists()
        ):
            logging.info(f"Video and audio already saved: {video_id}")
            return {
                "videoId": video_id,
                "title": get_title_from_url(url),
                "message": "Video and audio already saved",
            }

        output_file = f"/tmp/videos/video_{video_id}.mp4"
        ydl_opts = {
            "outtmpl": output_file,
            "format": "best",
        }

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            logging.info(url)
            ydl.download([url])
        logging.info(f"Downloaded video: {output_file}")

        video = VideoFileClip(output_file)

        audio_output_file = f"/tmp/audio/audio_{video_id}.mp3"
        video.audio.write_audiofile(audio_output_file)

        return {
            "videoId": video_id,
            "title": get_title_from_url(url),
            "message": "YouTube URL processed successfully",
        }
    except ValidationError as e:
        logging.error(f"Validation error: {e}")
        raise HTTPException(status_code=422, detail="Validation error")
    except Exception as e:
        logging.error(f"Error processing YouTube URL: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


@app.get("/health")
async def health_check():
    return "OK"


@app.get(
    "/video/{video_id}_{pitch_shift_value}",
    responses={
        200: {
            "content": {"text/plain": {}},
            "description": "Stream plain text using utf8 charset.",
        }
    },
)
async def get_video_with_pitch(video_id: str, pitch_shift_value: str):
    try:
        float(pitch_shift_value)
    except ValueError:
        raise HTTPException(status_code=400, detail="File not found")
    video_path = Path(
        f"/tmp/videos/video_edited_{video_id}_{float(pitch_shift_value)}.mp4"
    )
    if video_path.exists():
        return StreamingResponse(iterfile(video_path), media_type="video/mp4")
    else:
        raise HTTPException(status_code=404, detail="File not found")


@app.get(
    "/video/{video_id}",
    responses={
        200: {
            "content": {"video/mp4": {}},
            "description": "Stream video/mp4 using utf8 charset.",
        }
    },
)
async def get_video(video_id: str):
    video_path = Path(f"/tmp/videos/video_{video_id}.mp4")
    if video_path.exists():
        return StreamingResponse(iterfile(video_path), media_type="video/mp4")
    else:
        raise HTTPException(status_code=404, detail="File not found")


@app.get(
    "/audio/{audio_id}",
    responses={
        200: {
            "content": {"audio/mpeg": {}},
            "description": "Stream audio/mpeg using utf8 charset.",
        }
    },
)
async def get_audio(
    audio_id: str,
    responses={
        200: {
            "content": {"audio/mpeg": {}},
            "description": "Stream audio/mpeg using utf8 charset.",
        }
    },
):
    audio_path = Path(f"/tmp/audio/audio_{audio_id}.mp3")
    if audio_path.exists():
        return StreamingResponse(iterfile(audio_path), media_type="audio/mpeg")
    else:
        raise HTTPException(status_code=404, detail="File not found")

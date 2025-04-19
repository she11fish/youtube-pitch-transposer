from pydantic import BaseModel, HttpUrl, StrictFloat, StrictStr, field_validator


class YouTubePitchShiftRequest(BaseModel):
    url: HttpUrl
    pitch_shift: StrictFloat

    @field_validator("url")
    def validate_youtube_url(cls, url):
        if not str(url).startswith(("https://www.youtube.com/", "https://youtu.be/")):
            raise ValueError("Invalid YouTube URL")
        return url


class YouTubePitchShiftResponse(BaseModel):
    videoId: StrictStr
    title: StrictStr
    message: StrictStr

class YouTubeURL(BaseModel):
    url: HttpUrl

    @field_validator("url")
    def validate_youtube_url(cls, url):
        if not str(url).startswith(("https://www.youtube.com/", "https://youtu.be/")):
            raise ValueError("Invalid YouTube URL")
        return url

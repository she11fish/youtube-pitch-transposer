import logging
import sox
import yt_dlp

def pitch_shift(input_file, output_file, pitch_semitones):
    tfm = sox.Transformer()
    tfm.pitch(pitch_semitones)
    tfm.build(input_file, output_file)


def get_title_from_url(url: str) -> str:
    try:
        ydl_opts = {"quiet": True, "skip_download": True}
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info_dict = ydl.extract_info(url, download=False)
            return info_dict.get("title", "Unknown Title")
    except Exception as e:
        logging.error(f"Error fetching title from URL: {e}")
        return "Unknown Title"
    
def iterfile(file_path):
    with open(file_path, mode="rb") as file_like:
        yield from file_like

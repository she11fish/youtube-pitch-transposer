# YouTube Pitch Transposer

YouTube Pitch Transposer is a tool designed to adjust the pitch of audio in YouTube videos without affecting playback speed. This can be useful for musicians, vocalists, or anyone looking to analyze or practice with audio at different pitch levels.

## Why?
If you don't like installing extensions like me, I like to google a specific thing I want to do and just use it.
However when googling up YouTube Pitch Transposer, can't find any online which is a bit disappointing.
Therefore, I created this website to fulfill this purpose.  

## Features

- Adjust pitch in increments of 0.01 for fine control.
- Real-time pitch shifting during video playback.
- High-quality pitch adjustment for preprocessed videos.
- User-friendly interface for seamless interaction.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/youtube-pitch-transposer.git
   ```
2. Navigate to the project directory:
   ```bash
   cd youtube-pitch-transposer
   ```

## Setup
### Frontend
1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Run Next js:
   ```bash
   pnpm run dev
   ```

### Server
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Create and use [virtual environment](https://docs.python.org/3/tutorial/venv.html) for the server (optional but highly recommended):
3. Install dependencies:
  Make sure you are in the virtual environment (if you decided to follow step 2) before moving on to step 3.
   ```bash
   pip install -r requirements.txt
   ```
4. Run the server:
   ```bash
   fastapi run app/main.py
   ```
You should be able to use it now by going to `http://localhost:3000`


## Docker
If you run the application with docker, here's how to do it.
## Frontend
1. cd to client directory
2. docker compose up

## Server
1. cd to server directory
2. docker compose up

## API Endpoints

The application interacts with the FastAPI server for pitch processing. Below are the key endpoints:

- **`POST /process`**: Processes a YouTube video URL and applies the pitch shift. Returns the processed video info or a message if the video has already been processed.
- **`POST /save`**: Saves the video and audio from a YouTube URL without applying pitch adjustments.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes and push the branch:
   ```bash
   git commit -m "Add feature-name"
   git push origin feature-name
   ```
4. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

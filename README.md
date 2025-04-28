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
   You should be able to use it now by going to `http://localhost:3000`

### Server

1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Create and use [virtual environment](https://docs.python.org/3/tutorial/venv.html) for the server (optional but highly recommended):
3. Install dependencies:
   Make sure you are in the virtual environment (if you decided to follow step 2) before moving on to step 3.
   ```bash
   pip install -r requirements/dev.txt
   ```
4. Run the server:
   ```bash
   fastapi run app/main.py
   ```
   You should be able to use it now by going to `http://localhost:8000`

## Docker

If you run the application with docker, here's how to do it.

### Development

```bash
docker compose -f docker-compose.dev.yml up
```

### Production

To deploy the application in production:

1. **Enable Docker Swarm Mode**  
   (if not already enabled)

   ```bash
   docker swarm init
   ```

2. **Set up secrets**  
   Create a `secrets` folder containing the necessary secret files. Each secret should be a plain text file with the required value, organized like this:

   ```
   secrets/
   ├── app_port.txt
   ├── api_url.txt
   └── next_public_api_base_url.txt
   ```

   Example `docker-compose.prod.yml` secret configuration:

   ```yaml
   secrets:
     app_port:
       file: ./secrets/app_port.txt
     api_url:
       file: ./secrets/api_url.txt
     next_public_api_base_url:
       file: ./secrets/next_public_api_base_url.txt
   ```

3. **Build the production image**

   ```bash
   docker compose -f docker-compose.prod.yml build
   ```

4. **Deploy the stack**

   ```bash
   docker stack deploy -c docker-compose.prod.yml prod
   ```

5. **Access the application**

   To find the IP address of your Docker Swarm node, run:

   ```bash
   docker node inspect self --format '{{ .Status.Addr }}'
   ```

   Then open your browser and navigate to:

   ```
   http://<ip_address>:<port_number>
   ```

## API Endpoints

The application interacts with the FastAPI server for pitch processing. Below are the key endpoints:

- **`POST /process`**: Processes a YouTube video URL and applies the pitch shift. Returns the processed video info or a message if the video has already been processed.

  - **Request Body**:
    ```json
    {
      "url": "https://www.youtube.com/watch?v=example",
      "pitch_shift": 2.0
    }
    ```
  - **Response**:
    ```json
    {
      "videoId": "example",
      "title": "Sample Video",
      "message": "YouTube URL processed successfully"
    }
    ```

- **`POST /save`**: Saves the video and audio from a YouTube URL.

  - **Request Body**:
    ```json
    {
      "url": "https://www.youtube.com/watch?v=example"
    }
    ```
  - **Response**:
    ```json
    {
      "videoId": "example",
      "title": "Sample Video",
      "message": "Video and audio saved successfully"
    }
    ```

- **`GET /video/{video_id}`**: Streams the original video by its ID.

  - **Response**: Returns the video file in [video/mp4](http://_vscodecontentref_/0) format.

- **`GET /audio/{audio_id}`**: Streams the original audio by its ID.

  - **Response**: Returns the audio file in [audio/mpeg](http://_vscodecontentref_/1) format.

- **`GET /video/{video_id}_{pitch_shift}`**: Streams the video with the applied pitch shift.

  - **Response**: Returns the processed video file in [video/mp4](http://_vscodecontentref_/2) format.

- **`GET /health`**: Returns the health status of the server.

  - **Response**:
    ```json
    {
      "status": "OK"
    }
    ```

## Contributing

For details on how to contribute, please refer to the [CONTRIBUTING.md](CONTRIBUTING.md) file.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

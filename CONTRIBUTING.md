# Contributing to YouTube Pitch Transposer

Thank you for considering contributing to YouTube Pitch Transposer! We welcome contributions from the community to help improve this project.

## How to Contribute

### 1. Fork the Repository

Start by forking the repository to your GitHub account.

### 2. Clone the Repository

Clone your forked repository to your local machine:

```bash
git clone https://github.com/she11fish/youtube-pitch-transposer.git
```

### 3. Create a New Branch

Create a new branch for your feature or bug fix:

```bash
git checkout -b feature-name
```

### 4. Make Changes

Make your changes to the codebase. Ensure your code follows the project's coding standards and is well-documented.

### 5. Test Your Changes

Test your changes thoroughly to ensure they work as expected and do not break existing functionality.

### 6. Commit Your Changes

Commit your changes with a clear and descriptive commit message:

```bash
git commit -m "Add feature-name"
```

### 7. Push Your Changes

Push your changes to your forked repository:

```bash
git push origin feature-name
```

### 8. Submit a Pull Request

Go to the original repository on GitHub and submit a pull request. Provide a clear description of your changes and why they should be merged.

## Development Environment Setup

### Prerequisites

Ensure you have the following installed:

- Node.js (v18 or higher)
- Python (v3.10 or higher)
- Docker and Docker Compose
- pnpm (for managing frontend dependencies)

### Setting Up the Frontend

1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Run the development server:
   ```bash
   pnpm run dev
   ```

### Setting Up the Backend

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements/dev.txt
   ```
4. Run the FastAPI server:
   ```bash
   uvicorn app.main:app --reload
   ```

### Using Docker for Development

1. Start the development environment:
   ```bash
   docker compose -f docker-compose.dev.yml up
   ```
2. Stop the environment:
   ```bash
   docker compose -f docker-compose.dev.yml down
   ```

## Code of Conduct

Please adhere to the [Code of Conduct](CODE_OF_CONDUCT.md) when contributing to this project.

## Reporting Issues

If you encounter any issues or have suggestions for improvements, please open an issue in the repository.

## Need Help?

If you have any questions or need assistance, feel free to open an issue or reach out to the maintainers.

Thank you for contributing!

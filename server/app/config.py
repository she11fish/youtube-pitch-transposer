from dataclasses import dataclass
import os


@dataclass
class Config:
    """Base configuration class."""

    API_PORT = "api_port"
    API_URL = "api_url"
    APP_URL = "app_url"


class DevelopmentConfig(Config):
    """Development-specific configuration."""

    @property
    def API_PORT(self):
        """Returns the application port."""
        return DevelopmentConfig._read_secret(Config.API_PORT)

    @property
    def API_URL(self):
        """Returns the api url."""
        return DevelopmentConfig._read_secret(Config.API_URL)

    @property
    def APP_URL(self):
        """Returns the application url."""
        return DevelopmentConfig._read_secret(Config.APP_URL)

    @staticmethod
    def _read_secret(secret_name, default=None):
        """Directly fetch from environment variables in development."""
        return os.getenv(secret_name.upper(), default)


class ProductionConfig(Config):
    """Production-specific configuration."""

    @property
    def API_PORT(self):
        """Returns the application port."""
        return ProductionConfig._read_secret(Config.API_PORT)

    @property
    def API_URL(self):
        """Returns the api url."""
        return ProductionConfig._read_secret(Config.API_URL)

    @property
    def APP_URL(self):
        """Returns the application url."""
        return ProductionConfig._read_secret(Config.APP_URL)

    @staticmethod
    def _read_secret(secret_name, default=None):
        """
        Reads a secret from the Docker secrets directory.
        If not found, throws an Exception.
        """
        secret_path = f"/run/secrets/{secret_name}"
        try:
            if not os.path.exists(secret_path):
                raise FileNotFoundError(f"Secret file {secret_path} does not exist.")
            with open(secret_path, "r") as secret_file:
                return secret_file.read().strip()
        except Exception as e:
            raise RuntimeError(f"Error reading secret {secret_name}: {e}")


def get_config():
    """Returns the appropriate configuration class based on the environment."""
    env = os.getenv("ENV", "development").lower()
    if env == "production":
        # return ProductionConfig()
        return DevelopmentConfig()
    return DevelopmentConfig()

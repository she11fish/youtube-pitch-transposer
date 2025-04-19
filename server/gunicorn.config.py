import multiprocessing
import os
from app.config import get_config

bind = f"0.0.0.0:{get_config().APP_PORT}"

workers = multiprocessing.cpu_count()

worker_class = "uvicorn.workers.UvicornWorker"

max_requests = 1000

max_requests_jitter = 50

accesslog = "-"
errorlog = "-"
loglevel = "info"

timeout = 240

preload_app = True

keepalive = 120

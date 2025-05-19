import logging
from logging.config import dictConfig
import os

set_level = 'INFO'

# if os.getenv('ENV') == 'production':
#     set_level = 'INFO'
# else:
#     set_level = 'DEBUG'

logging_config = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'default': {
            'format': '%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            'datefmt': '%Y-%m-%d %H:%M:%S',
        }
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'default',
            'level': "DEBUG",
        },
        'file': {
            'class': 'logging.FileHandler',
            'filename': 'app.log',
            'formatter': 'default',
            'level': set_level,
        },
    },
    'loggers': {
        'fastapi': {
            'handlers': ['console','file'],
            'level': "INFO",
            'propagate': True,
        },
    },
}

dictConfig(logging_config)
logger = logging.getLogger('fastapi')
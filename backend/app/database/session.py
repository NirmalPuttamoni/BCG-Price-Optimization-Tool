from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from app.config import DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME

DB_USERNAME = DB_USERNAME
DB_PASSWORD = DB_PASSWORD
DB_HOST =  DB_HOST
DB_PORT = DB_PORT
DB_NAME = DB_NAME

DATABASE_URL = f"mysql+asyncmy://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_async_engine(DATABASE_URL, echo=True)
async_session = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)
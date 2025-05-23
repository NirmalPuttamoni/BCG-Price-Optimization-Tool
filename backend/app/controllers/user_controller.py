from fastapi import APIRouter, Depends, HTTPException, Body, status
from typing import Annotated
from app.controllers.schema import UserLoginSchema, UserRegisterSchema
from app.database.models import User
from app.database.session import async_session
from sqlalchemy.future import select
from passlib.context import CryptContext
from app.auth import create_access_token
from app.logging_config import logger

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
user_router = APIRouter(prefix="/user")

@user_router.post("/login")
async def login_user(data : UserLoginSchema):
    try:
        async with async_session() as session:
            # Check if the user exists
            user = await session.execute(
                select(User).filter(User.email == data.email)
            )
            user = user.scalars().first()
            if not user:
                return {"message": "User not found", "success": False}

            # Check if the password is correct
            if not pwd_context.verify(data.password, user.password):
                return {"message": "Incorrect password", "success": False}

            # Create JWT token 
            access_token = create_access_token(data={"username": user.username, "role": user.role})
            # Return the token and user information
            return {
                "token": access_token,
                "token_type": "bearer",
                "message": f"User {user.username} logged in successfully",
                "success": True,
                "user": user.username,
                "role": user.role
            }

    except Exception as e:
        logger.error("Error in login_user: %s", e)
        raise HTTPException(status_code=500, detail="Internal Server Error")


@user_router.post("/register")
async def register_user(data : UserRegisterSchema):
    try:
        async with async_session() as session:
            # Check if the user already exists
            existing_user = await session.execute(
                select(User).filter(User.username == data.username)
            )
            if existing_user.scalars().first():
                return {"message": f"User {data.username} already exists", "success": True}

            # Hash the password
            hashed_password = pwd_context.hash(data.password)

            # Create a new user
            new_user = User(
                username=data.username,
                email=data.email,
                role=data.role,
                password=hashed_password,
            )
            session.add(new_user)
            await session.commit()
            return {"message": f"User {data.username} registered successfully", "success": True}
    except Exception as e:
        logger.info("Error in register_user: %s", e)
        raise HTTPException(status_code=500, detail="Internal Server Error")


from fastapi import APIRouter
from app.controllers.user_controller import user_router
from app.controllers.product_controller import product_router

router = APIRouter(prefix="/api")

router.include_router(user_router)
router.include_router(product_router)
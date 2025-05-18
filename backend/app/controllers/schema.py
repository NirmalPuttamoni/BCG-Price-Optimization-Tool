from pydantic import BaseModel
from typing import Optional

class UserLoginSchema(BaseModel):
    email: str
    password: str

class UserRegisterSchema(BaseModel):
    username: str
    email: str
    role: str
    password: str
    confirm_password: str

class ProductSchema(BaseModel):
    name: str
    description: str
    cost_price: float
    selling_price: float
    category: str
    stock_available: int
    units_sold: int
    customer_rating: Optional[float] = None
    demand_forecast: Optional[float] = None
    optimized_price: Optional[float] = None
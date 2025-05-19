from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    role = Column(String(100), nullable=False)
    password = Column(String(128), nullable=False)

class Product(Base):
    __tablename__ = 'products'
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False, index=True)
    description = Column(String(255), nullable=True)
    cost_price = Column(Integer, nullable=False)
    selling_price = Column(Integer, nullable=False)
    category = Column(String(50), nullable=False)
    stock_available = Column(Integer, nullable=False)
    units_sold = Column(Integer, nullable=False)
    customer_rating = Column(Integer, nullable=True)
    demand_forecast = Column(Integer, nullable=True, index=True)
    optimized_price = Column(Integer, nullable=True)


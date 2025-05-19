from fastapi import APIRouter, Depends, HTTPException, Body
from typing import Annotated
from app.controllers.schema import ProductSchema
from app.database.models import Product
from app.database.session import async_session
from sqlalchemy.future import select
from app.auth import verify_token
from app.logging_config import logger

product_router = APIRouter(prefix="/product")

@product_router.post("/add-product")
async def add_product(data: ProductSchema, user_data: Annotated[dict, Depends(verify_token)]):
    try:
        async with async_session() as session:
            # Check if the product already exists
            existing_product = await session.execute(
                select(Product).filter(Product.name == data.name)
            )
            if existing_product.scalars().first():
                return {"message": f"Product {data.name} already exists", "success": False}

            # Create a new product
            new_product = Product(
                name=data.name,
                description=data.description,
                cost_price=data.cost_price,
                selling_price=data.selling_price,
                category=data.category,
                stock_available=data.stock_available,
                units_sold=data.units_sold,
                customer_rating=data.customer_rating,
                demand_forecast=data.demand_forecast,
                optimized_price=data.optimized_price
            )
            session.add(new_product)
            await session.commit()
            return {"message": f"Product {data.name} added successfully", "success": True}
    except Exception as e:
        logger.error("Error in add_product: %s", e)
        raise HTTPException(status_code=500, detail="Internal Server Error")
    
@product_router.get("/get-products")
async def get_products(user_data: Annotated[dict, Depends(verify_token)]):
    try:
        async with async_session() as session:
            products = await session.execute(select(Product))
            products = products.scalars().all()
            return {"products": products, "success": True}
    except Exception as e:
        logger.error("Error in get_products: %s", e)
        raise HTTPException(status_code=500, detail="Internal Server Error")
    

@product_router.put("/update-product/{product_id}")
async def update_product(product_id: int, data: ProductSchema, user_data: Annotated[dict, Depends(verify_token)]):
    try:
        async with async_session() as session:
            # Check if the product exists
            product = await session.execute(
                select(Product).filter(Product.id == product_id)
            )
            product = product.scalars().first()
            if not product:
                return {"message": f"Product with ID {product_id} not found", "success": False}

            # Update the product details
            product.name = data.name
            product.description = data.description
            product.cost_price = data.cost_price
            product.selling_price = data.selling_price
            product.category = data.category
            product.stock_available = data.stock_available
            product.units_sold = data.units_sold
            product.customer_rating = data.customer_rating
            product.demand_forecast = data.demand_forecast
            product.optimized_price = data.optimized_price

            await session.commit()
            return {"message": f"Product {data.name} updated successfully", "success": True}
    except Exception as e:
        logger.error("Error in update_product: %s", e)
        raise HTTPException(status_code=500, detail="Internal Server Error")
    
@product_router.delete("/delete-product/{product_id}")
async def delete_product(product_id: int, user_data: Annotated[dict, Depends(verify_token)]):
    try:
        async with async_session() as session:
            # Check if the product exists
            product = await session.execute(
                select(Product).filter(Product.id == product_id)
            )
            product = product.scalars().first()
            if not product:
                return {"message": f"Product with ID {product_id} not found", "success": False}

            # Delete the product
            await session.delete(product)
            await session.commit()
            return {"message": f"Product with ID {product_id} deleted successfully", "success": True}
    except Exception as e:
        logger.error("Error in delete_product: %s", e)
        raise HTTPException(status_code=500, detail="Internal Server Error")
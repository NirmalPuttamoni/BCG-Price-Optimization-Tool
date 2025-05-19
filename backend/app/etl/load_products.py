import asyncio
import pandas as pd
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.session import async_session
from app.database.models import Product

async def load_products_from_csv(file_path: str):
    df = pd.read_csv(file_path)

    async with async_session() as session:
        for _, row in df.iterrows():
            product = Product(
                id=row["product_id"],
                name=row["name"],
                description=row["description"],
                cost_price=row["cost_price"],
                selling_price=row["selling_price"],
                category=row["category"],
                stock_available=row["stock_available"],
                units_sold=row["units_sold"],
                customer_rating=row.get("customer_rating"),
                demand_forecast=row.get("demand_forecast"),
                optimized_price=row.get("optimized_price")
            )
            session.add(product)
        await session.commit()

if __name__ == "__main__":
    asyncio.run(load_products_from_csv("assets/product_data.csv"))

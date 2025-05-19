import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    allProducts: [],
    filteredProducts: [],
};

const ProductSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts(state, action) {
            state.allProducts = action.payload;
            state.filteredProducts = action.payload;
        },
        setFilteredProducts(state, { payload }) {
            state.filteredProducts = state.allProducts.filter((item) => item.name.toLowerCase().includes(payload.toLowerCase()))
        },
        setFilteredProductsByCategory(state, { payload }) {
            if (payload === "All Categories") {
                state.filteredProducts = state.allProducts;
            } else {
                state.filteredProducts = state.allProducts.filter((item) => item.category === payload);
            }
        }
    },
});

export const { setProducts, setFilteredProducts, setFilteredProductsByCategory } = ProductSlice.actions;


export default ProductSlice.reducer;

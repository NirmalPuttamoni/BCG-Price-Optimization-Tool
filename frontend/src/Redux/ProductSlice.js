import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    allProducts: [],
    searchName: '',
    selectedCategory: '',
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
        setSearchName(state, action) {
            state.searchName = action.payload;
        },
        setSelectedCategory(state, action) {
            state.selectedCategory = action.payload;
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

export const { setProducts, setSearchName, setSelectedCategory, setFilteredProducts, setFilteredProductsByCategory } = ProductSlice.actions;


export default ProductSlice.reducer;

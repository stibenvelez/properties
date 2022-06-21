import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    properties: [],
    filters: {
        propertyType: "",
        city: "",
        rangePrices: [0, 0],
        offer: "",
    },
    error: false,
    loading: false,
    loadingUploadCsv: false,
    loadingUploadImages: false,
    response: null,
};

export const propertiesSlice = createSlice({
    name: "properties",
    initialState,
    reducers: {
        setProperties: (state) => {
            state.loading = true;
        },
        setPropertiesSucces: (state, action) => {
            state.properties = action.payload;
            state.loading = false;
        },
        setPropertiesError: (state) => {
            state.loading = false;
        },
        setFilters: (state, action) => {
            state.filters = action.payload;
        },
        setclearFilter: (state) => {
            state.filters = initialState.filters;
        },
        setUploadPropertiescsv: (state) => {
            state.loading = true;
            state.error = false;
            state.loadingUploadCsv = true;
            state.response = null;
        },
        setUploadPropertiescsvSucces: (state, action) => {
            state.loadingUploadCsv = false;
            state.error = false;
        },
        setUploadPropertiescsvError: (state, action) => {
            state.loadingUploadCsv = false;
            state.response = action.payload;
            state.error = true;
            state.loading = false;
        },
        setUploadImages: (state, action) => {
            state.loadingUploadImages = true;
        },
        setUploadImagesSucces: (state, action) => {
            state.loadingUploadImages = false;
        },
        setUploadImagesError: (state, action) => {
            state.loadingUploadImages = false;
        },
        setCreateProperty: (state, action) => {
            state.loading = true;
        },
        setCreatePropertySuccess: (state, action) => {
            state.loading = false;
        },
        setCreatePropertyError: (state, action) => {
            state.loading = false;
        },
    },
});

export const {
    setProperties,
    setPropertiesSucces,
    setPropertiesError,
    setFilters,
    setclearFilter,
    setUploadPropertiescsv,
    setUploadPropertiescsvSucces,
    setUploadPropertiescsvError,
    setUploadImages,
    setUploadImagesSucces,
    setUploadImagesError,
    setCreateProperty,
    setCreatePropertySuccess,
    setCreatePropertyError
} = propertiesSlice.actions;

export default propertiesSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    properties: {
        results: []
    },
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
    property:{}
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
        setPropertyByUser: (state, action) => {
            state.loading = true;
            state.properties = action.payload;
        },
        setPropertyByUserSucces: (state, action) => {
            state.loading = false;
            state.property = action.payload;
        },
        setPropertyByUserError: (state, action) => {
            state.loading = false;
            state.properties = action.payload;
        },
        setUpdateProperty: (state, action) => {
            state.loading = true;
        },
        setUpdatePropertySuccess: (state, action) => {
            state.loading = false;
        },
        setUpdatePropertyError: (state, action) => {
            state.loading = false;
        },
        setDeleteProperty: (state, action) => {
            state.loading = true;
        },
        setDeletePropertySuccess: (state, action) => {
            state.loading = false;
        },
        setDeletePropertyError: (state, action) => {
            state.loading = false;
        }
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
    setCreatePropertyError,
    setPropertyByUser,
    setPropertyByUserSucces,
    setPropertyByUserError,
    setUpdateProperty,
    setUpdatePropertySuccess,
    setUpdatePropertyError,
    setDeleteProperty,
    setDeletePropertySuccess,
    setDeletePropertyError,
} = propertiesSlice.actions;

export default propertiesSlice.reducer;

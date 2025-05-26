import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../config/axios';


const handleApiErrors = (err, rejectWithValue) => {
    if (err.response?.data?.error) {
        return rejectWithValue({ serverErrors: [err.response.data.error] });
    } else if (err.response?.data?.errors) {
        const array = err.response.data.errors.map(ele => ele.msg);
        return rejectWithValue({ serverErrors: array });
    } else {
        return rejectWithValue({ serverErrors: ['Unknown error occurred'] });
    }
};

export const reloadSingledate = createAsyncThunk(
    "movies/reloadSingledate",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/singledate');
            return response.data;
        } catch (err) {
            return handleApiErrors(err, rejectWithValue);
        }
    }
);

export const reloadMovies = createAsyncThunk(
    "movies/reloadMovies",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/movies');
            return response.data;
        } catch (err) {
            return handleApiErrors(err, rejectWithValue);
        }
    }
);

export const reloadCastcrews = createAsyncThunk(
    "movies/reloadCastcrews",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/castcrew');
            return response.data;
        } catch (err) {
            return handleApiErrors(err, rejectWithValue);
        }
    }
);

export const reloadTimeplaces = createAsyncThunk(
    "movies/reloadTimeplaces",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/timeplace');
            return response.data;
        } catch (err) {
            return handleApiErrors(err, rejectWithValue);
        }
    }
);

export const reloadBookinghistory = createAsyncThunk(
    "movies/reloadBookinghistory",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/bookinghistory');
            return response.data;
        } catch (err) {
            return handleApiErrors(err, rejectWithValue);
        }
    }
);

export const reloadRatings = createAsyncThunk(
    "movies/reloadRatings",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/rating');
            return response.data;
        } catch (err) {
            return handleApiErrors(err, rejectWithValue);
        }
    }
);


const initialState = {
    allmovies: null,
    allcastcrews: null,
    alltimeplaces: null,
    allbookinghistories: null,
    allratings: null,
    allsingledate: null,
    error: null,
    status: "idle",
    editId: null
};

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        handleEditId: (state, action) => {
            state.editId = action.payload;
        },
        handleServerErrors: (state, action) => {
            state.error = action.payload;
        },
        moviesAfterEdit: (state, action) => {
            state.allmovies = action.payload;
        },
        castcrewAfterRemove: (state, action) => {
            state.allcastcrews = action.payload;
        },
        timeplaceAfterRemove: (state, action) => {
            state.alltimeplaces = action.payload;
        },
        ratingAfterRemove: (state, action) => {
            state.allratings = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(reloadMovies.pending, (state) => {
                state.status = "loading";
            })
            .addCase(reloadMovies.fulfilled, (state, action) => {
                state.allmovies = action.payload;
                state.status = "idle";
            })
            .addCase(reloadMovies.rejected, (state, action) => {
                state.error = action.payload?.serverErrors;
                state.status = "idle";
            })
            .addCase(reloadSingledate.fulfilled, (state, action) => {
                state.allsingledate = action.payload;
            })
            .addCase(reloadCastcrews.fulfilled, (state, action) => {
                state.allcastcrews = action.payload;
            })
            .addCase(reloadCastcrews.rejected, (state, action) => {
                state.error = action.payload?.serverErrors;
            })
            .addCase(reloadTimeplaces.fulfilled, (state, action) => {
                state.alltimeplaces = action.payload;
            })
            .addCase(reloadBookinghistory.fulfilled, (state, action) => {
                state.allbookinghistories = action.payload;
            })
            .addCase(reloadRatings.fulfilled, (state, action) => {
                state.allratings = action.payload;
            });
    }
});

export const {
    handleEditId,
    handleServerErrors,
    moviesAfterEdit,
    castcrewAfterRemove,
    timeplaceAfterRemove,
    ratingAfterRemove
} = movieSlice.actions;

export default movieSlice.reducer;

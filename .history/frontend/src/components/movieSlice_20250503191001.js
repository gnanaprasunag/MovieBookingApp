import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../config/axios';

// ------------------------------
// 🟢 Async Thunks
// ------------------------------

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
            console.log("reloadSingledate response:", response.data);
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
            console.log("reloadMovies response:", response.data);
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
            console.log("reloadCastcrews response:", response.data);
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
            console.log("reloadTimeplaces response:", response.data);
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
            console.log("reloadBookinghistory response:", response.data);
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
            console.log("reloadRatings response:", response.data);
            return response.data;
        } catch (err) {
            return handleApiErrors(err, rejectWithValue);
        }
    }
);

// ------------------------------
// 🟢 Slice
// ------------------------------

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
            console.log("Setting editId:", action.payload);
            state.editId = action.payload;
        },
        handleServerErrors: (state, action) => {
            state.error = action.payload;
        },
        moviesAfterEdit: (state, action) => {
            console.log("Updating movies after edit:", action.payload);
            state.allmovies = action.payload;
        },
        castcrewAfterRemove: (state, action) => {
            console.log("Updating castcrews after remove:", action.payload);
            state.allcastcrews = action.payload;
        },
        timeplaceAfterRemove: (state, action) => {
            console.log("Updating timeplaces after remove:", action.payload);
            state.alltimeplaces = action.payload;
        },
        ratingAfterRemove: (state, action) => {
            console.log("Updating ratings after remove:", action.payload);
            state.allratings = action.payload;
        }
    },
    extraReducers: (builder) => {
        // Reload Movies
        builder.addCase(reloadMovies.pending, (state) => {
            console.log("reloadMovies pending...");
            state.status = "loading";
        });
        builder.addCase(reloadMovies.fulfilled, (state, action) => {
            console.log("reloadMovies fulfilled:", action.payload);
            state.allmovies = action.payload;
            state.status = "idle";
        });
        builder.addCase(reloadMovies.rejected, (state, action) => {
            console.log("reloadMovies rejected:", action.payload);
            state.error = action.payload?.serverErrors;
            state.status = "idle";
        });

        // Reload Single Date
        builder.addCase(reloadSingledate.fulfilled, (state, action) => {
            console.log("reloadSingledate fulfilled:", action.payload);
            state.allsingledate = action.payload;
        });

        // Reload Castcrews
        builder.addCase(reloadCastcrews.fulfilled, (state, action) => {
            console.log("reloadCastcrews fulfilled:", action.payload);
            state.allcastcrews = action.payload;
        });
        builder.addCase(reloadCastcrews.rejected, (state, action) => {
            state.error = action.payload?.serverErrors;
        });

        // Reload Timeplaces
        builder.addCase(reloadTimeplaces.fulfilled, (state, action) => {
            console.log("reloadTimeplaces fulfilled:", action.payload);
            state.alltimeplaces = action.payload;
        });

        // Reload Booking History
        builder.addCase(reloadBookinghistory.fulfilled, (state, action) => {
            console.log("reloadBookinghistory fulfilled:", action.payload);
            state.allbookinghistories = action.payload;
        });

        // Reload Ratings
        builder.addCase(reloadRatings.fulfilled, (state, action) => {
            console.log("reloadRatings fulfilled:", action.payload);
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

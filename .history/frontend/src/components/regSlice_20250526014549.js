import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from '../config/axios';


const handleApiErrors = (err, rejectWithValue, defaultMsg = 'An error occurred') => {
    if (err.response?.data?.error) {
        return rejectWithValue({ serverErrors: [err.response.data.error] });
    } else if (err.response?.data?.errors) {
        const array = err.response.data.errors.map((ele) => ele.msg);
        return rejectWithValue({ serverErrors: array });
    } else {
        return rejectWithValue({ serverErrors: [defaultMsg] });
    }
};

export const handleEditProfile = createAsyncThunk(
    "users/handleEditProfile",
    async ({ editId, formData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `/api/users/change-profile/${editId}`,
                formData,
                { headers: { 'Authorization': localStorage.getItem('token') } }
            );
            return response.data;
        } catch (err) {
            return handleApiErrors(err, rejectWithValue, 'Failed to edit profile');
        }
    }
);

export const handleRegister = createAsyncThunk(
    "users/handleRegister",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/users/register', formData);
            toast('Successfully Registered', { autoClose: 1000 });
            return response.data;
        } catch (err) {
            return handleApiErrors(err, rejectWithValue, 'Registration failed');
        }
    }
);

export const handleReload = createAsyncThunk(
    "users/handleReload",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/users/account', {
                headers: { 'Authorization': localStorage.getItem('token') }
            });
            return response.data;
        } catch (err) {
            return handleApiErrors(err, rejectWithValue, 'Failed to reload user data');
        }
    }
);

export const handlemailcheck = createAsyncThunk(
    "users/handleEmailcheck",
    async ({ email }, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/users/mailcheck', { email });
            return response.data;
        } catch (err) {
            return rejectWithValue({
                serverErrors: ['Email ID is not present']
            });
        }
    }
);

export const handleLogin = createAsyncThunk(
    "users/handleLogin",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/users/login', formData, {
                headers: { 'Authorization': localStorage.getItem('token') }
            });
            localStorage.setItem('token', response.data.token);
            toast('Successfully logged in');
            return response.data;
        } catch (err) {
            return handleApiErrors(err, rejectWithValue, 'Login failed');
        }
    }
);

// ------------------------------
// 🟢 Slice
// ------------------------------

const initialState = {
    user: null,
    isLoggedin: false,
    error: null,
    status: "idle",
    editId: null
};

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        handleEditId: (state, action) => {
            state.editId = action.payload;
        },
        handleLogout: (state) => {
            localStorage.removeItem('token');
            state.user = null;
            state.isLoggedin = false;
            state.error = null;
            state.editId = null;
            state.status = "idle";
            toast("Successfully logged out");
        },
        handleServerErrors: (state, action) => {
            state.error = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // Register
            .addCase(handleRegister.pending, (state) => {
                state.status = "loading";
            })
            .addCase(handleRegister.fulfilled, (state, action) => {
                state.status = "success";
                state.user = action.payload;
                state.error = null;
            })
            .addCase(handleRegister.rejected, (state, action) => {
                state.error = action.payload.serverErrors;
            })

            // Login
            .addCase(handleLogin.pending, (state) => {
                state.status = "loading";
            })
            .addCase(handleLogin.fulfilled, (state, action) => {
                state.isLoggedin = true;
                state.user = action.payload.user;
                state.error = null;
            })
            .addCase(handleLogin.rejected, (state, action) => {
                state.error = action.payload.serverErrors;
            })

            // Reload
            .addCase(handleReload.fulfilled, (state, action) => {
                state.isLoggedin = true;
                state.user = action.payload;
                state.error = null;
            })

            // Edit Profile
            .addCase(handleEditProfile.fulfilled, (state, action) => {
                state.editId = null;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(handleEditProfile.rejected, (state, action) => {
                state.error = action.payload.serverErrors;
            });
    }
});

export const { handleLogout, handleServerErrors, handleEditId } = userSlice.actions;
export default userSlice.reducer;

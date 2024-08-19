import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Action pour se connecter et récupérer le token
export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (userCredentials, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:3001/api/v1/user/login', userCredentials);
            console.log('API Response:', response.data);

            if (!response.data || !response.data.body || !response.data.body.token) {
                throw new Error('Invalid response from the server');
            }

            const token = response.data.body.token;
            localStorage.setItem('token', token);

            return { token };
        } catch (error) {
            if (error.response && error.response.status === 400) {
                return rejectWithValue('Invalid fields');
            } else if (error.response && error.response.status === 500) {
                return rejectWithValue('Internal server error');
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

// Action pour récupérer le profil utilisateur après la connexion
export const fetchUserProfile = createAsyncThunk(
    'user/fetchUserProfile',
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const token = state.user.token;

            const response = await axios.post('http://localhost:3001/api/v1/user/profile', {}, { // Utilisez POST au lieu de GET
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.data || !response.data.body) {
                throw new Error('Invalid response from the server');
            }

            return response.data.body;
        } catch (error) {
            if (error.response && error.response.status === 400) {
                return rejectWithValue('Invalid fields');
            } else if (error.response && error.response.status === 500) {
                return rejectWithValue('Internal server error');
            } else if (error.response && error.response.status === 404) {
                return rejectWithValue('Profile endpoint not found');
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        user: null,
        token: null,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.token = null;
                state.error = action.payload || action.error.message;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = action.payload || action.error.message;
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;

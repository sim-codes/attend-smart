import { studentService } from '@/services/student';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StudentProfile, ProfileState } from '@/constants/types';
import { AppDispatch } from '@/store/store';


const initialState: ProfileState = {
    data: null,
    isLoading: false,
    error: null,
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        fetchProfileStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchProfileSuccess: (state, action: PayloadAction<StudentProfile>) => {
            state.isLoading = false;
            state.data = action.payload;
        },
        fetchProfileFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        updateProfile: (state, action: PayloadAction<Partial<StudentProfile>>) => {
            if (state.data) {
                state.data = { ...state.data, ...action.payload };
            }
        },
        clearProfile: (state) => {
            state.data = null;
            state.error = null;
        },
    },
});

export const {
    fetchProfileStart,
    fetchProfileSuccess,
    fetchProfileFailure,
    updateProfile,
    clearProfile,
} = profileSlice.actions;

// Modified fetchProfile to accept userId parameter
export const fetchProfile = (userId: string) => async (dispatch: AppDispatch) => {

    const response = await studentService.getStudentProfile(userId);

    if (response.success) {
        dispatch(fetchProfileSuccess(response.data!));
    } else {
        dispatch(fetchProfileFailure(response.error?.message!));
    }
};

export default profileSlice.reducer;

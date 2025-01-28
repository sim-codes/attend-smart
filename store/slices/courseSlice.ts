import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EnrollmentResponse, CoursesState } from '@/constants/types';
import { AppDispatch } from '@/store/store';
import { enrollmentService } from '@/services/enrollment';

const initialState: CoursesState = {
    data: [],
    isLoading: false,
    error: null,
};

const coursesSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        fetchCoursesStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchCoursesSuccess: (state, action: PayloadAction<EnrollmentResponse[]>) => {
            state.isLoading = false;
            state.data = action.payload;
        },
        fetchCoursesFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        clearCourses: (state) => {
            state.data = [];
            state.error = null;
        },
    },
});

export const {
    fetchCoursesStart,
    fetchCoursesSuccess,
    fetchCoursesFailure,
    clearCourses,
} = coursesSlice.actions;


export const fetchEnrolledCourses = (userId: string) => async (dispatch: AppDispatch) => {
    const { data, success, error } = await enrollmentService.getEnrolledCourses(userId);

    if (success) {
        dispatch(fetchCoursesSuccess(data!));
    } else {
        dispatch(fetchCoursesFailure(error?.message!));
    }
};

export default coursesSlice.reducer;

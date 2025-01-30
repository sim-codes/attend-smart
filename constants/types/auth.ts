export interface TokenDto {
    accessToken: string;
    refreshToken: string;
}

export interface UserProfile {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    phoneNumber: string;
    profileImageUrl: string;
    roles: string[];
}

export interface AuthState {
    user: UserProfile | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

export interface LoginResponse {
    token: TokenDto;
    user: UserProfile;
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface SignUpCredentials {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    phoneNumber: string;
    profileImageUrl: string;
    roles: string[];
}

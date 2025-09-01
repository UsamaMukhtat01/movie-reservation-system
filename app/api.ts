const API_BASE_URL = "http://localhost:5000";

// ---------- Types ----------
export interface SignupData {
  name: string;
  email: string;
  password: string;
}

export interface SigninData {
  email: string;
  password: string;
}

export interface MoviePayload {
  title: string;
  description?: string;
  releaseDate?: string;
  genre?: string[];
  // add fields that exist in your Movie model
}

// ---------- APIs ----------
export const signupApi = async (formData: SignupData) => {
  try {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    return await response.json();
  } catch (error: unknown) {
    console.error("Network error:", error);
    throw error;
  }
};

export const signinApi = async (formData: SigninData) => {
  try {
    const response = await fetch(`/api/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    return await response.json();
  } catch (error: unknown) {
    console.error(error);
    throw error;
  }
};

export const getMovieDetail = async (movieId: string) => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await fetch(`/api/movie/getMovieDetail/${movieId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error: unknown) {
    console.error(error);
    throw error;
  }
};

export const getMovies = async () => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await fetch(`/api/movie/getMovies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error: unknown) {
    console.error(error);
    throw error;
  }
};

export const createMovie = async (requestBody: MoviePayload) => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await fetch(`/api/movie/createMovie/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });
    return await response.json();
  } catch (error: unknown) {
    console.error(error);
    throw error;
  }
};

export const deleteMovie = async (movieId: string) => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await fetch(`/api/user/deleteMovie/${movieId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error: unknown) {
    console.error(error);
    throw error;
  }
};

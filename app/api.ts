const API_BASE_URL = "http://localhost:5000";

export const signupApi = async (formData : any) =>{
  const userData = {
    name: formData.name,
    email: formData.email,
    password: formData.password,
  };
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    // **********************Below code is commented because there is issue to check password and confirm passwords

    // if (
    //   formData.password !== confirmPassword ||
    //   !formData.password ||
    //   !confirmPassword
    // ) {
    //   setError("Passwords do not match!");
    //   setInterval(() => {
    //     setError(null);
    //   }, 3000);
    //   return;
    // }
    // console.log(response);

    return await response.json();
    
  } catch (error) {
    console.error("Network error:", error);
  }
}

export const signinApi = async (formData : any)=>{
        
    const userData = {
        email: formData.email,
        password: formData.password,
      }
  
      try{
        const response = await fetch(`${API_BASE_URL}/api/auth/signin`,{
          method: "POST",
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(formData), // We can send the data directly from formData or by creating other function. Like below
          // body: JSON.stringify(userData)
        })
        return await response.json()
      }catch(error){
        console.error(error)
      }
}

export const getMovieDetail = async (movieId :any)=>{
  try{
    const token = localStorage.getItem('access_token')
    // console.log(token)
    const response = await fetch(`${API_BASE_URL}/api/user/getMovieDetail/${movieId}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    })
    return await response.json()
  }catch(error){
    console.log(error)
  }
}
export const getMovies = async ()=>{
  try{
    const token = localStorage.getItem('access_token')
    // console.log(token)
    const response = await fetch(`${API_BASE_URL}/api/user/getMovies`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    })
    return await response.json()
  }catch(error){
    console.log(error)
  }
}

export const createMovie = async (requestBody : any)=>{
  try{
    const token = localStorage.getItem('access_token')
    // console.log(token)
    const response = await fetch(`${API_BASE_URL}/api/user/createMovie/`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(requestBody)
    })
    return await response.json()
  }catch(error){
    console.log(error)
  }
}

export const deletMovie = async (movieId : string) =>{
  try{
    const token = localStorage.getItem('access_token')
    // console.log(token)
    const response = await fetch(`${API_BASE_URL}/api/user/deleteMovie/${movieId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    })
    return await response.json()
  }catch(error){
    console.log(error)
  }
}
const BASE_URL ='http://localhost:3000/api/auth';

export const signupUser = async(formdata)=>{
    const res = await fetch(`${BASE_URL}/signup`,{
        method: "POST",
        headers:{'Content-Type':"application/json" },
        body: JSON.stringify(formdata)
    });
    return res.json();
};

export const loginUser = async(formdata)=>{
    const res = await fetch(`${BASE_URL}/login`,{
        method :"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(formdata)
    });
    return res.json();
}
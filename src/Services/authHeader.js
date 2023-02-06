export default function authHeader(){
   const user=JSON.parse(localStorage.getItem("user"));
    if(user&&user.token){
        return{"x-access-token":user.token,"id_user":user.id_user,"email":user.email};
    }else{
        return{};
    }
}
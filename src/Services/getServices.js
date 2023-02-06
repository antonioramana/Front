import authHeader from "./authHeader";
import axios from "axios";

const API_URL="http://localhost:5000";

//get public post 
const getFiveCar=()=>{
    return axios.get(API_URL+"/car/getfive");
}

//get all car with private post
const getAllCar=()=>{
    return axios.get(API_URL+"/car/all",{headers:authHeader()});
}
//get one car 
const getOneCar=(immatriculation)=>{
    return axios.get(API_URL+"/car/one/"+immatriculation,{headers:authHeader()});
}

//get user's car
const getUserCar=()=>{
    return axios.get(API_URL+"/car/getbyuser",{headers:authHeader()});
}
//get user's favorite car
const getUserFavorite=()=>{
    return axios.get(API_URL+"/favoris/get",{headers:authHeader()});
}

//get user's reservation
const getUserReservation=()=>{
    return axios.get(API_URL+"/reservation/getbyidowner",{headers:authHeader()});
}

//get user's car reserved /getuser
const getUserCarReserved=()=>{
    return axios.get(API_URL+"/reservation/getbyidtenant",{headers:authHeader()});
}
//get user information 
const getUserInformation=()=>{
    return axios.get(API_URL+"/user/getuser",{headers:authHeader()});
}
//get other information 
const getOtherInformation=(user2)=>{
    return axios.get(API_URL+"/user/getother/"+user2,{headers:authHeader()});
}
//get all user
const getAllUser=()=>{
    return axios.get(API_URL+"/user/getall/",{headers:authHeader()});
}
//get user's notification
const getUserNotification=()=>{
    return axios.get(API_URL+"/notification/get",{headers:authHeader()});
}
//get count notification
const getCount=()=>{
    return axios.get(API_URL+"/notification/getCount",{headers:authHeader()});
}
//get messages of a conversation
const getMessage=(user2)=>{
    return axios.get(API_URL+"/chat/message/"+user2,{headers:authHeader()});
}
//get  conversation of a user
const getConversation=()=>{
    return axios.get(API_URL+"/chat/conversation",{headers:authHeader()});
}
//get count not read message
const getLu=()=>{
    return axios.get(API_URL+"/chat/count",{headers:authHeader()});
}
const getServices={getFiveCar,getAllCar,getOneCar,getUserCar,getUserReservation,getUserCarReserved,getUserFavorite,getUserInformation,getUserNotification,getCount,getMessage,getConversation,getLu,getOtherInformation, getAllUser};

export default getServices;
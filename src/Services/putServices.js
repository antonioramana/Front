import axios from "axios";
import authHeader from "./authHeader";

const API_URL="http://localhost:5000";

//edit a car
const updateCar=(immatriculation,marque,tarif,couleur,nbplace)=>{
    return axios.put(API_URL+"/car/edit/"+immatriculation,{marque,tarif,couleur,nbplace},{headers:authHeader()})
                .then((response)=> {
                    return response.data;
                });
};

//edit user
const updateUser=(nom,prenom,email,sexe,tel,ville,province)=>{
    return axios.put(API_URL+"/user/edit",{nom,prenom,email,sexe,tel,ville,province},{headers:authHeader()})
                .then((response)=> {
                    return response.data;
                });
};
//edit notification
const updateNotification=()=>{
    return axios.put(API_URL+"/notification/edit",{},{headers:authHeader()})
                .then((response)=> {
                    return response.data;
                });
};
//set lu to true
const updateLu=()=>{
    return axios.put(API_URL+"/chat/editlu/",{},{headers:authHeader()})
                .then((response)=> {
                    return response.data;
                });
};
//set last to false
const updateLast=(user2)=>{
    return axios.put(API_URL+"/chat/editlast/"+user2,{},{headers:authHeader()})
                .then((response)=> {
                    return response.data;
                });
};
const putServices={updateCar,updateUser,updateNotification,updateLu,updateLast};

export default putServices;
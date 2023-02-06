import axios from "axios";
import authHeader from "./authHeader";

const API_URL="http://localhost:5000";

//Remove a car
const removeCar=(immatriculation)=>{
    return axios.delete(API_URL+"/car/delete/"+immatriculation,{headers:authHeader()})
                .then((response)=> {
                    return response.data;
                });
};

//Remove a reservation
const removeReservation=(id_res)=>{
    return axios.delete(API_URL+"/reservation/delete/"+id_res,{headers:authHeader()})
    .then((response)=> {
        return response.data;
    });
}

//Remove a favoris
const removeFavoris=(immatriculation)=>{
    return axios.delete(API_URL+"/favoris/delete/"+immatriculation,{headers:authHeader()})
    .then((response)=> {
        return response.data;
    });
}
//Remove a notification
const removeNotification=(id_notif)=>{
    return axios.delete(API_URL+"/notification/delete/"+id_notif,{headers:authHeader()})
    .then((response)=> {
        return response.data;
    });
}
//Remove a message
const removeMessage=(id_mess)=>{
    return axios.delete(API_URL+"/chat/deletemessage/"+id_mess,{headers:authHeader()})
    .then((response)=> {
        return response.data;
    });
}
const deleteServices={removeCar,removeReservation,removeFavoris,removeNotification,removeMessage};

export default deleteServices;
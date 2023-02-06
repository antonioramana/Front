import axios from "axios";
import authHeader from "./authHeader";

const API_URL="http://localhost:5000";

//Signup
const signup=(nom,prenom,email,tel,ville,province,password,sexe)=>{
    return axios.post(API_URL+"/user/register",{nom,prenom,email,tel,ville,province,password,sexe})
                .then((response)=> {
                    return response.data;
                }); 
};


//Add a car
const addCar=(immatriculation,tarif,couleur,nbplace,marque,file)=>{

		const formData= new FormData();
		formData.append("caImage",file);
		formData.append("immatriculation",immatriculation);
		formData.append("tarif",tarif);
		formData.append("couleur",couleur);
		formData.append("nbplace",nbplace);
		formData.append("marque",marque);

    return axios.post(API_URL+"/car/create",formData,{headers:authHeader()},{headers:{'Content-Type':'multipart/form-data'}})
                .then((response)=> {
                    return response.data;
                });
};

//Add a favorite
const addFavoris=(immatriculation)=>{
    return axios.post(API_URL+"/favoris/create",{immatriculation},{headers:authHeader()})
                .then((response)=> {
                    return response.data;
                });
};

//Add a reservation
const addReservation=(immatriculation,nbjour,dateres,lieu,heure)=>{
    return axios.post(API_URL+"/reservation/create",{immatriculation,nbjour,dateres,lieu,heure},{headers:authHeader()})
    .then((response)=> {
        return response.data;
    });
}
//Add a notification
const addNotification=(receiver,content)=>{
    return axios.post(API_URL+"/notification/create",{receiver,content},{headers:authHeader()})
    .then((response)=> {
        return response.data;
    });
}
//Add a message 
const addMessage=(user1,user2,sender,text)=>{
    return axios.post(API_URL+"/chat/create",{user1,user2,sender,text},{headers:authHeader()})
    .then((response)=> {
        return response.data;
    });
}
const postServices={addCar,addReservation,signup,addFavoris,addNotification,addMessage};

export default postServices;
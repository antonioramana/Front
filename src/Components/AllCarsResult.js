import React from 'react';
import { Link } from 'react-router-dom';
import GetServices from '../Services/getServices';
import { useEffect,useState } from 'react';
const API_URL="http://localhost:5000";

export default function AllCarsResult({allCar,erroMessage,successMessage,user, addToFavoris,handleDelete}) {
	const [myFavorite,setMyFavorite]=useState([]);
	useEffect(()=>{
		GetServices.getUserFavorite().then((response)=>{
			if(response.status===200){
				setMyFavorite(response.data);
			}else{
				setMyFavorite([]);
			}	
		});
	},[])
  return (
      <div className="container">
					<div className="row">
					{erroMessage && <div className="text-danger row">{erroMessage}</div>}
					{successMessage && <div className="text-success text-center row  my-2"> {successMessage}</div>}
					{allCar && (allCar.length <=0)  && <div className="brown text-center col-md-4 col-sm-6">Aucune voiture ...</div>}
					{allCar && (allCar.length > 0) && allCar.map((car)=> ( <div key={car.immatriculation} className="col-md-4 col-sm-6"> 
					{!myFavorite.some((fav)=>fav.immatriculation===car.immatriculation) && <div className="card">
								<img className="card-img-top" src={API_URL+"/images/"+car.image} />
								<div className="card-body">
									<h4 className="card-title">{car.marque}</h4>
									<h6><i className="fa fa-automobile"></i>&nbsp;&nbsp;{car.couleur}, {car.nbplace} places</h6>
									<h5><i className="fa fa-tag rotated"></i>&nbsp;&nbsp;{car.tarif}Ar/Jour</h5>
									{car.id_user !== user.id_user &&<h5><Link to={"/Mymessage/"+car.id_user} className="text-decoration-none text-muted"><i className="fa fa-comment-alt"></i> Contact</Link></h5>}
									{car.id_user !== user.id_user &&<Link to={"/reservation/"+car.immatriculation} className="mybtn btn">Reserver</Link>}
									{car.id_user !== user.id_user &&<button onClick={()=>{addToFavoris(car.immatriculation,car.id_user)}} className="mybtn btn ms-2 text-end">Ajouter aux favoris</button>}
								</div>
							</div>}
					{myFavorite.some((fav)=>fav.immatriculation===car.immatriculation) && <div className="card">
								<img className="card-img-top" src={API_URL+"/images/"+car.image} />
								<div className="card-body">
									<h4 className="card-title">{car.marque}</h4>
									<h6><i className="fa fa-automobile"></i>&nbsp;&nbsp;{car.couleur}, {car.nbplace} places</h6>
									<h5><i className="fa fa-tag rotated"></i>&nbsp;&nbsp;{car.tarif}Ar/Jour</h5>
									{car.id_user !== user.id_user &&<h5><Link to={"/Mymessage/"+car.id_user} className="text-decoration-none text-muted"><i className="fa fa-comment-alt"></i> Contact</Link></h5>}
									{car.id_user !== user.id_user &&<Link to={"/reservation/"+car.immatriculation} className="mybtn btn">Reserver</Link>}
									{car.id_user !== user.id_user &&<button className="mybtn btn ms-2"  onClick={()=>{handleDelete(car.immatriculation)}}>Supprimer aux favoris</button>}
								</div>
							</div>}		
						</div>))}
					</div>
		</div>
  )
}

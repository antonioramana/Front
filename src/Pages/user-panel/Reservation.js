import 'bootstrap/dist/css/bootstrap.min.css';
import 'fontawesome-free/css/all.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '../../Assets/Css/user-panel/style.css';
import NavBar from '../../Layouts/Navbar';
import Footer from '../../Layouts/Footer';
import GetServices from "../../Services/getServices";
import PostServices from "../../Services/postServices";
import {useParams,Link} from 'react-router-dom';
import { useState,useEffect } from 'react';
const API_URL="http://localhost:5000";


function Reservation(){
	const params=useParams();
	const immatriculation=params.immatriculation;
	const[nbjour,setNbjour]=useState();
	const[dateres,setDateres]=useState("");
	const[lieu,setLieu]=useState();
	const[heure,setHeure]=useState("");
	const[receiver,setReceiver]=useState("");
	const[oneCar,setOneCar]=useState([]);
	const[successMessage,setSuccessMessage]=useState("");
	const[erroMessage,setErrorMessage]=useState("");

	useEffect(()=>{
		GetServices.getOneCar(immatriculation).then((response)=>{
			if(response.status===200){
				setOneCar(response.data);
				setReceiver(response.data[0].id_user);
			}else{
				setOneCar([]);
			}	
		},
		(error)=>{
			setOneCar([]);
		})
	},[immatriculation])

	const handleSubmit=async(e)=>{
		const user=JSON.parse(localStorage.getItem("user"));
		const content=user.fullName+" a reservé votre voiture "+immatriculation+" le "+dateres+" à "+heure+", lieu: "+lieu+" pendant "+nbjour+" jours";
		e.preventDefault();
		try{
			await PostServices.addReservation(immatriculation,nbjour,dateres,lieu,heure)
			.then((data)=>{
				if(data.message){
					setSuccessMessage(data.message);
					setErrorMessage("");
					setNbjour("");setDateres("");setLieu("");setHeure("");
					PostServices.addNotification(receiver,content);
				}else{
					setErrorMessage(data.message);
					setSuccessMessage("");
				}
			});
			
		}catch(err){
			setErrorMessage(err);
			setSuccessMessage("");
			console.log(err);
		}
	}
	return (
      <div className='userpanel'>
      <div className="main-container d-flex">
          {/* <!-- NAVBAR --> */}
          <NavBar/>
          {/* <!-- CONTENT --> */}
          <div className="content ps-2">
			<div className="container">
				<div className="row">
					<div className="col-md-2"></div>
					<div className="reservation  col-md-8">
						<div className="row p-2">
							<div className="col-md-6">
								<div className="card text-dark">
									<img className="card-img-top" src={oneCar.length===1 ? API_URL+"/images/"+oneCar[0].image : ""} alt="voiture" />
									<div className="card-body">
										<h4 className="card-title">{oneCar.length===1 ? oneCar[0].marque:""}</h4>
										<h6><i className="fa fa-car"></i>&nbsp;&nbsp;{oneCar.length===1 ? oneCar[0].couleur:""}, {oneCar.length===1 ? oneCar[0].nbplace:""} places</h6>
									</div>
								</div>
							</div>
							<div className="col-md-6">
								<form onSubmit={handleSubmit} className="register-form" id="register-form">
									<h2 className="my-2 text-center">RESERVATION:</h2>
									<div className="row">
										<div className="col-md-6">
											<label htmlFor="date" className="form-label">Date de réservation :</label>
											<input type="date" value={dateres} onChange={(e)=>{setDateres(e.target.value)}} className="form-control" id="date" required/>
										</div>
										<div className="col-md-6">
											<label htmlFor="nbjr" className="form-label">Nombre de jour:</label>
											<input type="number" value={nbjour} onChange={(e)=>{setNbjour(e.target.value)}} min="1" className="form-control"  id="nbjr" required/>
										</div>
									</div>
									<div className="row">
										<div className="col-md-6">
											<label htmlFor="lieu" className="form-label">Lieu :</label>
											<div className="input-group">
												<button className="btn" disabled><i className="fa fa-map-marker"></i> </button>
												<input type="text" value={lieu} onChange={(e)=>{setLieu(e.target.value)}} className="form-control" id="lieu" required/>
											</div>
										</div>
										<div className="col-md-6">
											<label htmlFor="hr" className="form-label">Heure:</label>
											<input type="time" value={heure} onChange={(e)=>{setHeure(e.target.value)}} className="form-control"  id="hr" required/>
										</div>
									</div>
									<div className="row my-3">
                                        <div className="col-md-6 text-start">
                                            <Link to="/Allcar" className="btn btn-secondary">ANNULER</Link>
                                        </div>
										<div className="col-md-6 text-end">
											<input type="submit" value="ENVOYER" className="btn btn-danger"  name="submit" id="submit" />
										</div>
									</div>
									{erroMessage && <div className="text-danger row">{erroMessage}</div>}
									{successMessage && <div className="text-success row">{successMessage} <Link to="/MyLocation"> Vous pouvez le voir  en cliquant ici</Link> </div>}
								</form>
				
							</div>
						</div>
					</div>
					<div className="col-2"></div>
				</div>
			</div>
		{/* <!-- Footer --> */}
        <Footer />
		</div>
      </div>	
      </div>
    );
  }
export default Reservation;

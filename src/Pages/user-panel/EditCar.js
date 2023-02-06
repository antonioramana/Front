import 'bootstrap/dist/css/bootstrap.min.css';
import 'fontawesome-free/css/all.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '../../Assets/Css/user-panel/style.css';
import NavBar from '../../Layouts/Navbar';
import Footer from '../../Layouts/Footer';
import { useParams,Link } from 'react-router-dom';
import{useState,useEffect} from "react";
import PutServices from "../../Services/putServices";
import GetServices from "../../Services/getServices";

function EditCar(){
	const params=useParams();
	const immatriculation=params.immatriculation;
	const[tarif,setTarif]=useState();
	const[couleur,setCouleur]=useState("");
	const[nbplace,setNbplace]=useState();
	const[marque,setMarque]=useState("");
	const[successMessage,setSuccessMessage]=useState("");
	const[erroMessage,setErrorMessage]=useState("");
	const[data,setData]=useState([]);

	GetServices.getOneCar(immatriculation).then((response)=>{
			if(response.status===200){
				setData(response.data);
				setTarif(data[0].tarif);
				setCouleur(data[0].couleur);
				setNbplace(data[0].nbplace);
				setMarque(data[0].marque);
			}else{
				setTarif();
				setCouleur("");
				setNbplace();
				setMarque("");
			}	
		})
	
	const handleSubmit=async(e)=>{
		e.preventDefault();
		window.alert(immatriculation+" "+marque+" "+tarif+" "+couleur+" "+nbplace)
		try{
			await PutServices.updateCar(immatriculation,marque,tarif,couleur,nbplace)
			.then((data)=>{
				if(data.updated===true){
					setSuccessMessage(data.message);
					setErrorMessage("");
				}else if(data.updated===false){
					setErrorMessage(data.message);
					console.log(data.message);
					setSuccessMessage("");
				}
			},
			(error)=>{
				console.log(error);
				setErrorMessage(error);
				setSuccessMessage("");
				console.log(error);
			})
			
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
		  {immatriculation+marque+tarif+couleur+nbplace}
          <div className="content ps-2">
          <div className="container">
                <Link to="/Mycar" className="mybtn btn m-2"> <i className="fa fa-backward"></i> Retour</Link>
				<div className="row">
					<div className="col-md-2"> <div className=""></div></div>
					<div className="addcar  col-md-8 ">
						<div className="row p-2">
								<form onSubmit={handleSubmit} className="register-form" id="register-form">
									<h2 className="my-2 brown rounded-2 text-center">MODIFICATION DE VOITURE {immatriculation} <i className="fa fa-car-alt"></i> :</h2>
									<div className="row">
										<div className="col-md-6">
											<label htmlFor="Immatriculation" className="form-label">Immatriculation :</label>
											<input type="text" value={immatriculation} className="form-control" id="immatriculation" disabled/>
										</div>
										<div className="col-md-6">
											<label htmlFor="tarifjr" className="form-label">Tarif journalier:</label>
                                            <div className="input-group">
                                                <input type="number" value={tarif} onChange={(e)=>{setTarif(e.target.value)}} min="1" className="form-control"  id="tarifjr" required/>
                                                <button className="btn" disabled> <span className="brown">AR</span> </button>
                                           </div>
										</div>
									</div>
									<div className="row">
										<div className="col-md-6">
											<label htmlFor="couleur" className="form-label">Couleur:</label>
											<input type="text" value={couleur} onChange={(e)=>{setCouleur(e.target.value)}} className="form-control" id="couleur"/>
										</div>
										<div className="col-md-6">
											<label htmlFor="nbplace" className="form-label">Nombre de place:</label>
											<input type="number" value={nbplace} placeholder={nbplace} min="1" onChange={(e)=>{setNbplace(e.target.value)}} className="form-control"  id="nbplace"/>
										</div>
									</div>
                                    <div className="row">
                                        <label htmlFor="mark" className="form-label">Marque:</label>
                                        <input type="text" value={marque} onChange={(e)=>{setMarque(e.target.value)}} list="datalistOptions" className="form-control" id="mark" />
                                        <datalist id="datalistOptions">
                                            <option value="Peugeot" />
                                            <option value="Golf" />
                                            <option value="Toyota" />
                                            <option value="Hyundai" />
                                            <option value="BMW" />
                                            <option value="Nissan" />
                                            <option value="Mitsubishi" />
                                             <option value="Citroen" />
                                            <option value="Kia" />
                                        </datalist>  
                                    </div>
									<div className="my-5">
										<div className="text-center">
											<input type="submit" value="MODIFIER" className="mybtn btn p-2"  name="submit" id="submit" />
										</div>
									</div>
									{erroMessage && <div className="text-danger row">{erroMessage}</div>}
									{successMessage && <div className="text-success text-center row fs-4 mt-0"> {successMessage} <Link to="/Mycar"> Vous pouvez voir votre voiture ici</Link> </div>}
								</form>
				
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
export default EditCar;

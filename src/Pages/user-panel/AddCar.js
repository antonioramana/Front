import 'bootstrap/dist/css/bootstrap.min.css';
import 'fontawesome-free/css/all.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '../../Assets/Css/user-panel/style.css';
import NavBar from '../../Layouts/Navbar';
import Footer from '../../Layouts/Footer';
import PostServices from "../../Services/postServices";
import { Link, useHistory} from 'react-router-dom';
import { useState } from 'react';


function AddCar(){
	const history=useHistory();
	const[immatriculation,setImmatriculation]=useState("");
	const[tarif,setTarif]=useState();
	const[couleur,setCouleur]=useState("");
	const[nbplace,setNbplace]=useState();
	const[marque,setMarque]=useState("");
	const[file,setFile]=useState("");
	const[successMessage,setSuccessMessage]=useState("");
	const[erroMessage,setErrorMessage]=useState("");

	const handleSubmit=async(e)=>{
		e.preventDefault();

		try{
			await PostServices.addCar(immatriculation,tarif,couleur,nbplace,marque,file)
			.then((data)=>{
				if(data.add==true){
					setSuccessMessage(data.message);
					setErrorMessage("");
					setImmatriculation("");setTarif("");setCouleur("");setNbplace("");setMarque("");
				}else if(data.add==false){
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
          <div className="content ps-2">
          <div className="container">
                <Link to="/Mycar" className="mybtn btn m-2"> <i className="fa fa-backward"></i> Mes voitures</Link>
				<div className="row">
					<div className="col-md-2"></div>
					<div className="addcar  col-md-8 ">
						<div className="row p-2">
								<form onSubmit={handleSubmit} className="register-form" id="register-form"  method="post" encType="multipart/form-data">
									<h2 className="my-2 brown rounded-2 text-center">NOUVELLE VOITURE <i className="fa fa-car-alt"></i> :</h2>
									<div className="row">
										<div className="col-md-6">
											<label htmlFor="Immatriculation" className="form-label">Immatriculation :</label>
											<input type="text" value={immatriculation} onChange={(e)=>{setImmatriculation(e.target.value)}} className="form-control" id="immatriculation" required/>
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
											<input type="text" value={couleur} onChange={(e)=>{setCouleur(e.target.value)}} className="form-control" id="couleur" required/>
										</div>
										<div className="col-md-6">
											<label htmlFor="nbplace" className="form-label">Nombre de place:</label>
											<input type="number" value={nbplace} onChange={(e)=>{setNbplace(e.target.value)}} min="1" className="form-control"  id="nbplace" required/>
										</div>
									</div>
                                    <div className="row">
                                        <label htmlFor="mark" className="form-label">Marque:</label>
                                        <input type="text" value={marque} onChange={(e)=>{setMarque(e.target.value)}} list="datalistOptions" className="form-control" id="mark" placeholder="Entrez la marque de votre voiture..." required/>
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
                                    <div className="row">
                                        <label htmlFor="carImage" className="form-label">Choisir l'image:</label>
                                        <input type="file" filename={file} onChange={(e)=>{setFile(e.target.files[0])}} accept="image/*" className="form-control" id="carImage" required/>
                                    </div>
									<div className="mt-5 mb-2">
										<div className="text-center">
											<input type="submit" value="ENREGISTRER" className="mybtn btn p-2"  name="submit" id="submit"/>
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
export default AddCar;

import 'bootstrap/dist/css/bootstrap.min.css';
import 'fontawesome-free/css/all.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '../../Assets/Css/user-panel/style.css';
import NavBar from '../../Layouts/Navbar';
import Footer from '../../Layouts/Footer';
import { useParams,Link,useHistory } from 'react-router-dom';
import{useState,useEffect} from "react";
import PutServices from "../../Services/putServices";
import GetServices from "../../Services/getServices";

function EditInformation(props){
	const[nom,setNom]=useState(props.information[0].nom);
	const[prenom,setPrenom]=useState(props.information[0].prenom);
	const[email,setEmail]=useState(props.information[0].email);
	const[sexe,setSexe]=useState(props.information[0].sexe);
	const[tel,setTel]=useState(props.information[0].tel);
	const[ville,setVille]=useState(props.information[0].ville);
	const[province,setProvince]=useState(props.information[0].province);
	const[successMessage,setSuccessMessage]=useState();
	const[erroMessage,setErrorMessage]=useState("");
	const[data,setData]=useState([]);

	const handleSubmit=async(e)=>{
		e.preventDefault();
		try{
			await PutServices.updateUser(nom,prenom,email,sexe,tel,ville,province)
			.then((data)=>{
				if(data.updated==true){
					setSuccessMessage(data.message);
					setErrorMessage("");
                    window.location.reload();
				}else if(data.updated==false){
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
        <>
								<form onSubmit={handleSubmit} className="row" id="">
									<h6 className="my-3 brown rounded-2 text-center">MODIFICATION DES INFORMATIONS :</h6>
									<div className="row">
										<div className="col-md-6">
											<label htmlFor="nom" className="form-label">Nom :</label>
											<input type="text" value={nom} onChange={(e)=>{setNom(e.target.value)}}className="form-control" id="nom" required/>
										</div>
										<div className="col-md-6">
											<label htmlFor="prenom" className="form-label">Prénom:</label>
                                                <input type="text" value={prenom} onChange={(e)=>{setPrenom(e.target.value)}} min="1" className="form-control"  id="prenom" required/>
										</div>
									</div>
									<div className="row">
										<div className="col-md-6">
											<label htmlFor="email" className="form-label">Email:</label>
											<input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} className="form-control" id="email" required/>
										</div>
										<div className="col-md-6">
											<label htmlFor="tel" className="form-label">Tel:</label>
											<input type="text" value={tel} min="1" onChange={(e)=>{setTel(e.target.value)}} className="form-control"  id="tel" required/>
										</div>
									</div>
                                    <div className="row">
                                        <div className="col-md-6">
											<label htmlFor="ville" className="form-label">Ville:</label>
											<input type="text" value={ville} onChange={(e)=>{setVille(e.target.value)}} className="form-control" id="ville" required/>
										</div>
                                        <div className="col-md-6">
											<label htmlFor="province">Province :</label><br/>
												<select className="form-select" value={province} name="province" id="province" onChange={(e)=>{setProvince(e.target.value)}}>
													<option value="tana">Antananarivo</option>
													<option value="diego">Antsiranana</option>
													<option value="majunga">Mahajanga</option>
													<option value="fianar">Fianarantsoa</option>
													<option value="tamatave">Toamasina</option>
													<option value="tulear">Toliara</option>
												</select>
										</div> 
                                    </div>
                                    <div className="row">
                                    <div className="form-radio ">
										<label htmlFor="gender" className="radio-label">Genre :</label>
										<div className="form-check form-check-inline">
											<input className="form-check-input" value="M" type="radio" name="gender" id="male" onChange={(e)=>{setSexe(e.target.value)}} />
											<label className="form-check-label" htmlFor="male">Male</label>
											<span className="check"></span>
										</div>
										<div className="form-check form-check-inline">
											<input className="form-check-input" value="F" type="radio" name="gender" id="female" onChange={(e)=>{setSexe(e.target.value)}} />
											<label className="form-check-label" htmlFor="female">Female</label>
											<span className="check"></span>
										</div>
									</div>
                                    </div>  
									<div className="my-5">
                                    {erroMessage && <div className="text-danger row">{erroMessage}</div>}
									{successMessage && <div className="text-success text-center row fs-4 mt-0 text-center ms-3"> {successMessage} </div>}
										<div className="text-center">
											<input type="submit" value="MODIFIER" className="mybtn btn p-2"  name="submit" id="submit" />
										</div>
									</div>
									
								</form>
                                </>)
  }

export default EditInformation;

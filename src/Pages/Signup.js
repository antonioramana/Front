import '../Assets/Css/Signup/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'fontawesome-free/css/all.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '../Assets/Css/Signup/style.css';
import signupImg from "../Assets/Images/signup-img.jpg";
import { useHistory, Link} from 'react-router-dom';
import { useState } from 'react';
import PostServices from "../Services/postServices";


function Signup() {
	const[email,setEmail]=useState("");
	const[nom,setNom]=useState("");
	const[prenom,setPrenom]=useState("");
	const[tel,setTel]=useState("");
	const[ville,setVille]=useState("");
	const[province,setProvince]=useState("tana");
	const[sexe,setSexe]=useState("M");
	const[password,setPassword]=useState("");
	const[password2,setPassword2]=useState("");
	const[erroMessage,setErrorMessage]=useState("");
	const[successMessage,setSuccessMessage]=useState("");
	const history=useHistory();

	const handleSignup=async(e)=>{
		e.preventDefault();
		if(password!==password2){    //check password confirmation
			setErrorMessage("Veuillez entrer le meme mot de passe");
			setSuccessMessage("");
		}else if(password.length<8){  //check password  length
			setErrorMessage("Le mot de passe minimum est de 8 caratères");
		}else{ //send information
			try{
				await PostServices.signup(nom,prenom,email,tel,ville,province,password,sexe)
				.then((data)=>{
					if(data.register===true){
						setSuccessMessage(data.message);
						setErrorMessage("");
						setEmail("");setNom("");setPrenom("");setTel("");setVille("");setProvince("tana");setPassword("");setPassword2("");
					}else{
						setErrorMessage(data.message);
						setSuccessMessage("");
					}
				},
				(error)=>{
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
}
  return (
    <div className='signup'>
		<div className="container">
			<div className="row">
					<div className="col-md-2"></div>
					<div className="content  col-md-8">
						<div className="row">
							<div className="col-md-6">
								<img src={signupImg} className="signupImg" alt="SignupImg"/>
							</div>
							<div className="col-md-6">
								<form onSubmit={handleSignup} className="register-form" id="register-form">
									<h3 className="my-2 text-white">INSCRIPTION :</h3>
									<div className="row">
										<div className="col-md-6">
											<label htmlFor="name" className="form-label">Nom :</label>
											<input type="text" value={nom} className="form-control" name="name" id="name" onChange={(e)=>{setNom(e.target.value)}} required/>
										</div>
										<div className="col-md-6">
											<label htmlFor="firstname" className="form-label">Prénom :</label>
											<input type="text" value={prenom} className="form-control"  name="firstname" id="firstname" onChange={(e)=>{setPrenom(e.target.value)}}required/>
										</div>
									</div>
									<div className="form-group">
										<label htmlFor="email" className="form-label">Email :</label>
										<input type="email" value={email} className="form-control" name="email" id="email" onChange={(e)=>{setEmail(e.target.value)}} required/>
									</div>
									<div className="form-group">
										<label htmlFor="phone" className="form-label">Numéro téléphone :</label>
										<input type="tel" value={tel} className="form-control" name="phone" id="phone" onChange={(e)=>{setTel(e.target.value)}} required/>
									</div>
									
									<div className="row">
										<div className="col-md-6">
											<label htmlFor="ville" className="form-label">Ville :</label>
												<input type="text" value={ville} className="form-control" name="ville" id="ville" onChange={(e)=>{setVille(e.target.value)}} required/>
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
									<div className="form-group">
										<label htmlFor="mdp"className="form-label" >Créer un mot de passe :</label>
										<input type="password" className="form-control" name="mdp" id="mdp" value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
									</div>
									<div className="form-group">
										<label htmlFor="mdp_2"className="form-label">Confirmer le mot de passe :</label>
										<input type="password"className="form-control" value={password2} onChange={(e)=>{setPassword2(e.target.value)}} name="mdp_2" id="mdp_2" required/>
									</div>
									<div className="form-radio m-1">
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
									<div className="row my-3">
										<div className="col-md-6 text-start">
											<Link to="/login"className="btn btn-danger">ANNULER</Link>
										</div>
										<div className="col-md-6 text-end">
											<input type="submit" value="S'INSCRIRE" className="btn btn-secondary"  name="submit" id="submit" />
										</div>
									</div>
									{erroMessage && <div className="text-danger row">{erroMessage}</div>}
									{successMessage && <div className="text-success row">{successMessage} <Link to="/login"> Vous pouvez connecté maintenant</Link> </div>}
								</form>
				
							</div>
						</div>
					</div>
					<div className="col-2"></div>
				</div>
			</div>
    </div>
  );
}

export default Signup;

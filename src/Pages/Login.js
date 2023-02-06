import 'bootstrap/dist/css/bootstrap.min.css';
import 'fontawesome-free/css/all.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '../Assets/Css/Login/style.css';
import { Link, useHistory} from 'react-router-dom';
import { useState } from 'react';
import AuthServices from "../Services/authServices";

function Login() {

	const[email,setEmail]=useState("");
	const[password,setPassword]=useState("");
	const history=useHistory();
	const[erroMessage,setErrorMessage]=useState("");

	const handleLogin=async(e)=>{
		e.preventDefault();
		try{
			await AuthServices.login(email,password)
				.then((data)=>{
					if(data.auth===true){
						history.push("/allcar");
						window.location.reload();
					}else{
						setErrorMessage(data.message)
					}
				},
				(error)=>{
					setErrorMessage(error);
					console.log(error);
				})
				
		}catch(err){
			setErrorMessage(err);
			console.log(err);
		}
	}
  return (
    <div className="login">
        <section className="ftco-section">
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-md-12 col-lg-10">
					<div className="wrap d-md-flex">
						<div className="text-wrap p-4 p-lg-5 text-center d-flex align-items-center order-md-last">
							<div className="text w-100">
								<h2>Bienvenue à nouveau</h2>
								<p>Vous n'avez pas un compte?</p>
								<Link to="/signup" className="btn btn-outline-white">Créer un compte</Link>
							</div>
			      		</div>
						<div className="login-wrap p-4 p-lg-5">
			      	<div className="d-flex">
			      		<div className="w-100">
			      			<h3 className="mb-4">Connexion</h3>
			      		</div>
								
			      	</div>
						<form onSubmit={handleLogin} className="signin-form">
			      		<div className="form-group mb-3">
			      			<label className="label" htmlFor="name">E-mail</label>
			      			<input type="email" className="form-control" placeholder="E-mail" value={email} onChange={(e)=>{setEmail(e.target.value)}} required />
			      		</div>
		            <div className="form-group mb-3">
		            	<label className="label" htmlFor="password">Mot de passe</label>
		              <input type="password" className="form-control" placeholder="Mot de passe" value={password} onChange={(e)=>{setPassword(e.target.value)}} required />
		            </div> 
		            <div className="form-group">
		            	<button type="submit" className="form-control btn btn-outline-primary submit px-3">Connexion</button>
						
		            </div>
		            <div className="form-group d-md-flex">
		            	<div className="w-50 text-left">
			            	<label className="checkbox-wrap checkbox-primary mb-0">Souvenez-moi
								<input type="checkbox" className='ms-2 text-dark'/>
							</label>
							{erroMessage && <div className="text-danger">{erroMessage}</div>}
					</div>
									
		            </div>
		          </form>
		        </div>
		      </div>
				</div>
			</div>
		</div>
	</section>
    </div>
  );
}

export default Login;

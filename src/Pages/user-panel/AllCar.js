import 'bootstrap/dist/css/bootstrap.min.css';
import 'fontawesome-free/css/all.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '../../Assets/Css/user-panel/style.css';
import NavBar from '../../Layouts/Navbar';
import Footer from '../../Layouts/Footer';
import { Link } from 'react-router-dom';
import GetServices from '../../Services/getServices';
import PostServices from "../../Services/postServices";
import DeleteServices from '../../Services/deleteServices';
import { useEffect,useState } from 'react';
import 	AllCarsResult from "../../Components/AllCarsResult";
import 	FindCarsResult from "../../Components/FindCarsResult";


function AllCar() {
	const [allCar,setAllCar]=useState([]);
	const[successMessage,setSuccessMessage]=useState("");
	const[erroMessage,setErrorMessage]=useState("");
	const[findCar,setFindCar]=useState("");
	const user=JSON.parse(localStorage.getItem("user"));
	
	useEffect(()=>{
		GetServices.getAllCar().then((response)=>{
			if(response.status===200){
				setAllCar(response.data); 
			}else{
				setAllCar([]);
			}	
		},
		);
	},[])

	//add to favoris
	const addToFavoris=(immatriculation,receiver)=>{
		const user=JSON.parse(localStorage.getItem("user"));
		const content=user.fullName+"a ajouté votre voiture "+immatriculation+" à ses favoris";
		PostServices.addFavoris(immatriculation)
			.then((data)=>{
				if(data.created==true){
					setSuccessMessage(data.message);
					PostServices.addNotification(receiver,content);
					window.location.reload();
				}else if(data.created==false){
					setErrorMessage(data.message);
					console.log(data.message);
					setSuccessMessage("");
				}
			}
		)
	}
	//remove to favoris
	const handleDelete=(immatriculation)=>{
		DeleteServices.removeFavoris(immatriculation);
		window.location.reload();
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
					<Link to="/Addcar" className="mybtn btn fs-6 mt-2 col-md-12">AJOUTER UNE VOITURE</Link>
					
						<form className="form-inline  my-5">
							<div className="input-group">
								<input type="text" className="form-control bg-light border-0 small" placeholder="Recherche la marque..."
									aria-label="Search" aria-describedby="basic-addon2" value={findCar} onChange={(e)=>{setFindCar(e.target.value)}}/>
								<div className="input-group-append">
									<button className="mybtn btn" type="button">
										<i className="fas fa-search fa-sm"></i>
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			{/* <!-- All cars result --> */}
			{!findCar.trim()&&allCar.length>0&&<AllCarsResult allCar={allCar} erroMessage={erroMessage} successMessage={successMessage} user={user} addToFavoris={addToFavoris} handleDelete={handleDelete}/>}	
			{/* <!-- Find cars result --> */}
			{findCar.trim()&&allCar.length>0&&<FindCarsResult allCar={allCar.filter((car)=>(car.marque.toLowerCase().search(findCar.toLowerCase())>=0))} erroMessage={erroMessage} successMessage={successMessage} user={user} addToFavoris={addToFavoris} handleDelete={handleDelete}/>}	
			{/* <!-- Footer --> */}
			<Footer />
			</div>
		</div>	
    </div>
  );
}

export default AllCar;

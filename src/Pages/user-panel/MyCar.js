import 'bootstrap/dist/css/bootstrap.min.css';
import 'fontawesome-free/css/all.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '../../Assets/Css/user-panel/style.css';
import NavBar from '../../Layouts/Navbar';
import Footer from '../../Layouts/Footer';
import { Link} from 'react-router-dom';
import GetServices from '../../Services/getServices';
import PutServices from '../../Services/putServices';
import Confirmation from '../../Components/Confirmation';
import EditCar from '../../Components/EditCar';
import DeleteServices from '../../Services/deleteServices';
import { useEffect,useState } from 'react';
const API_URL="http://localhost:5000";

function MyCar() {

	const [myCar,setMyCar]=useState([]);
	const [immatDelete,setImmatDelete]=useState("");
	const [immatEdit,setImmatEdit]=useState("");
	const[successMessage,setSuccessMessage]=useState("");
	const[errorMessage,setErrorMessage]=useState("");
	const[tarif,setTarif]=useState();
	const[couleur,setCouleur]=useState("");
	const[nbplace,setNbplace]=useState();
	const[marque,setMarque]=useState("");

	const handleImmat=(immatriculation)=>{
		setImmatDelete(immatriculation);
	}
	const handleSet=(immatriculation,tarif,couleur,nbplace,marque)=>{
		setImmatEdit(immatriculation);
		setTarif(tarif);
		setCouleur(couleur);
		setNbplace(nbplace);
		setMarque(marque);
	}
	const handleDelete=(immatriculation)=>{
		DeleteServices.removeCar(immatriculation);
		window.location.reload();
	}
	useEffect(()=>{
		GetServices.getUserCar().then((response)=>{
			if(response.status===200){
				setMyCar(response.data);
			}else{
				setMyCar([]);
			}	
		},
		(error)=>{
			setMyCar([]);
		})
	},[])

	const handleEdit=async(immatriculation,marque,tarif,couleur,nbplace)=>{
		try{
			await PutServices.updateCar(immatriculation,marque,tarif,couleur,nbplace)
			.then((data)=>{
				if(data.updated===true){
					setSuccessMessage(data.message);
					setErrorMessage("");
					window.location.reload();
				}else if(data.updated===false){
					setErrorMessage(data.message);
					console.log(data.message);
					setSuccessMessage("");
				}
			})	
		}catch(err){
			setErrorMessage(err);
			setSuccessMessage("");
			console.log(err);
		}
	}


  return (
	<>

    <div className='userpanel'>
    <div className="main-container d-flex">
		{/* <!-- NAVBAR --> */}
		<NavBar/>
		{/* <!-- CONTENT --> */}
		<div className="content ps-2">
			<div className="container">
				<div className="row">
					<Link to='/Addcar' className="mybtn btn fs-5 my-4 col-md-12">Ajouter une voiture</Link>
				</div>
			</div>
			<div className="container">
				<div className="row">
				{myCar && (myCar.length <=0)  && <div className="brown text-center col-md-4 col-sm-6">Aucune voiture ...</div>}
				{myCar && (myCar.length > 0) && myCar.map((car)=> (<div key={car.immatriculation} className="col-md-4 col-sm-6">
						<div className="card">
							<img className="card-img-top" src={API_URL+"/images/"+car.image} alt="a car"/>
							<div className="card-body">
								<h4 className="card-title">{car.marque}</h4>
								<h6><i className="fa fa-automobile"></i>&nbsp;&nbsp;{car.couleur}, {car.nbplace} places, {car.immatriculation}</h6>
								<div className="btns">
									<button className="brown btn" onClick={()=>{handleSet(car.immatriculation,car.tarif,car.couleur,car.nbplace,car.marque)}}  data-bs-toggle="modal" data-bs-target="#modalEdit"><i className="fa fa-edit ml-3"></i></button>
									 <button className="brown btn" onClick={()=>{handleImmat(car.immatriculation)}}  data-bs-toggle="modal" data-bs-target="#modalConfirm"><i className="fa fa-trash ml-3"></i></button> 
								</div>  
							</div>
						</div>

	
					</div>))}
				</div>
			</div>
		<Confirmation id={immatDelete} name="Cette voiture" handleDelete={handleDelete}/>
		<EditCar errorMessage={errorMessage} successMessage={successMessage} immatriculation={immatEdit} handleEdit={handleEdit} tarif={tarif} couleur={couleur} nbplace={nbplace} marque={marque}/>
		{/* <!-- Footer --> */}
        <Footer />
		</div>
	</div>	
    </div>
	</>
  );
}

export default MyCar;

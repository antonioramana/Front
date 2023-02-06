import 'bootstrap/dist/css/bootstrap.min.css';
import 'fontawesome-free/css/all.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '../../Assets/Css/user-panel/style.css';
import NavBar from '../../Layouts/Navbar';
import Footer from '../../Layouts/Footer';
import GetServices from '../../Services/getServices';
import { useEffect,useState } from 'react';
import { Link} from 'react-router-dom';
import DeleteServices from '../../Services/deleteServices';
import Confirmation from '../../Components/Confirmation';
const API_URL="http://localhost:5000";

function MyFavorite() {
	const [myFavorite,setMyFavorite]=useState([]);
	const [idDelete,setIdDelete]=useState("");

	useEffect(()=>{
		GetServices.getUserFavorite().then((response)=>{
			if(response.status===200){
				setMyFavorite(response.data);
			}else{
				setMyFavorite([]);
			}	
		},
		(error)=>{
			setMyFavorite([]);
		});
	},[])

	const handleIdDelete=(immatriculation)=>{
        setIdDelete(immatriculation);
    }

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
                <h1 className='brown p-3'>Mes Favoris</h1> 
            </div> 
			<div className="container">
				<div className="row">
					{myFavorite && (myFavorite.length <=0)  && <div className="brown text-center col-md-4 col-sm-6">Aucune voiture ...</div>}
					{myFavorite && (myFavorite.length > 0) && myFavorite.map((car)=> (<div key={car.id_fav} className="col-md-4 col-sm-6"> 
						<div className="card">
							<img className="card-img-top" src={API_URL+"/images/"+car.image} />
							<div className="card-body">
								<h4 className="card-title">{car.marque}</h4>
								<h6><i className="fa fa-automobile"></i>&nbsp;&nbsp;{car.couleur}, {car.nbplace} places {car.immatriculation}</h6>
								<div className="btns">
								    <Link to={"/reservation/"+car.immatriculation} className="mybtn btn me-2">Reserver</Link>
									<button className="mybtn btn"  onClick={()=>{handleIdDelete(car.immatriculation)}} data-bs-toggle="modal" data-bs-target="#modalConfirm">Supprimer aux favoris</button>	 
								</div> 
							</div>
						</div>
					</div>))}

				</div>
			</div>
		{/* <!-- Footer --> */}
		<Confirmation id={idDelete} name="Cette voiture de vos favoris" handleDelete={handleDelete}/>
        <Footer />
		</div>
	</div>	
    </div>
  );
}

export default MyFavorite;

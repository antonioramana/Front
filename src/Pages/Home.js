 import 'bootstrap/dist/css/bootstrap.min.css';
import 'fontawesome-free/css/all.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '../Assets/Css/Home/style.css';
import { Link } from 'react-router-dom';
import GetServices from '../Services/getServices';
import { useEffect,useState } from 'react';
import logo from "../Assets/Images/logo.png";
import frontCar from"../Assets/Images/front-car.jpg";
const API_URL="http://localhost:5000";

function Home() {
	const [fourCar,setFourCar]=useState([]);
	const[erroMessage,setErrorMessage]=useState("");
	const user=JSON.parse(localStorage.getItem("user"));
	
	useEffect(()=>{
		GetServices.getFiveCar().then((response)=>{
			if(response.status===200){
				setFourCar(response.data);
			}else{
				setFourCar([]);
			}	
		},
		(error)=>{
			setFourCar([]);
		});
	},[])

  return (
    <div className="home">
        {/*HOME NAVBAR */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container">
          <a className="navbar-brand" href="#"><img src={logo} width="40" height="45" alt="image"/><span className="ps-2 fs-3 pb-0">Kar<span className="mytext">Loco</span></span></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="#hero">ACCUEIL</a>
              </li>
              <li className="nav-item">
                  <a className="nav-link" href="#section2">VOITURES</a>
            </li>
             <li className="nav-item">
                <a className="nav-link" href="#section3">INSCRIPTION</a>
            </li>
             <li className="nav-item">
                <a className="nav-link" href="#section4">CONNEXION</a>
            </li>
            </ul>
          </div>
        </div>
      </nav>  
      {/* HOME SECTION1 */}
      <section id="hero" className="d-flex align-items-center">
        <div className="container">
          <h1>Reserver votre <span>voiture<br />
            de reve</span> sur notre plateforme</h1>
          <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit.<br />
            Possimus exercitationem libero tempore,<br />
            consequuntur adipisci dolore sit eligendi perspiciatis<br />
            ut repellendus! Qui magni ea fugit iure dolore ratione<br />
            eaque assumenda quam.</h2>
          <div className="d-flex">
            {user && <Link to={"/allCar/"} className="btn btn-custom_1 hvr-radial-out" style={{marginRight: "5px"}}>Reservez maintenant</Link>}
						{!user && <Link to="/login" className="btn btn-custom_1 hvr-radial-out" style={{marginRight: "5px"}}>Reservez maintenant</Link>}  
            {user && <Link to="/addcar" className="btn btn-custom_2 hvr-radial-out">Alouez votre voiture</Link>}
            {!user && <Link to="/login" className="btn btn-custom_2 hvr-radial-out">Alouez votre voiture</Link>}
          </div>
          <div id="voitures">.</div>
        </div>
      </section>
    {/* HOME SECTION2 */}
    <section id="section2" className="container">
        <div className="row text-center p-2"> <h2>Nos dernières <span className="mytext" >voitures</span></h2> </div>
        <div className="row">  
         {erroMessage && <div className="text-danger row">{erroMessage}</div>}
					{fourCar && (fourCar.length <=0)  && <div className="brown text-center col-md-4 col-sm-6">Aucune voiture ...</div>}        
          {fourCar && (fourCar.length > 0) && fourCar.map((car)=> (  <div key={car.immatriculation} className="col-md-3 col-sm-4"> 
							<div className="card">
								<img className="card-img-top" src={API_URL+"/images/"+car.image} />
								<div className="card-body">
									<h4 className="card-title">{car.marque}</h4>
									<h6><i className="fa fa-automobile"></i>&nbsp;&nbsp;{car.couleur}, {car.nbplace} places</h6>
									<h5><i className="fa fa-tag rotated"></i>&nbsp;&nbsp;{car.tarif} Ar/Jour</h5>
									{user && <Link to={"/Reservation/"+car.immatriculation} className="btn btn-custom_1 hvr-radial/-out">Reserver</Link>}
									{!user && <Link to="/login" className="btn btn-custom_1 hvr-radial/-out">Reserver</Link>}
								</div>
							</div>
						</div>))}
                        
                </div>
                <div className="mt-2 text-end">
                {user && <Link to={"/allCar/"} className="btn btn-custom_2 hvr-radial/-out">Voir tout</Link>}
								{!user && <Link to="/login" className="btn btn-custom_2 hvr-radial/-out">Voir tout</Link>}  
                 </div>
       </section>
       {/* HOME SECTION3 */}
       <section id="section3" className="section padding_bottom-0">
        <div className="container">
            <div className="row">
                <h2 className="mytext text-center">INSCRIPTION</h2>
                <div className="col-md-6 ">
                        <div className="m-5 mb-0">
						   <h2>Gagner du <span className="mytext">temps et de l'argent</span></h2>
                        
						  <h3>Inscrivez-vous maintenant et profitez de nos meilleures offres au meilleurs tarifs</h3>
						
                            <Link to="/signup" className="btn btn-custom_1 hvr-radial-out m-t-20">Inscription</Link>
						
                    </div>
                </div>
				<div className="col-md-6">
                        <img className="img-fluid" src={frontCar} alt="#" />
                </div>
            </div>
        </div>
    </section>
    {/* HOME SECTION4 */}
    <section id="section4" className="section padding_bottom-0">
        <div className="container">
            <div className="row text-center">
                <h2 className="mytext text-center">CONNEXION</h2>
                
                
                        <div className="">                        
						  <h3>Lorsque vous avez déjat un compte, vous pouvez maintenant connecter,<span className="mytext"> ajouter vos voitures</span> et <span className="mytext">reserver </span>les autres voitures </h3>
                          <Link to="/login" className="btn btn-custom_1 hvr-radial-out my-4 p-2">Connexion</Link>
                    </div>
                
            </div>
        </div>
    </section>

    </div>
  );
}

export default Home;

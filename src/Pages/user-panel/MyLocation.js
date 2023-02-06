import 'bootstrap/dist/css/bootstrap.min.css';
import 'fontawesome-free/css/all.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '../../Assets/Css/user-panel/style.css';
import NavBar from '../../Layouts/Navbar';
import Footer from '../../Layouts/Footer';
import GetServices from '../../Services/getServices';
import DeleteServices from '../../Services/deleteServices';
import Confirmation from '../../Components/Confirmation';
import { useEffect,useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
const API_URL="http://localhost:5000";

function MyLocation(){
    const history=useHistory();
	const [myReservation,setMyReservation]=useState([]);
	const [myReservation2,setMyReservation2]=useState([]);
    const user=JSON.parse(localStorage.getItem("user"));
    const user1=user.id_user;
    const [idDelete,setIdtDelete]=useState("");

	const handleIdDelete=(id_res)=>{
		setIdtDelete(id_res);
	}
	const handleDelete=(id_res)=>{
		DeleteServices.removeReservation(id_res);
        window.location.reload();
	}

	useEffect(()=>{
		GetServices.getUserReservation().then((response)=>{
			if(response.status===200){
				setMyReservation(response.data);
			}else{
				setMyReservation([]);
			}	
		},
		(error)=>{
			setMyReservation([]);
		});
        GetServices.getUserCarReserved().then((response)=>{
			if(response.status===200){
				setMyReservation2(response.data);
			}else{
				setMyReservation2([]);
			}	
		},
		(error)=>{
			setMyReservation2([]);
		});
	},[])

    return (
      <div className='userpanel'>
      <div className="main-container d-flex">
          {/* <!-- NAVBAR --> */}
          <NavBar/>
          {/* <!-- CONTENT --> */}
          <div className="content ps-2">
          <div className="container-fluid">
          <section className="">
            <div className="row">
                <div className="col-md-2">
                
                </div>
                <div className="col-md-6">
                    {/* <!--nav tabs---> */}
                    <div className="nav nav-tabs ms-5 px-5 mt-5" id="nav-tab" role="tablist">
                        <button id="one" className="brown nav-link active" id="nav-one-tab" data-bs-toggle="tab" data-bs-target="#nav-one" type="button" role="tab" aria-controls="nav-one" aria-selected="true"><i className="bi bi-person"></i>MES VOITURES</button>         
                        <button id="two" className="brown nav-link"  id="nav-two-tab" data-bs-toggle="tab" data-bs-target="#nav-two" type="button" role="tab" aria-controls="nav-two" aria-selected="false"><i className="bi bi-people"></i>VOITURES RESERVES</button>                  
                    </div>
                    {/* <!--tab content---> */}
                    <div className="tab-content" id="nav-tabContent">
                        {/* <!--tab one content---> */}
                        <div className="tab-pane fade show active p-3" id="nav-one" role="tabpanel" aria-labelledby="nav-one-tab">
                        {myReservation && (myReservation.length <=0)  && <div className="brown text-center col-md-4 col-sm-6">Aucune voiture ...</div>}
					    {myReservation && (myReservation.length > 0) &&  myReservation.map((reservation)=> ( <div key={reservation.id_res} className="row p-2 m-2 border border-4">
                                 <div className="col-md-6">
                                     <img src={API_URL+"/images/"+reservation.image} className="img-fluid rounded-2"/>
                                     <div className=""> <strong>Immatriculation: </strong>{reservation.immatriculation}</div>
                                 </div>  
                                <div className="col-md-6">
                                                    <div className=""> <strong>Date: </strong>{reservation.dateres.split("T")[0]}, {reservation.heure}</div>
                                                        <div className=""><strong>Lieu: </strong>{reservation.lieu}</div>
                                                        <div className=""><strong>Nombre de jour: </strong>{reservation.nbjour} j</div>
                                                         <div className=""><strong>Locataire: </strong>{reservation.nom+" "+reservation.prenom}</div>
                                                        <div className="text-center"><button className="mybtn btn m-1"  onClick={()=>{history.push("/Mymessage/"+reservation.id_user)}}>Contacter</button><button className="mybtn btn m-1 ms-2" onClick={()=>{handleIdDelete(reservation.id_res)}} data-bs-toggle="modal" data-bs-target="#modalConfirm">Supprimer</button></div>
                                  </div>         
                            </div>  ))}
        
                        </div>
                         {/* <!--tab two content---> */}
                        <div className="tab-pane fade show p-3" id="nav-two" role="tabpanel" aria-labelledby="nav-two-tab">
                        {myReservation2 && (myReservation2.length <=0)  && <div className="brown text-center col-md-4 col-sm-6">Aucune voiture ...</div>}
					    {myReservation2 && (myReservation2.length > 0) && myReservation2.map((reservation)=> ( <div key={reservation.id_res} className="row p-2 m-2 border border-4">
                                 <div className="col-md-6">
                                     <img src={API_URL+"/images/"+reservation.image} className="img-fluid rounded-2"/>
                                     <div className=""> <strong>Immatriculation: </strong>{reservation.immatriculation}</div>
                                 </div>  
                                <div className="col-md-6">
                                                    <div className=""> <strong>Date: </strong>{reservation.dateres.split("T")[0]}, {reservation.heure}</div>
                                                        <div className=""><strong>Lieu: </strong>{reservation.lieu}</div>
                                                        <div className=""><strong>Nombre de jour: </strong>{reservation.nbjour} j</div>
                                                         <div className=""><strong>Propiétaire: </strong>{reservation.nom+" "+reservation.prenom}</div>
                                                        <div className="text-center"><button className="mybtn btn m-1" onClick={()=>{history.push("/Mymessage/"+reservation.id_user)}}>Contacter</button><button className="mybtn btn m-1 ms-2" onClick={()=>{handleIdDelete(reservation.id_res)}} data-bs-toggle="modal" data-bs-target="#modalConfirm">Supprimer</button></div>
                                  </div>         
                            </div>  ))}
         
                        </div>
                    </div>   
                    </div>
                
                    <div className="col-md-2">
                        
                    </div>
        </div>
    </section>
		     </div>
         <Confirmation id={idDelete} name="Cette reservation" handleDelete={handleDelete}/>
		{/* <!-- Footer --> */}
        <Footer />
		</div>
      </div>	
      </div>
    );
  }
export default MyLocation;
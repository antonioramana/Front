import logo from "../Assets/Images/logo.png";
import {Link,useHistory} from "react-router-dom";
import LogoutConfirmation from "../Components/LogoutConfirmation";
import {useState,useEffect} from "react";
import GetService from "../Services/getServices";

function NavBar() {
  const history=useHistory();
  const[currentUser,setCurrentUser]=useState(undefined);
  const[nbNotif,setNbNotif]=useState(0);
  const[nbMess,setNbMess]=useState(0);

	useEffect(()=>{

		   GetService.getCount().then((response)=>{
				if(response.status===200){
					setNbNotif(response.data[0].nbNotif);
				}else{
					setNbNotif(0);
				}	
			}).catch((err)=>{
				console.log(err)
			});
			GetService.getLu().then((response)=>{
				if(response.status===200){
					setNbMess(response.data[0].nbNew);
				}else{
					setNbMess(0);
				}	
			}).catch((err)=>{
				history.push("/login")
			});
	},[]);

	return (
     <>
     <LogoutConfirmation />
     <div className="sidebar" id="side_nav">
			<div className="header-box px-2 pt-3 pb-4">
				<h6 className="fs-4 border-bottom border-white p-1"><span className=""><img src={logo} alt="logo"/></span><span className="text-white ms-1">KARLOCO</span></h6>
			</div>
			<ul className="list-unstyled px-2">
				<li ><Link to="/Allcar" className="text-decoration-none px-3 py-2 d-block"><i className="fas fa-home"></i> Home</Link></li>
				<li><Link to="/Myprofile" className="text-decoration-none px-3 py-2 d-block" ><i className="fas fa-fw fa-user"></i> Profile</Link></li>
				<li><Link to="/Mychat" className="text-decoration-none px-3 py-2 d-block d-flex justify-content-between">
					<span className=""><i className="fas fa-envelope fa-fw"></i> Messages</span>
					{nbMess>0 && <span className="bg-danger rounded-pill text-white py-0 px-2">{nbMess}</span>}
				</Link>
				</li>
				<li ><Link to="/Mynotification" className="text-decoration-none px-3 py-2 d-block d-flex justify-content-between">
					<span className=""><i className="fas fa-bell fa-fw"></i> Notifications</span>
					{nbNotif>0 && <span className="bg-danger rounded-pill text-white py-0 px-2">{nbNotif}</span>}
				</Link>
				</li>
				<li ><Link to="/Mycar" className="text-decoration-none px-3 py-2 d-block" ><i className="fas fa-fw fa-car"></i> Mes Voitures</Link></li>
				<li ><Link to="/Myfavorite" className="text-decoration-none px-3 py-2 d-block" ><i className="fas fa-fw fa-heart"></i> Favoris</Link></li>
				<li ><Link to="/Mylocation" className="text-decoration-none px-3 py-2 d-block" ><i className="fa fa-comments"></i> Réservations</Link></li>
				<li ><Link to="/Myplanning" className="text-decoration-none px-3 py-2 d-block" ><i className="fa fa-calendar-day"></i>  Mes Planning</Link></li>
				<li ><Link to="/Mycaisse" className="text-decoration-none px-3 py-2 d-block" ><i className="fa fa-money-bill"></i> Caisse</Link></li>
				<li ><Link to="Mytransaction" className="text-decoration-none px-3 py-2 d-block" ><i className="fa fa-exchange-alt"></i> Transactions</Link></li>
			</ul>
			<br className="h-color mx-3" />

			<ul className="list-unstyled px-2">	
				<li className=""><button className="mybtn btn text-decoration-none px-3 py-2 d-block" data-bs-toggle="modal" data-bs-target="#reg-modal"><i className="fas fa-sign-out-alt"></i> Déconnexion</button></li>
			</ul>
		</div>
     
     </>
        
   
    );
  }
  
  export default NavBar;
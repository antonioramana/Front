import 'bootstrap/dist/css/bootstrap.min.css';
import 'fontawesome-free/css/all.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '../../Assets/Css/user-panel/style.css';
import NavBar from '../../Layouts/Navbar';
import Footer from '../../Layouts/Footer';
import avatarMan from "../../Assets/Images/no-avatar.png";
import GetServices from '../../Services/getServices';
import { useEffect,useState } from 'react';
import EditInformation from "./EditInformation"

function MyProfile(){
	const [information,setInformation]=useState([]);
  const[editInfo,setEditInfo]=useState(false);

	useEffect(()=>{
		GetServices.getUserInformation().then((response)=>{
			if(response.status===200){
				setInformation(response.data);
			}else{
				setInformation([]);
			}	
		},
		(error)=>{
			setInformation([]);
		})
	},[])
    return (
      <div className='userpanel'>
      <div className="main-container d-flex">
          {/* <!-- NAVBAR --> */}
          <NavBar/>
          {/* <!-- CONTENT --> */}
          <div className="content ps-2">
          <div className="container">
                    {information.length ===1 && information.map((info)=> (  <div key={info.id_user} className="row my-4">
                        <div className="col-md-4">
                           <img src={avatarMan} className="img-fluid" alt="avatarMan"/>
                        </div>
                        <div className="col-md-8 p-1 my-5">
                          <h1 className="brown">Mes informations :</h1>
                          <p className=""><strong>Nom et Prénom: </strong>{info.nom} {info.prenom}</p>
                          <p className=""><strong>Email: </strong>{info.email}</p>
                          <p className=""><strong>Tel: </strong>{info.tel}</p>
                          <p className=""><strong>Ville: </strong>{info.ville}</p>
                          <p className=""><strong>Province: </strong>{info.province}</p>
                        </div>
                    </div>))}
                   {!editInfo && <button onClick={()=>{setEditInfo(true)}} className="mybtn2 btn fs-6 mt-2 col-md-4">MODIFIER LES INFORMATIONS <i className="fa fa-chevron-down"></i></button>}
                   {editInfo && <button onClick={()=>{setEditInfo(false)}} className="mybtn2 btn fs-6 mt-2 col-md-4">ANNULER LA MODIFICATION <i className="fa fa-chevron-up"></i></button>}
		     </div>
         <div className="container">
            {information.length===1 && editInfo && <EditInformation information={information} />}
          </div>
		{/* <!-- Footer --> */}
        <Footer />
		</div>
      </div>	
      </div>
    );
  }
export default MyProfile;

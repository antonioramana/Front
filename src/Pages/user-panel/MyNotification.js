import 'bootstrap/dist/css/bootstrap.min.css';
import 'fontawesome-free/css/all.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '../../Assets/Css/user-panel/style.css';
import NavBar from '../../Layouts/Navbar';
import Footer from '../../Layouts/Footer';
import PutServices from "../../Services/putServices";
import GetServices from '../../Services/getServices';
import DeleteServices from '../../Services/deleteServices';
import Confirmation from '../../Components/Confirmation';
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import{ format } from "timeago.js";

function MyNotification(){

	const [notifications,setNotifications]=useState([]);
	   const [idDelete,setIdDelete]=useState("");

	
	useEffect(()=>{
        PutServices.updateNotification();
        GetServices.getUserNotification().then((response)=>{
            if(response.status===200){
                setNotifications(response.data);
			}else{
                setNotifications([]);
			}	
		});
	},[])
    
    const handleIdDelete=(id_notif)=>{
        setIdDelete(id_notif);
    }
    const handleDelete=(id_notif)=>{     
             DeleteServices.removeNotification(id_notif);
            window.location.reload()
        }

    return (
      <div className='userpanel'>
      <div className="main-container d-flex">
          {/* <!-- NAVBAR --> */}
          <NavBar/>
          {/* <!-- CONTENT --> */}
          <div className="content ps-2">
          <div className="container-fluid">
          <section className="mt-5">
            <div className="row">
                <div className="col-md-1">
                
                </div>
                <div className="col-md-10">
                    {/* <!--tab content---> */}
                        {notifications && (notifications.length <=0)  && <div className="brown text-center col-md-4 col-sm-6">Aucune notification ...</div>}
					    {notifications && (notifications.length > 0) && notifications.map((notification)=> ( <div key={notification.id_notif} className="row p-2 m-2 border border-4">
                                 <div className="col-md-6 card-text">
                                     {notification.content}
                                     <div className=""> <span className="text-muted">{format(notification.createdAt)}</span></div>
                                 </div>  
                                <div className="col-md-6">
                                     <span className="text-start"><Link to={"/Mymessage/"+notification.sender} className="mybtn btn">Contacter</Link></span>
                                     <span className="text-end"><button className="mybtn btn ms-2" onClick={()=>{handleIdDelete(notification.id_notif)}} data-bs-toggle="modal" data-bs-target="#modalConfirm">Supprimer</button></span>
                                  </div>         
                            </div>  ))}
         
                     
                    </div>
                
                    <div className="col-md-1">
                        
                    </div>
        </div>
    </section>
		     </div>
        <Confirmation id={idDelete} name="Cette notification" handleDelete={handleDelete}/>
		{/* <!-- Footer --> */}
        <Footer />
		</div>
      </div>	
      </div>
    );
  }
export default MyNotification;
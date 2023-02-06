import 'bootstrap/dist/css/bootstrap.min.css';
import 'fontawesome-free/css/all.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '../../Assets/Css/user-panel/style.css';
import NavBar from '../../Layouts/Navbar';
import { useParams,Link } from 'react-router-dom';
import noAvatar from "../../Assets/Images/no-avatar.jpg";
import GetServices from '../../Services/getServices';
import DeleteServices from '../../Services/deleteServices';
import PostServices from '../../Services/postServices';
import PutServices from "../../Services/putServices";
import{ format } from "timeago.js";
import { useEffect,useState,useRef } from 'react';

function MyMessage() {
  const scrollRef=useRef();
  const params=useParams();
const user2=params.conv;
const [fullName,setFullName]=useState("User "+user2);
const user=JSON.parse(localStorage.getItem("user"));
const id_user=user.id_user;
const user1=id_user;
const [message,setMessage]=useState([]);
const [text,setText]=useState("");
	
	useEffect(()=>{
     GetServices.getMessage(user2).then((response)=>{
			if(response.status===200){
				setMessage(response.data);
			}else{
				setMessage([]);
			}	
		});
    GetServices.getOtherInformation(user2).then((response)=>{
			if(response.status===200){
				setFullName(response.data[0].nom+" "+response.data[0].prenom);
			}else{
				setFullName("User "+user2)
			}	
		});
    scrollRef.current?.scrollIntoView({behavior:"smooth"});
	},[message])
  
  const handleDelete=(id_mes)=>{
    DeleteServices.removeMessage(id_mes);
  }

  const addMessage=(e)=>{
    e.preventDefault();
    const sender=id_user;
   
    PutServices.updateLast(user2)
    .then((data)=>{
      if(data.updated==true){
        PostServices.addMessage(user1,user2,sender,text)
        .then((data2)=>{
          if(data2.add==true){
           // setSuccessMessage("Envoyé");
            setText("");
          }else if(data2.add==false){
            //setErrorMessage("Non envoyé");
            window.alert("non envoyé")
          }
        });
       // window.location.reload();
      }
    })
  
  }
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
		  <section className="chat-area">
        <header>
            <Link to="/Mychat"className="back-icon"><i className="fa fa-arrow-left"></i></Link>
            <img src={noAvatar} alt="" />
            <div className="details">
                <span>{fullName}</span>
                <p></p>
            </div>
        </header>
        <div className="chat-box">
        {message&& message.length<=0 &&<div className="alert-danger">Aucun message...</div>}
           {message&& message.length>0 && message.map((mess)=>(
            <div className={ mess.sender===id_user?"chat outgoing":"chat incoming"} key={mess.id_mes} ref={scrollRef}>
             { mess.sender===id_user? <span></span>:<img src={noAvatar} alt="" />}
                <div className="details">
                    <p>{mess.text}<span onClick={()=>{handleDelete(mess.id_mes)}} className="ms-5 text-end"><i className="fa fa-trash"></i></span></p>
                    <div className="">{format(mess.datemes)}</div>
                </div>
            </div>
            
           )) }
            <form className="typing-area">
              <button onClick={addMessage} className=""><i className="fas fa-paper-plane"></i></button>
              <textarea className="form-control" value={text} onChange={(e)=>{setText(e.target.value)}} required></textarea>
            </form>
        </div>
    </section> 
	  	</div>
  		</section>
		   </div>
	  </div>
	</div>	
	</div>
  );
}

export default MyMessage;

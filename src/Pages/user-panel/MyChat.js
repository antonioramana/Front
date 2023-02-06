import 'bootstrap/dist/css/bootstrap.min.css';
import 'fontawesome-free/css/all.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '../../Assets/Css/user-panel/style.css';
import NavBar from '../../Layouts/Navbar';
import Footer from '../../Layouts/Footer';
import PutServices from "../../Services/putServices";
import GetServices from '../../Services/getServices';
import { useEffect,useState } from 'react';
import {useHistory } from 'react-router-dom';
import{ format } from "timeago.js";

function MyChat(){
    const history=useHistory();
    const user=JSON.parse(localStorage.getItem("user"));
    const id_user=user.id_user;
    const [conversations,setConversations]=useState([]);
  
  useEffect(()=>{
        PutServices.updateLu();
       GetServices.getConversation().then((response)=>{
      if(response.status===200){
        setConversations(response.data);
      }else{
        setConversations([]);
      } 
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
            <div className="row m-5">
                
             {conversations && (conversations.length <=0)  && <div className="brown text-center col-md-4 col-sm-6">Aucune conversation ...</div>}
   
                            {conversations && (conversations.length > 0) && conversations.filter((conversation)=>((conversation.id_user!==user.id_user))).map((conversation)=> (<div className="card mb-3" key={conversation.id_conv} >

                               <div className="card-body border-0">
                                  <h4 className="">{conversation.nom+" "+conversation.prenom}</h4>
                                  <p className="card-text">{conversation.text}</p>
                                  <p className="card-text"><small className="text-muted">{format(conversation.datemes)}</small></p>
                                  <p className="card-text"> <button onClick={()=>{history.push("/Mymessage/"+(conversation.user1===id_user?conversation.user2:conversation.user1))}} className="mybtn btn">Voir la conversation</button></p>
                              </div>
                            </div> ))}
         
                     
                    </div>
                
                   
    </section>
         </div>
    {/* <!-- Footer --> */}
        <Footer />
    </div>
      </div>  
      </div>
    );
  }
export default MyChat;
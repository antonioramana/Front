import 'bootstrap/dist/css/bootstrap.min.css';
import 'fontawesome-free/css/all.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import authServices from '../Services/authServices';
import { useEffect,useState } from 'react';
import { useHistory } from 'react-router-dom';

function LogoutConfirmation() {
	const history=useHistory();	
    const [tabIndexs,setTabIndexs]=useState("-1")
	const handleLogout=()=>{
		authServices.logout();
		history.push("/login");
        window.location.reload();	
	}
  return (
	<div>
        <div className="modal fade" id="reg-modal" tabIndex={tabIndexs} aria-labelledby="modal-title"aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title"id="modal-title">Déconnexion</h5>
                        <button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Voulez-vous déconnecté ?</p>
                    </div>
                    <div className="modal-footer">
                        <span className="text-start"><button className="btn btn-danger" onClick={handleLogout}>OUI</button></span>
                        <span className="text-end"><button className="btn btn-primary " type="button" data-bs-dismiss="modal" aria-label="Close">NON</button></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default LogoutConfirmation;
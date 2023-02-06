import 'bootstrap/dist/css/bootstrap.min.css';
import 'fontawesome-free/css/all.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import {useState } from 'react';


function EditCar(props){
    const tabIndexs="-1";
    const[immatriculation,setImmatriculation]=useState(props.immatriculation)
    const[tarif,setTarif]=useState(props.tarif);
	const[couleur,setCouleur]=useState(props.couleur);
	const[nbplace,setNbplace]=useState(props.nbplace);
	const[marque,setMarque]=useState(props.marque);

  return (
	<div>
        <div className="modal fade" id="modalEdit" tabIndex={tabIndexs} aria-labelledby="modal-title"aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title"id="modal-title">Modification</h5>
                        <button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    <div className="row">
					<div className="col-md-2"> <div className=""></div></div>
					<div className="addcar  col-md-8 ">
						<div className="row p-2">
								<form className="register-form" id="register-form">
									<h2 className="my-2 brown rounded-2 text-center">MODIFICATION DE VOITURE {props.immatriculation} <i className="fa fa-car-alt"></i> :</h2>
									<div className="row">
										<div className="col-md-6">
											<label htmlFor="Immatriculation" className="form-label">Immatriculation :</label>
											<input type="text" value={props.immatriculation} className="form-control" id="immatriculation" disabled/>
										</div>
										<div className="col-md-6">
											<label htmlFor="tarifjr" className="form-label">Tarif journalier:</label>
                                            <div className="input-group">
                                                <input type="number" value={tarif} placeholder={props.tarif} onChange={(e)=>{setTarif(e.target.value)}} min="1" className="form-control"  id="tarifjr" required/>
                                                <button className="btn" disabled> <span className="brown">AR</span> </button>
                                           </div>
										</div>
									</div>
									<div className="row">
										<div className="col-md-6">
											<label htmlFor="couleur" className="form-label">Couleur:</label>
											<input type="text" value={couleur} placeholder={props.couleur} onChange={(e)=>{setCouleur(e.target.value)}} className="form-control" id="couleur" required/>
										</div>
										<div className="col-md-6">
											<label htmlFor="nbplace" className="form-label">Nombre de place:</label>
											<input type="number" value={nbplace}  placeholder={props.nbplace} min="1" onChange={(e)=>{setNbplace(e.target.value)}} className="form-control"  id="nbplace" required/>
										</div>
									</div>
                                    <div className="row">
                                        <label htmlFor="mark" className="form-label">Marque:</label>
                                        <input type="text" value={marque} placeholder={props.marque} onChange={(e)=>{setMarque(e.target.value)}} list="datalistOptions" className="form-control" id="mark" required/>
                                        <datalist id="datalistOptions">
                                            <option value="Peugeot" />
                                            <option value="Golf" />
                                            <option value="Toyota" />
                                            <option value="Hyundai" />
                                            <option value="BMW" />
                                            <option value="Nissan" />
                                            <option value="Mitsubishi" />
                                             <option value="Citroen" />
                                            <option value="Kia" />
                                        </datalist>  
                                    </div>
									<div className="my-5">
										<div className="text-center">
                                      
										</div>
									</div>
								</form>
				
						</div>
					</div>
					<div className="col-2"></div>
				</div>
                    </div>
                    <div className="modal-footer">
                        <span className="text-start"><button className="btn btn-danger" onClick={()=>{props.handleEdit(immatriculation,marque,tarif,couleur,nbplace)}}>MODIFIER</button></span>
                        <span className="text-end"><button className="btn btn-primary " type="button" data-bs-dismiss="modal" aria-label="Close">ANNULER</button></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default EditCar;
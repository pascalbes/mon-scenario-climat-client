import React from "react";
import Popup from "reactjs-popup";
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SimPopUp = () => {

    return (
        <Popup trigger={<button className="icon-box nomarge nopad">
                                        <FontAwesomeIcon className="icon-gears" icon={faCog}/>
                                    </button>} modal>
                        {close => (
                        <div className="sim-pop-up-box">
                            <div>
                                <div>
                                    <h4>Initialisation des paramètres</h4>
                                    <p>Afin de gagner du temps, vous pouvez initialiser l'ensemble des données à des valeurs spécifiques, ou conserver les actuelles.</p>
                                    <form>
                                        <div><input name="initialisation" value="act" type="radio" checked></input><label>Données actuelles</label></div>
                                        <div><input name="initialisation" value="init" type="radio"></input><label>Données initiales</label></div>
                                        <div><input name="initialisation" value="1degre5" type="radio"></input><label>Un scénario 1.5°C</label></div>
                                        <div><input name="initialisation" value="mad-max" type="radio"></input><label>Mode mad-max</label></div>
                                    </form>
                                    
                                </div>

                                <div>
                                    <h4>Mode Expert</h4>
                                    <p>Le mode expert permet d'accéder à un plus grand nombre de paramètres, pour régler son scénario avec davantage de finesse</p>
                                    <FormControlLabel
                                        value="end"
                                        control={<Switch color="primary" />}
                                        label="Mode Expert"
                                        labelPlacement="end"
                                        />

                                </div>
                            
                            
                            <button
                                className="button"
                                onClick={() => {
                                console.log("modal closed ");
                                close();
                                }}
                            >
                            close modal
                        </button>
                        </div>
                    </div>
                )}
            </Popup>
    )
}

export default SimPopUp
/// BASIC
import React, { Fragment, useState, useEffect } from 'react'
import "./../styles/simulator.css"
import jsonFile from "../ressources/initialDatas.json"
import { Link } from "react-router-dom"

/// COMPONENTS
import SimNav from "../components/simulateur/simNavBar"
import SimCat from "../components/simulateur/simCategorie"
import SimParamList from "../components/simulateur/simParametreList"
import SimParamSlider from "../components/simulateur/simParametreSlide"
import SimResultsArea from "../components/simulateur/simResultsAreaChart"
import SimResultsSpread from "../components/simulateur/simResultsRepartitionSecteur"
import api from '../api/APIHandler'

const Simulator = () => {

    const [values, setValues] = useState(jsonFile.options.vInit)
    const [results, setResults] =useState({})

    //STUF

    console.log(values)

    function getValuesFormatted(vals, units) {
        console.log(vals)
        var valsFinal = vals.map((val, i) => {
            // Get decimal values with commas before passing it to sheet
            // if (!isNaN(v)) {
            //     v = val.replace(".", ",")
            // }
            // Get value as percent before passing it to sheet
            if (units[i]==="%") {
                val /= 100;
            }
            var valSt = val.toString()
            var valStFinal = valSt.replace(".", ",")
            return [valStFinal]
        })
        return valsFinal
    }

    useEffect(() => {
        var idSheet = localStorage.getItem('idSheet')
        var valuesFormatted = getValuesFormatted(values, jsonFile.options.unit)
        if (idSheet) {
            api.patch("/sheet/update/"+idSheet, {values: valuesFormatted})
            .then(res => console.log(res))
            .catch(err => console.log(err))
        }
    }, [values])




    function setOneValue(value, index) {
        var newValues=[...values]
        newValues[index][0]=value
        setValues(newValues)
    }

    function handleParameterType(param, j, values, setValues) {
        if (param.type.list) {
            return <SimParamList key={j} data={param.data} value={values[param.data.index]} setOneValue={setOneValue} />
        }
        else if (param.type.slider) {
            return <SimParamSlider key={j} data={param.data} value={values[param.data.index]} setOneValue={setOneValue}/>
        }
    }

    return (
        <div className="sim-page flex-item">
            <section className="sim-container-box">
                <div className="sim-nav-box flex-item flex-column">
                    <div className="sim-nav-head flex-item">
                        <div className="sim-nav-head-title">
                            <h2 className="h1-border">Mon scénario climat</h2>
                            <p>Paramétrez votre scénario pour la France d'ici 2030</p>
                        </div>
                        <div className="sim-nav-head-init">
                            <button className="sim-init-button border-background"> > Initialiser</button>
                            <button className="sim-init-button border-background"> > Sauvegarder</button>
                        </div>
                    </div>
                    <div className="sim-nav-bar flex-item">
                        <SimNav className="sim-nav-world" data={jsonFile.nav[0]}/>
                        <SimNav className="sim-nav-national" data={jsonFile.nav[1]}/>
                    </div>
                </div>
                <div className="sim-main-box light">
                    {jsonFile.categories.map((cat, i) => (
                        <>
                        <SimCat key={i} data={cat.data} results={cat.resultats} />
                        <div id={"param-box"+i} className="sim-param-box grid-item">{cat.parameters.map((param, j) => (
                            handleParameterType(param, j, values, setValues)
                        ))}</div>
                        </>
                    ))}
                </div>
            </section>
            <section className="sim-results-box flex-item flex-column">
                <SimResultsArea/>
                <SimResultsSpread />
                <Link to="/results"><button className="sim-init-button green-background">Voir mes résultats</button></Link>
            </section>
        </div>
    )
}

export default Simulator

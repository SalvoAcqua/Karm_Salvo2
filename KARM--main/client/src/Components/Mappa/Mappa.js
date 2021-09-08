import React from "react";
import ReactMapGL, {Marker} from "react-map-gl";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {REACT_MAP_MAPBOX_TOKEN} from './apiMappa';
import logo from '../../Images/logo.png'
import './index.css'

function Mappa() {
    const [viewport,setViewport] = useState({latitude:38.115688, longitude:13.361267, width:"80vw", height:"70vh", zoom:13});
    const [selectedPark,setSelectedPark] = useState(null);
    return (
        <div>
            <ReactMapGL {...viewport} mapboxApiAccessToken={REACT_MAP_MAPBOX_TOKEN} onViewportChange={(viewport)=>setViewport(viewport)} mapStyle="mapbox://styles/giuseppe190699/cktbc9uue4sjp19v1rw2g052q">
                <Marker latitude={38.125551} longitude={13.354468}>
                    <button className="marker-btn"> 
                        <img src={logo} width="20"/>
                    </button>
                </Marker>
                <Marker latitude={38.110909} longitude={13.364638}>
                    <button className="marker-btn"> 
                        <img src={logo} width="20"/>
                    </button>
                </Marker>
                <Marker latitude={38.109035} longitude={13.349808}>
                    <button className="marker-btn"> 
                        <img src={logo} width="20"/>
                    </button>
                </Marker>
                <Marker latitude={38.108592} longitude={13.370317}>
                    <button className="marker-btn"> 
                        <img src={logo} width="20"/>
                    </button>
                </Marker>
                
            </ReactMapGL>
        </div>
    )
}

export default Mappa


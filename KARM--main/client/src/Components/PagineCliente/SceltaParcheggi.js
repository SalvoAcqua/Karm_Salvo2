import React from "react";
import {Container,Row,Col, Button} from "react-bootstrap";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {newBooking} from '../../Actions/prenotazioni';
import {GoogleKey} from '../../api.js';
import {GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api';
import {formatRelative} from 'date-fns'


const mapContainerStyle = {
    width:"100vw",
    height:"70vh"
}
const center = {
    lat:38.115688,
    lng:13.361267
   
}

function SceltaParcheggi (){
   
    const libraries = ["places"]
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey:GoogleKey.REACT_GOOGLE_MAP_API_KEY,
        libraries
    })

    if(loadError) return "Errore caricamento Mappa"
    if(!isLoaded) return "Caricamento Mappa"

    return (
        <div>
            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={13} center={center}>

            </GoogleMap>
        </div>
    )
}

export default SceltaParcheggi;
import React, {Fragment} from 'react'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

const MapInstitution = (props) => {
    const {lat, lng} = props;

    return (
        <Fragment>
            <Map 
              google={props.google}
              zoom={16}
              initialCenter={{
                lat: lat,
                lng: lng
              }}
              center={{
                lat: lat,
                lng: lng
              }}
            >
              <Marker 
                position={{
                  lat: lat,
                  lng: lng
                }} 
              />    
            </Map>
        </Fragment>
    )
}

export default GoogleApiWrapper({
    apiKey: (process.env.MAP_KEY),
    language:'es-ES'
  })(MapInstitution)

import React, { useState, Fragment, useEffect } from 'react';
import GooglePlacesAutocomplete,{ geocodeByLatLng, geocodeByAddress, getLatLng} from 'react-google-places-autocomplete';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';



const Maps = (props) => {
    const {setDataAddress, institution, edit} = props;
    const [address, setAddress] = useState(null);
    const [ showingInfoWindow, setShowingInfoWindow ] = useState(false);
    const [activeMarker, setActiveMarker] = useState({});
    const [selectedPlace, setSelectedPlace] = useState({});
    const [mapCenter, setMapCenter] = useState({ lat: -26.185164, lng: -58.174386});

    useEffect(() =>{
      if (edit) {
        setDataAddress(institution.address)
        let placeHolder = document.getElementsByClassName("css-1wa3eu0-placeholder");
        if(placeHolder.length > 0){
          placeHolder[0].innerHTML = institution.address.name;
        }
        setMapCenter({lat: institution.address.lat, lng: institution.address.lng})
      }
    },[])

    const containerStyle = {
      marginTop : '10px',
      // marginLeft: '-50px',
      // position: 'absolute ',  
      // width: '100%',
      // height: '50%'
    }
    

    const handleChange = async dire => {
      setAddress(dire.label)
      try {
        const res = await geocodeByAddress(dire.label)
        const results = await getLatLng(res[0])
        const addressParse = getAddressObject(res[0].address_components)
        const label = res[0].formatted_address;
        setDataAddress({name: label, locality: addressParse.locality, department:addressParse.departament, lat: results.lat, lng:results.lng});
        setMapCenter(results)

      } catch (error) {
        console.log(error)
      }
    };
    const geocodeLatLng = async (lat, lng) => {
       try {
        const res = await geocodeByLatLng({ lat: lat, lng: lng });
        const addressParse = getAddressObject(res[0].address_components)
        const label = res[0].formatted_address;
        console.log(addressParse)
        setAddress(label)
        setDataAddress({name: label, locality: addressParse.locality, department:addressParse.departament, lat: lat, lng:lng});
        
        let placeHolder = document.getElementsByClassName("css-1wa3eu0-placeholder");
        if(placeHolder.length > 0){
          placeHolder[0].innerHTML = label;
        }
        let name = document.getElementsByClassName("css-1uccc91-singleValue");
        if(name.length > 0){
          name[0].innerHTML = label;
        }
       
       } catch (error) {
         console.log(error);
       }
    };

    const getAddressObject = (address_components) =>{
      const ShouldBeComponent = {
        home: ["street_number"],
        postal_code: ["postal_code"],
        street: ["street_address", "route"],
        province: [
          "administrative_area_level_1",
          "administrative_area_level_3",
          "administrative_area_level_4",
          "administrative_area_level_5"
        ],
        locality: [
          "locality",
          "sublocality",
          "sublocality_level_1",
          "sublocality_level_2",
          "sublocality_level_3",
          "sublocality_level_4"
        ],
        departament:[
          "administrative_area_level_2",
        ],
        country: ["country"]
      };

      const address = {
        home: "",
        postal_code: "",
        street: "",
        province: "",
        locality: "",
        departament: "",
        country: ""
      };
      address_components.forEach(component => {
        for (var shouldBe in ShouldBeComponent) {
          if (ShouldBeComponent[shouldBe].indexOf(component.types[0]) !== -1) {
            if (shouldBe === "country") {
              address[shouldBe] = component.short_name;
            } else {
              address[shouldBe] = component.long_name;
            }
          }
        }
      });
      return address;
    };
  
    
    const onMarkerClick = (t, map, coord) => {
      const lat = coord.latLng.lat();
      const lng = coord.latLng.lng();
      geocodeLatLng(lat, lng)
      setMapCenter({lat: lat, lng: lng});
    }

    return (
      <Fragment>
            <GooglePlacesAutocomplete
              onLoadFailed={(error) => (
                console.error("Could not inject Google script", error)
              )}
              autocompletionRequest={{
                componentRestrictions: {
                country: ['ar'],
                }
              }}
              selectProps={{
                onChange: handleChange,
                placeholder : "Direccion..."
              }}
            />
            <Map 
              google={props.google}
              containerStyle={containerStyle}
              zoom={16}
              onClick={(t, map, coord) => onMarkerClick(t, map, coord)}
              initialCenter={{
                lat: mapCenter.lat,
                lng: mapCenter.lng
              }}
              center={{
                lat: mapCenter.lat,
                lng: mapCenter.lng
              }}
            >
              <Marker 
                position={{
                  lat: mapCenter.lat,
                  lng: mapCenter.lng
                }} 
              />    
            </Map>
       


      </Fragment>

    )
}

export default GoogleApiWrapper({
  apiKey: (process.env.MAP_KEY),
  libraries: ["places"],
  language:'es-ES'
})(Maps)


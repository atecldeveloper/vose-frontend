import {useState} from 'react';
import {Box, Typography} from "@mui/material";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import {setStateHelper} from "../utils";
import * as React from "react";

const googleKeys = process.env.NEXT_PUBLIC_GOOGLE_KEYS || '';
console.log(googleKeys)

const LoadingContainer = (props) => (
    <div>Fancy loading container!</div>
)

const mapStyles = {
    width: '100%',
    height: '700px',
    '& .gm-style-iw-c': {
        padding: '0 !important',
    }
};

const containerStyle = {

}

// {
//     "name": "Test Company",
//     "phoneNumber": "0123456789",
//     "email": "test@gmail.com",
//     "isBeautician": 2,
//     "coverImage": "",
//     "location": {
//     "lat": 1.6591832,
//         "lng": 103.6392351
// }
export function Maps(props: any) {
    const [mainState, setMainState] = useState<any>({
        showingInfoWindow: false,
        activeMarker: {},
        activeMarkerData: {},
        selectedPlace: {},
    })

    const onMarkerClick = (data: any) => (props, marker, e) => {
        setStateHelper(setMainState)({
            selectedPlace: props,
            activeMarker: marker,
            activeMarkerData: data,
            showingInfoWindow: true
        })
    }

    const onMapClicked = () => {
        if (mainState.showingInfoWindow) {
            setStateHelper(setMainState)({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    }

    return (
        <Box sx={{ height: '700px', width: '100%', position: 'relative'}}>
            {/*@ts-ignore*/}
            <Map
                google={props.google}
                zoom={6}
                containerStyle={containerStyle}
                style={mapStyles}
                initialCenter={{ lat: 2.542548, lng: 107.941398}}
                onClick={onMapClicked}
            >
                {props.list.map((e: any) => (
                    <Marker
                        key={`${e.name}-${e.phoneNumber}`}
                        // @ts-ignore
                        position={e.location}
                        name={e.name}
                        onClick={onMarkerClick(e)}
                    />
                ))}

                {/*@ts-ignore*/}
                <InfoWindow
                    marker={mainState.activeMarker}
                    visible={mainState.showingInfoWindow}>
                    <div>
                        <div style={{
                            backgroundImage: `url('${mainState.activeMarkerData.coverImage}')`,
                            height: '120px',
                            width: '100%',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}>
                        </div>
                        <h3 style={{
                            margin:'10px 0px',
                            color: 'rgb(89, 79, 71)',
                            fontSize: 22
                          }}>{mainState.activeMarkerData.name}</h3>

                        <p style={{margin:0, fontWeight: 'bold'}}>Phone: &nbsp;
                            <span style={{marginLeft: 12}}>{mainState.activeMarkerData.phoneNumber}</span>
                        </p>
                        <p style={{margin:0, fontWeight: 'bold', marginTop: 5}}>Email: &nbsp;
                            <span style={{marginLeft: 16}}>{mainState.activeMarkerData.email}</span>
                        </p>
                        <p style={{
                          margin:0, 
                          fontWeight: 'bold', 
                          marginTop: 5,
                          display: 'flex',
                          alignItems: 'flex-start',
                          }}>Address: &nbsp;
                          <span style={{width: 200 }}>{mainState.activeMarkerData.address}</span>
                        </p>
                    </div>
                </InfoWindow>

            </Map>
        </Box>
    )
}


export default GoogleApiWrapper({
    apiKey: googleKeys,
    // apiKey: 'AIzaSyAx1vMyXElih4fimWmpkp3nhd30osgdsGU',
    // LoadingContainer: LoadingContainer
})(Maps)

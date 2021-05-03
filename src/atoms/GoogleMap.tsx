import React, { Children, PropsWithChildren} from 'react'
import { TuseState } from '@types'
import MapView, { Callout, PROVIDER_GOOGLE, Marker, MapViewProps, MarkerProps } from 'react-native-maps';
import { GooglePlacesAutocomplete, GooglePlacesAutocompleteProps } from 'react-native-google-places-autocomplete';
import { useState } from 'react';



export const GooglePlaceSearchBar = (props: GooglePlacesAutocompleteProps) => (
  <GooglePlacesAutocomplete  {...props}/>
)


export const GoogleMap = (props:MapViewProps) => {


  return (

    <MapView {...props}>

      </MapView>


  )
}

export const GoogleMarker = (props:MarkerProps) => {


  return (
    <Marker {...props}/>

  )
}


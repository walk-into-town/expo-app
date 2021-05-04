import React from 'react'
import MapView, { Marker, MapViewProps, MarkerProps } from 'react-native-maps';
import { GooglePlacesAutocomplete, GooglePlacesAutocompleteProps } from 'react-native-google-places-autocomplete';


export const GooglePlaceSearchBar = (props: GooglePlacesAutocompleteProps) => (
  <GooglePlacesAutocomplete  {...props} />
)


export const GoogleMap = (props: MapViewProps) => {

  return (
    <MapView {...props}>

    </MapView>
  )
}

export const GoogleMarker = (props: MarkerProps) => {

  return (
    <Marker {...props} />
  )
}


import {} from 'googlemaps';

export interface SearchParams {
	query?: string,
	coords?: google.maps.LatLng,
	placeId?: string,
	locality?: string,
}
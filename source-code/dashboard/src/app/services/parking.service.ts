import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()

export class ParkingService {
	parkingUri = 'http://localhost:3000/parking';
	activityUri = 'http://localhost:3000/activity';

	constructor(private http: HttpClient) {}

	getClosestParks(lat: number, lng: number, handler) {
		this.http.get(`${this.parkingUri}/multiple/${lat}/${lng}`).subscribe(response => {
			handler(response);
		});
	}

	getActivity(handler) {
		this.http.get(this.activityUri).subscribe(response => {
			console.log(response);
			handler(response);
		});
	}
}
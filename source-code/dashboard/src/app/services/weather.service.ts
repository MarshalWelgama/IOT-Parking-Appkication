import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()

export class WeatherService {
	weatherUri = 'http://localhost:3000/weather';

	constructor (private http: HttpClient) {}

	getCurrentWeather(lat: number, lng: number, handler) {
		this.http.get(`${this.weatherUri}/current/${lat}/${lng}`).subscribe(response => {
			console.log(response);
			handler(response);
		});
	}
}
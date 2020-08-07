import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

import {SearchParams} from './../interfaces';

import * as _ from 'underscore';

@Injectable({
	providedIn: 'root',
})

export class SearchService {
	private params: SearchParams = {};
	private paramsSubject = new BehaviorSubject<SearchParams>({});
	private paramsObservable = this.paramsSubject.asObservable();
	private placesService: google.maps.places.PlacesService;

	constructor() {
		var map = new google.maps.Map(document.createElement('div'));
		this.placesService = new google.maps.places.PlacesService(map);
	}

	getLocation() {

	}

	getLocality(components) {
		var locality = _.find(components, component => {
			return _.contains(component.types, 'locality');
		});

		return locality.short_name;
	}

	setParams(params: SearchParams, hard: boolean = false) {
		if (hard) {
			this.params = params;
		} else {
			this.params = _.extend(this.params, params);
		}

		if (this.params.coords == null && this.params.placeId) {
			this.placesService.getDetails({
				placeId: this.params.placeId,
				fields: ['geometry', 'address_components'],
			}, response => {
				this.params.locality = this.getLocality(response.address_components);
				this.params.coords = response.geometry.location;
				this.paramsSubject.next(this.params);
			});
		} else {
			this.paramsSubject.next(this.params);
		}

	}

	getParams() {
		return this.params;
	}

	subscribeToParams(handler) {
		this.paramsObservable.subscribe(handler);
	}
}
import {Injectable} from '@angular/core';

import * as _ from 'underscore';

@Injectable()

export class LocationService {
	public position = null;
	public watchPositionHandlers: any[] = [];
	public initPositionHandlers: any[] = [];

	private loadingPosition: boolean = false;

	startWatchPosition() {
		if (navigator.geolocation) {
			navigator.geolocation.watchPosition(position => {
				this.position = position;

				_.each(this.watchPositionHandlers, handler => {
					handler(this.position);
				});
			});
		}
	}

	watchPosition(handler) {
		this.watchPositionHandlers.push(handler);
	}

	getPosition(handler) {
		if (this.loadingPosition == true) {
			this.initPositionHandlers.push(handler);
		} else if (this.position == null) {
			if (navigator.geolocation) {
				this.loadingPosition = true;
				navigator.geolocation.getCurrentPosition(position => {
					this.loadingPosition = false;

					this.position = position;

					this.startWatchPosition();

					_.each(this.initPositionHandlers, handler => {
						handler(this.position);
					});
					handler(this.position);
				}, () => {}, {
					enableHighAccuracy: true
				});
			}
		} else {
			handler(this.position);
		}
	}
}
import {Component, ViewChild, ElementRef, OnInit, AfterViewInit} from '@angular/core';

import {SearchService, ParkingService, LocationService} from '../../services';

import * as _ from 'underscore';
import * as googleMapStyles from '../../config/google-map-styles.js';

class ParkMarker extends google.maps.Marker {
	restrictions: any[];
	status: string;
	bayId: string;

	restrictionsHtml: string;

	constructor(args) {
		super(args);
	}

	durationToFriendly(duration): string {
		if (duration < 60) {
			return `${duration}M`;
		} else {
			return `${duration / 60}P`;
		}
	}

	restrictionsToText(): string {
		if (!this.restrictionsHtml) {
			var html = '';

			for (var restriction of this.restrictions) {
				html += `
					<div>
						${this.durationToFriendly(restriction.duration.normal)} ${restriction.time.start} - ${restriction.time.end} ${restriction.daysTranslated}
					</div>
				`;
			}

			this.restrictionsHtml = html;
		}

		return this.restrictionsHtml;
	}
}

@Component({
	selector: 'results',
	templateUrl: './results.cmpt.html',
	styleUrls: ['./results.cmpt.scss'],
})


export class ResultsCmpt implements OnInit, AfterViewInit {
	@ViewChild('mapView', {
		static: false
	}) mapView: ElementRef;

	public loadingParks: boolean = false;

	private map: google.maps.Map;
	private lastCoords: google.maps.LatLng;
	private markers: any = {
		me: null,
		parks: [],
		location: null,
	};
	private infoWindow: google.maps.InfoWindow;
	private icons: any = {
		car: {
			scaledSize: new google.maps.Size(32, 32),
			url: '/assets/markers/car.svg',
		},
		unoccupiedPark: {
			scaledSize: new google.maps.Size(32, 32),
			url: '/assets/markers/unoccupied_park.svg',
		},
		presentPark: {
			scaledSize: new google.maps.Size(32, 32),
			url: '/assets/markers/present_park.svg',
		},
		me: {
			scaledSize: new google.maps.Size(32, 32),
			url: '/assets/markers/me.svg',
		},
		pin: {
			scaledSize: new google.maps.Size(32, 32),
			url: '/assets/markers/pin.svg',
		},
	}

	constructor(private searchService: SearchService, private parkingService: ParkingService, private locationService: LocationService) {}

	ngOnInit() {
		this.searchService.subscribeToParams(params => {
			if (params.coords && !_.isEqual(params.coords, this.lastCoords)) {
				this.lastCoords = params.coords;
				this.map.setCenter(params.coords);

				this.markers.pin.setPosition(params.coords);
				this.loadParks();
			}
		});
	}

	loadParks() {
		this.loadingParks = true;
		this.parkingService.getClosestParks(this.map.getCenter().lat(), this.map.getCenter().lng(), response => {
			this.loadingParks = false;

			for (var marker of this.markers.parks) {
				marker.setMap(null);
			}

			this.markers.parks = [];
			console.log(response);
			_.each(response, park => {
				var marker: ParkMarker = new ParkMarker({
					map: this.map,
					icon: park.status == 'Unoccupied' ? this.icons.unoccupiedPark : this.icons.presentPark,
					position: {
						lat: parseFloat(park.location.lattitude),
						lng: parseFloat(park.location.longitude),
					},
					title: `Bay ${park.bay_id}`,
				});

				marker.status = park.status;
				marker.bayId = park.bay_id;
				marker.restrictions = park.restrictions;

				marker.addListener('click', this.parkCallback());

				this.markers.parks.push(marker);
			});
		});
	}

	ngAfterViewInit() {
		this.locationService.getPosition(position => {
			var mePos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			};
			
			this.map = new google.maps.Map(this.mapView.nativeElement, {
				center: mePos,
				styles: googleMapStyles,
				zoom: 17,
				streetViewControl: false,
			});

			this.markers.me = new google.maps.Marker({
				position: mePos,
				title: 'Your Current Position',
				map: this.map,
				icon: this.icons.me,
			});

			this.markers.pin = new google.maps.Marker({
				position: null,
				map: this.map,
				title: 'Searched Location',
				icon: this.icons.pin,
			});

			this.infoWindow = new google.maps.InfoWindow();
		});

		this.locationService.watchPosition(position => {
			this.markers.me.setPosition({
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			});
		});
	}

	parkCallback() {
		var component = this;
		return function(event) {
			var marker = this;
			component.infoWindow.setContent(component.parkInfo(marker));
			component.infoWindow.setPosition(marker.getPosition());
			component.infoWindow.open(marker.map, marker);
		};
	}

	doNothing() {
		alert('Surprise, surprise, I do nothing');
	}

	parkInfo(marker) {
		var html = '';
		console.log(marker);

		html += `
			<style>
				#content {
					color: #000000;
				}

				.park-modal-header {

				}

				.park-modal-title {
					font-size:18px;
					font-weight:600;
				}

				.park-modal-address {
					font-size:14px;
					color:#999999;
					font-weight:500;
					margin-top:4px;
				}

				.park-modal-attributes {
					width:100%;
					border-collapse:collapse;
					margin-top:10px;
				}

				.park-modal-attributes td, .park-modal-attributes th {
					padding:10px;
					text-align:left;
					border:1px solid #F5F5F5;
				}

				.park-modal-attributes tr:nth-child(even) {
					background-color:#F5F5F5;
				}
			</style>
			<div id="content">
				<div class="park-modal-header">
					<div class="park-modal-title">Bay ID: ${marker.bayId}</div>
					<div class="park-modal-address">Address here in api</div>
				</div>
				<div class="park-modal-body">
					<table class="park-modal-attributes">
						<tbody>
							<tr>
								<th>Restrictions</th>
								<td>${marker.restrictionsToText()}</td>
							</tr>
							<tr>
								<th>Ticketed</th>
								<td>No</td>
							<tr>
								<th>Status</th>
								<td>${marker.status}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		`;

		return html;
	}
}
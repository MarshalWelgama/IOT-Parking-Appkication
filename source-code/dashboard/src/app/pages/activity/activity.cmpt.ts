import {Component, OnInit, OnDestroy} from '@angular/core';

import {ParkingService} from './../../services';

@Component({
	templateUrl: './activity.cmpt.html',
	styleUrls: ['./activity.cmpt.scss'],
})

export class ActivityPage implements OnInit, OnDestroy {
	public activityColumns: string[] = ['bayID', 'status', 'restriction_duration'];
	public activity: any[] = [];

	private activityInterval;

	constructor(private parkingService: ParkingService) {}

	ngOnInit() {
		this.activityInterval = setInterval(() => {
			this.getActivity()
		}, 10000);
		
		this.getActivity();
	}

	getActivity() {
		this.parkingService.getActivity(response => {
			this.activity = response;
		});
	}

	ngOnDestroy() {
		clearInterval(this.activityInterval);
	}
}
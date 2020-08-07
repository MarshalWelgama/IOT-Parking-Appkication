import {Component, OnInit} from '@angular/core';

import {SearchService} from './../../services';

import * as _ from 'underscore';

@Component({
	templateUrl: './dashboard.cmpt.html',
	styleUrls: ['./dashboard.cmpt.scss'],
})

export class DashboardPage implements OnInit {
	public locationSelected: boolean = false;

	constructor(private searchService: SearchService) {}

	ngOnInit() {
		this.searchService.subscribeToParams(params => {
			this.locationSelected = !_.isEmpty(params);
		});
	}
}
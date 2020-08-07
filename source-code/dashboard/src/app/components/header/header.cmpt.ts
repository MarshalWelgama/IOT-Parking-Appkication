import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SearchService} from './../../services';
import {SearchParams} from './../../interfaces';

@Component({
	selector: 'header',
	templateUrl: './header.cmpt.html',
	styleUrls: ['./header.cmpt.scss'],
})

export class HeaderCmpt implements OnInit {
	menuItems = [
		{
			endpoint: 'dashboard',
			name: 'Dashboard',
		},
		{
			endpoint: 'activity',
			name: 'IoT Activity',
		},
	];
	public params: SearchParams;

	constructor (public router: Router, private searchService: SearchService) {
		
	}

	ngOnInit() {
		this.searchService.subscribeToParams((params: SearchParams) => {
			this.params = params;
		});
	}

	onEndpoint(endpoint: string) {
		var url = this.router.url.split('/');

		return url[1] == endpoint;
	}
}
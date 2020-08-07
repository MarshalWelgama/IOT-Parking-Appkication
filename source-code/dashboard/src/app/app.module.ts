import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// Importing Material Components
import {MaterialModule} from './modules/material.module';

import {AppCmpt} from './app.cmpt';
import {HeaderCmpt, SearchCmpt, WeatherCmpt, ResultsCmpt} from './components';
import {SearchService, WeatherService, ParkingService, LocationService} from './services';
import {DashboardPage, NotFoundPage, ActivityPage} from './pages';

@NgModule({
	declarations: [
		AppCmpt,
		HeaderCmpt,
		SearchCmpt,
		ResultsCmpt,
		WeatherCmpt,
		DashboardPage,
		NotFoundPage,
		ActivityPage,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MaterialModule,
		FlexLayoutModule,
		HttpClientModule,
	],
	exports: [
		MaterialModule
	],
	providers: [
		SearchService,
		WeatherService,
		ParkingService,
		LocationService,
	],
	bootstrap: [AppCmpt]
})
export class AppModule {}

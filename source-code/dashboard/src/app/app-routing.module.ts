import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {DashboardPage, NotFoundPage, ActivityPage} from './pages';


/*  { path: 'crisis-center', component: CrisisListComponent },
  { path: 'hero/:id',      component: HeroDetailComponent },
  {
    path: 'heroes',
    component: HeroListComponent,
    data: { title: 'Heroes List' }
  },
  { path: '',
    redirectTo: '/heroes',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent } */
const routes: Routes = [
	{
		path: '',
		redirectTo: '/dashboard',
		pathMatch: 'full',
	},
	{
		path: 'dashboard',
		component: DashboardPage,
		pathMatch: 'full',
	},
	{
		path: 'activity',
		component: ActivityPage,
		pathMatch: 'full',
	},
	{
		path: '**',
		component: NotFoundPage,
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

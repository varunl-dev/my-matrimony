import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent, ProfileDetailComponent } from './component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'profile-detail/:index', component: ProfileDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

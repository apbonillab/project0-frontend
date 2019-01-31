import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { HistoricalComponent } from './historical/historical.component';
import { AuthGuardService } from './core/services/guards/auth-guard.service';

const appRoutes: Routes = [
     { path:'historical', component:HistoricalComponent,canActivate: [AuthGuardService]},
     { path:'create',component:CreateComponent,canActivate: [AuthGuardService] },
     { path:'**', component:LandingComponent},
     
];


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule],
    declarations: []
})
export class AppRoutingModule {
}

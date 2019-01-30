import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { HistoricalComponent } from './historical/historical.component';

const appRoutes: Routes = [
     { path:'**', component:HistoricalComponent},
     { path:'create',component:CreateComponent}
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

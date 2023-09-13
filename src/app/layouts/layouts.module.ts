import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsRoutingModule } from './layouts-routing.module';
import { FooterComponent } from './footer/footer.component';
import { HorizontalComponent } from './horizontal/horizontal.component';
import { HorizontaltopbarComponent } from './horizontaltopbar/horizontaltopbar.component';
import { LoyoutsComponent } from './loyouts/loyouts.component';
import { TopbarComponent } from './topbar/topbar.component';
import { VerticalComponent } from './vertical/vertical.component';
@NgModule({
  declarations: [
    FooterComponent,
    HorizontalComponent,
    HorizontaltopbarComponent,
    LoyoutsComponent,
    TopbarComponent,
    VerticalComponent
  ],
  imports: [
    CommonModule,
    LayoutsRoutingModule
  ]
})
export class LayoutsModule { }

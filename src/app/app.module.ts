import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { SceneComponent } from './scene/scene.component';
import { MeshParamsComponent } from './mesh-params/mesh-params.component';


@NgModule({
  declarations: [
    AppComponent,
    SceneComponent,
    MeshParamsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { SceneComponent } from './scene/scene.component';
import { MeshParamsComponent } from './mesh-params/mesh-params.component';
import { MeshDataService } from './mesh-data.service';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ObjectBrowserComponent } from './object-browser/object-browser.component';
import { ContentBarComponent } from './content-bar/content-bar.component';
import { HierarchyBarComponent } from './hierarchy-bar/hierarchy-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    SceneComponent,
    MeshParamsComponent,
    ToolbarComponent,
    ObjectBrowserComponent,
    ContentBarComponent,
    HierarchyBarComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [MeshDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { SceneComponent } from './scene/scene.component';
import { MeshParamsComponent } from './mesh-params/mesh-params.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ObjectBrowserComponent } from './object-browser/object-browser.component';
import { ContentBarComponent } from './content-bar/content-bar.component';
import { HierarchyBarComponent } from './hierarchy-bar/hierarchy-bar.component';
import { Vector3Component } from '../Components/vector3/vector3.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { ConsoleComponent } from './console/console.component';
import { LoggerService } from './logger.service';
import { TreeModule } from 'angular-tree-component';
import { SceneStateService } from './scene-state.service';
import { MeshDirective } from './mesh.directive';

@NgModule({
  declarations: [
    AppComponent,
    SceneComponent,
    MeshParamsComponent,
    ToolbarComponent,
    ObjectBrowserComponent,
    ContentBarComponent,
    HierarchyBarComponent,
    Vector3Component,
    ConsoleComponent,
    MeshDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NoopAnimationsModule,
    MatCheckboxModule,
    MatTabsModule,
    TreeModule
  ],
  providers: [LoggerService, SceneStateService],
  bootstrap: [AppComponent],
  entryComponents: [Vector3Component]
})
export class AppModule { }

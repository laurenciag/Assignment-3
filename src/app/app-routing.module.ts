import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListItemsComponent } from './page/list-items/list-items.component';

const routes: Routes = [
  { path: "", redirectTo: "/items", pathMatch: "full"},
  { path: "items", component: ListItemsComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

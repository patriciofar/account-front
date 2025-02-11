import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './shared/main/main.component';

@NgModule({
  imports: [RouterModule.forRoot([
    {
      path: '',
      component: MainComponent,
      loadChildren: () =>
        import('./modules/account/account.module').then(
          (m) => m.AccountModule
        ),
    },
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
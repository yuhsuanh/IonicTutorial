import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'developer', pathMatch: 'full' },
  {
    path: 'developer',
    loadChildren: () => import('./pages/developer/developer.module').then( m => m.DeveloperPageModule)
  },
  {
    path: 'skill',
    loadChildren: () => import('./pages/skill/skill.module').then( m => m.SkillPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

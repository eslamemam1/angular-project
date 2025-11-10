import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { ContactUs } from './contact-us/contact-us';
import { NotFound } from './not-found/not-found';
import { ApexTreeView } from './apex-tree-view/apex-tree-view';

export const routes: Routes = [
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'about',
    component: About,
  },
  {
    path: 'contact-us',
    component: ContactUs,
  },
  {
    path: 'not-found',
    component: NotFound,
  },
  {
    path: 'apex-tree-view',
    component: ApexTreeView,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

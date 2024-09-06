import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutsComponent } from './layouts/blank-layouts/blank-layouts.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authGuard } from './core/guards/auth.guard';
import { logedGuard } from './core/guards/loged.guard';

export const routes: Routes = [

  {
    path: '', component: AuthLayoutComponent, canActivate: [logedGuard], children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) },
      { path: 'register', loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent) },
      { path: 'forget', loadComponent: () => import('./components/forgetpassword/forgetpassword.component').then(m => m.ForgetpasswordComponent) }
    ]
  },

  {
    path: '', component: BlankLayoutsComponent, canActivate: [authGuard], children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) },
      { path: 'products', loadComponent: () => import('./components/product/product.component').then(m => m.ProductComponent) },
      { path: 'cart', loadComponent: () => import('./components/cart/cart.component').then(m => m.CartComponent) },
      { path: 'brands', loadComponent: () => import('./components/brands/brands.component').then(m => m.BrandsComponent) },
      { path: 'categories', loadComponent: () => import('./components/categories/categories.component').then(m => m.CategoriesComponent) },
      { path: 'details/:id', loadComponent: () => import('./components/details/details.component').then(m => m.DetailsComponent) },
      { path: 'specific/:id', loadComponent: () => import('./components/specific-category/specific-category.component').then(m => m.SpecificCategoryComponent) },
      { path: 'specificBrand/:id', loadComponent: () => import('./components/specific-brand/specific-brand.component').then(m => m.SpecificBrandComponent) },
      { path: 'wishlist', loadComponent: () => import('./components/wishlist/wishlist.component').then(m => m.WishlistComponent) },
      { path: 'allorders', loadComponent: () => import('./components/allorders/allorders.component').then(m => m.AllordersComponent) },
      { path: 'orders/:id', loadComponent: () => import('./components/orders/orders.component').then(m => m.OrdersComponent) },
    ]
  },

  { path: '**', component: NotfoundComponent },

];

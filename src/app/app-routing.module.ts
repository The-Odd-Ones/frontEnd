import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/client/home/home.component";
import {
  AuthGuardClient,
  AuthGuardGuest,
  AuthGuardAdmin
} from "./guards/auth.guard";
import { EntranceComponent } from "./components/guest/entrance/entrance.component";
import { ClientNavComponent } from "./components/client/client-nav/client-nav.component";
import { ProfileComponent } from "./components/client/profile/profile.component";
import { DashboardComponent } from "./components/dashboard/main/main.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { PostComponent } from "./components/client/post/post.component";
import { EventComponent } from "./components/client/event/event.component";
import { SearchComponent } from "./components/client/search/search.component";

const routes: Routes = [
  { path: "", component: EntranceComponent, canActivate: [AuthGuardGuest] },
  {
    path: "",
    component: ClientNavComponent,
    canActivate: [AuthGuardClient],
    children: [
      { path: "home", component: HomeComponent },
      { path: "posts/:id", component: PostComponent },
      { path: "profile", component: ProfileComponent },
      { path: "users/:username", component: ProfileComponent },
      { path: "events/:id", component: EventComponent },
      { path: "settings", component: SettingsComponent }
    ]
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuardAdmin]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
//

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/client/home/home.component";
import {
  AuthGuardClient,
  AuthGuardGuest,
  AuthGuardAdmin,
  AuthGuardVerify,
  AuthGuardCommunity
} from "./guards/auth.guard";
import { EntranceComponent } from "./components/guest/entrance/entrance.component";
import { ClientNavComponent } from "./components/client/client-nav/client-nav.component";
import { ProfileComponent } from "./components/client/profile/profile.component";
import { DashboardComponent } from "./components/dashboard/main/main.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { PostComponent } from "./components/client/post/post.component";
import { EventComponent } from "./components/client/event/event.component";
import { VerifyComponent } from "./components/shared/verify/verify.component";
import { CommunityComponent } from "./components/community/community.component";
import { NotfoundComponent } from './components/shared/notfound/notfound.component';

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
      { path: "settings", component: SettingsComponent },
      { path: "404", component:NotfoundComponent }
    ]
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuardAdmin]
  },
  {
    path: "verify",
    component: VerifyComponent,
    canActivate: [AuthGuardVerify]
  },
  {
    path: "community",
    component: CommunityComponent,
    canActivate: [AuthGuardCommunity]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
//

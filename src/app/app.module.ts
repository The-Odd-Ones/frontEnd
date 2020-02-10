import { BrowserModule } from "@angular/platform-browser";

import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { EntranceComponent } from "./components/guest/entrance/entrance.component";
import { HomeComponent } from "./components/client/home/home.component";
import { DashboardComponent } from "./components/dashboard/main/main.component";
import { HttpClientModule } from "@angular/common/http";
import { ClientNavComponent } from "./components/client/client-nav/client-nav.component";
import { ProfileComponent } from "./components/client/profile/profile.component";
import { FormsModule } from "@angular/forms";
import { SidebarComponent } from "./components/client/sidebar/sidebar.component";
import { AgmCoreModule } from "@agm/core";
import { MapsComponent } from "./components/shared/maps/maps.component";
import { ValidateService } from "./services/validate/validate.service";
import { PostsComponent } from "./components/client/posts/posts.component";
import { PostComponent } from "./components/client/post/post.component";
import { SettingsComponent } from "./components/settings/settings.component";

import { BubblePostComponent } from './components/client/bubble-post/bubble-post.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { RecommendationsComponent } from './components/client/recommendations/recommendations.component';
import { ReactiveFormsModule } from "@angular/forms";
import { SearchService } from "./services/search.service";
import { EventsComponent } from "./components/client/events/events.component";
import { EventComponent } from "./components/client/event/event.component";
import { SafePipe } from "./pipes/safe.pipe";
import { SearchComponent } from "./components/client/search/search.component";
@NgModule({
  declarations: [
    AppComponent,
    EntranceComponent,
    HomeComponent,
    DashboardComponent,
    ClientNavComponent,
    ProfileComponent,
    SidebarComponent,
    MapsComponent,
    PostsComponent,
    PostComponent,
    SidebarComponent,
    SettingsComponent,

    EventsComponent,
    EventComponent,
    SafePipe,
    BubblePostComponent,
    DateAgoPipe,
    RecommendationsComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyAxdE8_g6U861UeDLFIi5h5QybzLyaozwY"
    }),
    ReactiveFormsModule  ],

  providers: [ValidateService, SafePipe],
  bootstrap: [AppComponent]
})
export class AppModule {}

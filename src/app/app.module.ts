import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NewsApiService } from './services/news-api.service';
import { CommentService } from './services/comment.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { NewsArticlesComponent } from './components/news-articles/news-articles.component';

@NgModule({
  declarations: [AppComponent, NewsArticlesComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonToggleModule,
    ShareButtonsModule,
    ShareIconsModule,
    ToastrModule.forRoot()
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
  ],
  providers: [NewsApiService,CommentService],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InMemoryDataService } from './in-memory-data.service';
import { HomeComponent } from './home/home.component';

@NgModule({ declarations: [AppComponent, HomeComponent],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService)], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}

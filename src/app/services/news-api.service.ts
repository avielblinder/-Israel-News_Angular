import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NewsApiService {
  constructor(private http: HttpClient) {}

  init20() {
    return this.http.get(environment.apiUrl + '/api/20il', {
      responseType: 'text',
    });
  }

  initSrugim() {
    return this.http.get(environment.apiUrl + '/api/srugim', {
      responseType: 'text',
    });
  }

  init0404() {
    return this.http.get(environment.apiUrl + '/api/0404', {
      responseType: 'text',
    });
  }

  initMako() {
    return this.http.get(environment.apiUrl + '/api/mako', {
      responseType: 'text',
    });
  }

  initYnet() {
    return this.http.get(environment.apiUrl + '/api/ynet', {
      responseType: 'text',
    });
  }

  initGlobes() {
    return this.http.get(environment.apiUrl + '/api/globes', {
      responseType: 'text',
    });
  }

  initCalcalist() {
    return this.http.get(environment.apiUrl + '/api/calcalist', {
      responseType: 'text',
    });
  }

  initWalla() {
    return this.http.get(environment.apiUrl + '/api/walla', {
      responseType: 'text',
    });
  }

  initOne() {
    return this.http.get(environment.apiUrl + '/api/one', {
      responseType: 'text',
    });
  }

  initHaaretz() {
    return this.http.get(environment.apiUrl + '/api/haaretz', {
      responseType: 'text',
    });
  }

  initMaariv() {
    return this.http.get(environment.apiUrl + '/api/maariv', {
      responseType: 'text',
    });
  }

  initIsraelHayom() {
    return this.http.get(environment.apiUrl + '/api/israelhayom', {
      responseType: 'text',
    });
  }

  initTheMarker() {
    return this.http.get(environment.apiUrl + '/api/themarker', {
      responseType: 'text',
    });
  }

  initInn7() {
    return this.http.get(environment.apiUrl + '/api/inn', {
      responseType: 'text',
    });
  }

  initHayadan() {
    return this.http.get(environment.apiUrl + '/api/hayadan', {
      responseType: 'text',
    });
  }

  initHwzone() {
    return this.http.get(environment.apiUrl + '/api/hwzone', {
      responseType: 'text',
    });
  }

  initIce() {
    return this.http.get(environment.apiUrl + '/api/ice', {
      responseType: 'text',
    });
  }

  initNews1() {
    return this.http.get(environment.apiUrl + '/api/news1', {
      responseType: 'text',
    });
  }

  initKan() {
    return this.http.get(environment.apiUrl + '/api/kan', {
      responseType: 'text',
    });
  }

  initSearch(source: string) {
    return this.http.get(environment.apiUrl + '/api/' + source, {
      responseType: 'text',
    });
  }
}

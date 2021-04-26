import { Component, HostListener } from '@angular/core';
import { NewsApiService } from './services/news-api.service';
import { HelperService } from './services/helper.service';
import * as xml2js from 'xml2js';
import { forkJoin } from 'rxjs';
import { CommentService } from './services/comment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @HostListener('window:scroll', ['$event']) onScroll(event: any) {
    if (event.target.scrollingElement.scrollTop > 2500) {
      this.flag = true;
    }
  }

  newsArticles: Array<any> = [];
  mSources: Array<any> = [];
  data: Array<any> = this.newsArticles;
  parser = new xml2js.Parser();
  flag: boolean = false;
  comments: any = [];
  categories: Array<string> = [
    'חדשות',
    'ספורט',
    'כלכלה',
    'בריאות',
    'תרבות',
    'ביטחון',
    'כלכלה',
    'פוליטיקה',
    'קורונה',
  ];

  constructor(
    private newsapi: NewsApiService,
    public helper: HelperService,
    private commentS: CommentService
  ) {}

  searchArticles(sourceId: any) {
    this.flag = false;
    this.newsArticles = [];
    this.newsapi.initSearch(sourceId).subscribe((data) => {
      this.parser.parseString(data, (err: any, result: any) => {
        if (err) return err.message;
        this.helper.conc(result.rss.channel[0].item);
        for (let i = 0; i < result.rss.channel[0].item.length; i++) {
          this.newsArticles.push(result.rss.channel[0].item[i]);
        }
        window.scroll(0, 0);
      });
    });
  }

  orderByCategory(category: string, array: Array<any>) {
    if (category == 'חדשות') {
      this.mSources = [];
      this.newsArticles = [];
      return this.ngOnInit();
    }
    let data: Array<any> = [];
    array.forEach((item: any) => {
      let prop: any;
      for (prop in item) {
        if (prop.category) {
          prop.category.forEach((one: any) => {
            if (one == category) data.push(item);
          });
        }
        if (prop.Tags && prop.Tags[0].includes(category)) data.push(item);
      }
      if (item.title && item.title[0].includes(category)) data.push(item);
      if (item.AllDescription && item.AllDescription.includes(category))
        data.push(item);
    });
    return (this.newsArticles = data);
  }

  refresh() {
    this.newsArticles = [];
    this.mSources = [];
    this.ngOnInit();
  }

  ngOnInit() {
    this.flag = false;

    let dataSources = [
      this.newsapi.initIsraelHayom(),
      this.newsapi.init20(),
      this.newsapi.initInn7(),
      this.newsapi.initSrugim(),
      // this.newsapi.initKan(),
      this.newsapi.init0404(),
      this.newsapi.initIce(),
      this.newsapi.initMako(),
      this.newsapi.initYnet(),
      this.newsapi.initWalla(),
      this.newsapi.initMaariv(),
      this.newsapi.initNews1(),
      this.newsapi.initHaaretz(),
      this.newsapi.initHayadan(),
      this.newsapi.initHwzone(),
      this.newsapi.initOne(),
      this.newsapi.initGlobes(),
      this.newsapi.initCalcalist(),
      this.newsapi.initTheMarker(),
    ];

    forkJoin(dataSources).subscribe((data) => {
      for (let i = 0; i < dataSources.length; i++) {
        this.parser.parseString(data[i], (err: any, result: any) => {
          if (err) return err.message;
          if (result.rss)
            this.helper.conc(result.rss.channel[0].item, this.newsArticles);
          this.mSources.push(result.rss.channel[0].item[0].cleanUrl);
        });
      }
    });
    const posts = this.commentS.getPosts();
    posts.subscribe((res) => (this.comments = res));
  }
}

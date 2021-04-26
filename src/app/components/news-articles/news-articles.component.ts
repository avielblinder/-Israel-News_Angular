import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';

@Component({
  selector: 'app-news-articles',
  templateUrl: './news-articles.component.html',
  styleUrls: ['./news-articles.component.scss'],
})
export class NewsArticlesComponent {
  @Input() newsArticles!: Array<any>;
  @Input() flag!: boolean;
  @Input() comments!: any;
  @ViewChild('name') name!: ElementRef;
  @ViewChild('text') article!: ElementRef;
  data: Array<any> = [];

  constructor(private comment: CommentService, private toastr: ToastrService) {}
  typeOf(value: any) {
    return typeof value;
  }

  handleClick(e: any) {
    const btn = e.target.parentElement;
    const mat = btn.parentElement;
    const container = mat.parentElement;
    if (e.target.textContent == 'הצג פחות') {
      container.classList.add('read-less');
      e.target.textContent = 'הצג עוד';
      console.log();
    } else {
      container.classList.remove('read-less');
      e.target.textContent = 'הצג פחות';
    }
  }

  handleCommentBox(id: number) {
    $('#' + id.toString()).toggle(500);
  }

  handleSortArray(): any {
    for (let i = 0; i < this.newsArticles.length; i++) {
      if (i < 10) this.data[i] = this.newsArticles[i];
    }
    this.newsArticles.sort((a: any, b: any) => {
      return (
        <any>new Date(b.pubDate[0]).getTime() -
        <any>new Date(a.pubDate[0]).getTime()
      );
    });
  }

  handleSuccess(id: number) {
    this.article.nativeElement.value = '';
    this.name.nativeElement.value = '';
    this.toastr.success('.הפוסט התווסף בהצלחה', '');
    $('#' + id.toString()).toggle(500);
    const posts = this.comment.getPosts();
    posts.subscribe((res) => (this.comments = res));
  }

  handleFailed(error: any) {
    const errTitle = error.message
      .replace('Comment validation failed: ', '')
      .replace('name:', '')
      .replace('article:', '')
      .replace(',', '</br>');
    this.toastr.error(errTitle, '', { enableHtml: true });
  }

  handlePostNews(event: Event, newsId: number, name: string, article: string) {
    event.preventDefault();
    this.comment
      .postComment({
        newsId,
        name,
        article,
      })
      .subscribe(
        (res: any) => {
          if (res) {
            if (res.errors) return this.handleFailed(res);
          }
          this.handleSuccess(newsId);
        },
        (err) => console.log(err)
      );
  }

  ngOnChanges() {
    this.data = [];
    if (this.flag) {
      for (let i = 0; i < this.newsArticles.length; i++) {
        this.data[i] = this.newsArticles[i];
      }
    }
    this.newsArticles.sort((a: any, b: any) => {
      return (
        <any>new Date(b.pubDate[0]).getTime() -
        <any>new Date(a.pubDate[0]).getTime()
      );
    });
  }
}

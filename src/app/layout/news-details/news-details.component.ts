import { LayoutService } from './../layout.service';
import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from '../../Auth/localStorageLogin/local-storage.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss']
})
export class NewsDetailsComponent implements OnInit {

  latestNews: any[] = [];
  AllNews: any[] = [];
  news: any[] = [];
  displayBasic: boolean;
  isLogged: boolean;
  displayNotNews:boolean=false;
  Alltags: any[] = [];
  newsID:string;
  constructor(private service: LayoutService,
    public localStorage: LocalStorageService,
              private route: ActivatedRoute ) {}

    ngOnInit(): void {
      this.route.paramMap.subscribe(params =>
        this.newsID = params.get('id'));

    this.isLogged = this.localStorage.getCurrentUser();

    this.service.getLatestNews().subscribe((response) => {
      if (response['success'] === true) {
        this.latestNews = response['data'];
      }
    });

    this.service.getAllTagNews().subscribe((response) => {
      if (response['success'] === true) {
        this.Alltags = response['data'];
      }
    });

    this.service.getNews(this.newsID).subscribe((response) => {
      if (response['success'] === true) {
        this.news = response['data'];
      }
    });

  }
}

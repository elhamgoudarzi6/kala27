import { Injectable } from '@angular/core';
import {Post} from './post';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  textSearch: any = '';
  resultSearchBox: any;
  searchOption = [];
  public postsData: Post[];
  postUrl = 'https://api.kala27.com/api/v1/user/getAllProduct';
  constructor(private http: HttpClient) {
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postUrl);
  }
  getAllCategories(): any {
    return this.http.get(
      'https://api.kala27.com/api/v1/admin/getAllCategory'
    );
  }

  allProductByCategory(data:any): any {
    return this.http.post(
      'https://api.kala27.com/api/v1/user/allProductByCategory',data
    );
  }
  allProductBySearch(data: any): any{
    return this.http.post('https://api.kala27.com/api/v1/user/advanceSearchProduct', data);
  }
  getSendCost(): any{
    return this.http.get('https://api.kala27.com/api/v1/user/getSendCost');
  }
  filteredListOptions(): any[] {
    const posts = this.postsData;
    const filteredPostsList = [];
    for (const post of posts) {
      for (const options of this.searchOption) {
        // @ts-ignore
        if (options.title === post.title) {
          // @ts-ignore
          filteredPostsList.push(post);
        }
      }
    }

    return filteredPostsList;
  }
}

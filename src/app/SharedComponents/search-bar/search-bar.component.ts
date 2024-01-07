import {Component, ElementRef,EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {Post} from '../post';
import {SearchService} from '../search.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  allPosts: Post[];
  autoCompleteList: any[];
  productSearch: any;
  textSearch: any;
  @ViewChild('autocompleteInput') autocompleteInput: ElementRef;
  @Output() onSelectedOption = new EventEmitter();

  constructor(public dataService: SearchService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.dataService.getPosts().subscribe(posts => {
      this.allPosts = posts['data'];
    });

    // when user types something in input, the value changes will come through this
    this.myControl.valueChanges.subscribe(userInput => {
      this.autoCompleteExpenseList(userInput);
    });
  }

  private autoCompleteExpenseList(input): void {
    const categoryList = this.filterCategoryList(input);
    this.autoCompleteList = categoryList;
  }

  filterCategoryList(val): any {
    const categoryList = [];
    if (typeof val !== 'string') {
      return [];
    }
    if (val === '' || val === null) {
      return [];
    }
    return val ? this.allPosts.filter(s => s.title.toLowerCase().indexOf(val.toLowerCase()) != -1)
      : this.allPosts;
  }

  displayFn(post: Post): any {
    let k = post ? post.title : post;
    return k;
  }

  filterPostList(event): void {
    const posts = event.source.value;
    this.productSearch = event.source.value['_id'];
    if (!posts) {
      this.dataService.searchOption = [];
    } else {

      // @ts-ignore
      this.dataService.searchOption.push(posts);
      this.onSelectedOption.emit(this.dataService.searchOption);
      this.router.navigate(['product-detail', this.productSearch]);

    }
    this.focusOnPlaceInput();
  }

  // removeOption(option): void {
  //
  //   const index = this.dataService.searchOption.indexOf(option);
  //   if (index >= 0) {
  //     this.dataService.searchOption.splice(index, 1);
  //   }
  //   this.focusOnPlaceInput();
  //   this.onSelectedOption.emit(this.dataService.searchOption);
  // }

  // focus the input field and remove any unwanted text.
  focusOnPlaceInput(): void {
    this.autocompleteInput.nativeElement.focus();
    this.autocompleteInput.nativeElement.value = '';
  }

  advenceSearch(): any {
    this.dataService.textSearch = this.textSearch;
    const data = {
      title: this.textSearch
    };
    this.dataService.allProductBySearch(data).subscribe((response) => {
      if (response['success'] === true) {
        this.dataService.resultSearchBox = response['data'];
        this.router.navigate(['products/0/0']);
      }
    });
  }

}

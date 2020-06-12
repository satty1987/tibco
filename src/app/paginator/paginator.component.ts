import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, OnChanges {

  @Input() length: number;
  @Input() pageSize: number;
  @Input() pageSizeOptions: number[];
  @Output() pageSizeUpdate = new EventEmitter<any>();


  // MatPaginator Output
  pageEvent: PageEvent;
  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges){

  }
  // MatPaginator Inputs

  updatePagination(event){
    console.log(event);
    this.pageSizeUpdate.emit(event);
  }
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
}

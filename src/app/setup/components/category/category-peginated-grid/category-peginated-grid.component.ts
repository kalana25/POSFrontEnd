import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RequestData } from 'src/app/core/request-data';
import { ResponseData } from 'src/app/core/response-data';
import { Category } from 'src/app/setup/models/category';
import { CategoryService } from 'src/app/setup/services/category.service';

@Component({
  selector: 'app-category-peginated-grid',
  templateUrl: './category-peginated-grid.component.html',
  styleUrls: ['./category-peginated-grid.component.css']
})
export class CategoryPeginatedGridComponent implements OnInit {
  @Output() output:EventEmitter<Category> = new EventEmitter();

  categoryResponse:ResponseData<Category>;
  categoryRequest:RequestData;


  constructor(
    public categoryService:CategoryService,
    private toasterService:ToastrService) { }

  ngOnInit() {
    this.categoryRequest = new RequestData();
    this.categoryRequest.page=1;
    this.categoryRequest.pageSize=9;
    this.getCategoryPagination(this.categoryRequest);
  }

  private getCategoryPagination(categoryRequest:RequestData) {
    // this.IsLoading = true;
    this.categoryService.pagination(categoryRequest)
    .subscribe(res=>{
      this.categoryResponse = res;
      // this.IsLoading = false;
      console.log(res);
    },err=>{
      // this.IsLoading = false;
      this.toasterService.error("Please check the internet connection","Something Bad happen")
      console.error(err);
    })
  }

  public OnCateogyClick(ca:Category) {
    this.output.emit(ca);
  }

}

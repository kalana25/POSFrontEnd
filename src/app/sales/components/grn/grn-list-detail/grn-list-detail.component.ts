import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoodReceivedNoteService } from 'src/app/sales/services/good-received-note.service';
import { GrnFullInfo } from 'src/app/sales/models/grn-fullInfo';

@Component({
  selector: 'app-grn-list-detail',
  templateUrl: './grn-list-detail.component.html',
  styleUrls: ['./grn-list-detail.component.css']
})
export class GrnListDetailComponent implements OnInit {

  public Id:number;
  public IsLoading:boolean;
  public result:GrnFullInfo;
  // public displayedColumns: string[] = ['code', 'name', 'barcode','unit','quantity','price','total'];

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private grnService:GoodReceivedNoteService
  ) { }

  ngOnInit() {
    this.IsLoading = true;
    this.Id = Number(this.route.snapshot.paramMap.get('id'));
    this.grnService.getWithFullInfo(this.Id)
    .subscribe(res=>{
      this.result = res;

      this.result.comment;

      this.IsLoading = false;
    },err=>{
      console.error(err);
    })
  }

}

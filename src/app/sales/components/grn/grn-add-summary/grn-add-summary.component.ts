import { Component, OnInit,Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GrnItemExpansionPanelModel } from 'src/app/sales/models/grn-item-expansion-panel';
import { DialogData } from 'src/app/core/dialog-data';
import { MatDialog } from '@angular/material';
import { DialogContentComponent } from 'src/app/shared/components/dialog-content/dialog-content.component';
import { Router, ActivatedRoute } from '@angular/router';
import { GrnSaveConfirmationAction } from '../dialog-action/grn-save-confirmation-action';
import { GoodReceivedNoteService } from 'src/app/sales/services/good-received-note.service';
import { GrnSave, GrnDetailSave } from 'src/app/sales/models/grn-save';

@Component({
  selector: 'app-grn-add-summary',
  templateUrl: './grn-add-summary.component.html',
  styleUrls: ['./grn-add-summary.component.css']
})
export class GrnAddSummaryComponent implements OnInit {
  @Input() public GrnHeader:FormGroup;
  @Input() public GrnItems:Array<GrnItemExpansionPanelModel>;
  @Input() public AdditionalItems:Array<GrnItemExpansionPanelModel>;

  constructor(
    private dialog:MatDialog,
    private router:Router,
    private route:ActivatedRoute,
    private grnService:GoodReceivedNoteService
  ) { }

  ngOnInit() {
  }

  public OnFinishClick() {
    let confrimData = new DialogData();
    confrimData.buttonCancel = true;
    confrimData.buttonConfim = true;
    confrimData.dialogTitle = "Inventory Update";
    confrimData.dialogContent = "Please make sure following good receipt note information is correct ?";
    confrimData.action = new GrnSaveConfirmationAction(this.grnService,this.getGrnSaveModel());

    let dialogRef = this.dialog.open(DialogContentComponent,
      {
        width:'500px',
        height: '200px',
        data:confrimData
      });
    dialogRef.afterClosed().subscribe(res=>{
      this.router.navigate(['../grn-list'],{relativeTo:this.route});
    })

  }

  private getGrnSaveModel():GrnSave {
    const saveModel =  new GrnSave();
    saveModel.code = this.GrnHeader.get('code').value;
    saveModel.comment = this.GrnHeader.get('comment').value;
    saveModel.grnDate = this.GrnHeader.get('grnDate').value;
    saveModel.purchaseOrderId = this.GrnHeader.get('purchaseOrderId').value;
    saveModel.items = [];
    this.GrnItems.forEach(grnItem => {
      const grnDetailSave = new GrnDetailSave();
      grnDetailSave.quantity = grnItem.grnItemFormGroup.get('quantity').value;
      grnDetailSave.unitId =grnItem.grnItemFormGroup.get('unitId').value;
      grnDetailSave.sellingPrice =Number(grnItem.grnItemFormGroup.get('sellingPrice').value);
      grnDetailSave.isBaseUnit =grnItem.purchasOrderDetail.isBaseUnit;
      grnDetailSave.expireDate =(grnItem.grnItemFormGroup.get('expireDate').value==="") ? null:grnItem.grnItemFormGroup.get('expireDate').value;
      grnDetailSave.purchaseOrderDetailId =grnItem.purchasOrderDetail.id;
      saveModel.items.push(grnDetailSave);
    });
    return saveModel;
  }





}

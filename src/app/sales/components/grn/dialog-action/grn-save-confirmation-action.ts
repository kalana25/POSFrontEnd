import { IAction } from 'src/app/core/Iaction';
import { GoodReceivedNoteService } from 'src/app/sales/services/good-received-note.service';
import { Observable } from 'rxjs';
import { GrnSave } from 'src/app/sales/models/grn-save';


export class GrnSaveConfirmationAction implements IAction {

    constructor(
        public grnService:GoodReceivedNoteService,
        public saveModel:GrnSave) {
    }
    
    Execute(): Observable<any> {
        return this.grnService.add(this.saveModel)
    }
}
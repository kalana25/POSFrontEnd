import { IAction } from './Iaction'
export class DialogData{
    public dialogContent:string;
    public dialogTitle:string;
    public buttonConfim:boolean;
    public buttonCancel:boolean;
    public action:IAction;
}
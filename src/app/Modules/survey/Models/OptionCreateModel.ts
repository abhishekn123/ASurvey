import { OptionServerData } from './../questions/questions.component';
export class CreateOptionModel{
    public sM_id:number;

    public OptionMaster:OptionServerData;

  }
  export class OptionMaster{
    constructor(qM_Id:number,options:string,oM_Id=0){
       this.qM_Id=qM_Id;
       this.options=options;
       this.questionMaster=null;
       this.oM_Id=oM_Id;
    }
    public oM_Id:number;
    public questionMaster:Object;
    public qM_Id:number;
    public options:string
  }
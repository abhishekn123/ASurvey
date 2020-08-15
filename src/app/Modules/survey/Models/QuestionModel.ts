import { OptionMaster } from '.././Models/OptionCreateModel';

export  class QuestionMaster
{
     
    constructor(QM_Id:number,QM_QuestionName:string,OptionType:string, SM_Id:number)
    {
        this.QM_Id=QM_Id;
        this.QM_QuestionName=QM_QuestionName;
        this.OptionType=OptionType;
        this.SurveyMaster=null;
        this.SM_Id=SM_Id;
    }
    public  QM_Id?:number ;

    public  QM_QuestionName:string;
    
     public  OptionType:string;

    public  SurveyMaster:Object;

    public SM_Id:number;
}
export class QuestionViewModel
{
    constructor(questionMaster:QuestionMaster,optionMaster:OptionMaster[],sM_Id:number)
    {
      this.questionMaster=questionMaster;
      this.optionMaster=optionMaster;
      this.sM_Id=sM_Id;
    }
    public sM_Id:number ;
    public questionMaster:QuestionMaster;
    public optionMaster:OptionMaster[];
}
export class SurveyMaster {
    constructor(  SM_Id: number,

        SM_Name: string,
    
        StartDate: string,
    
        EndDate: string,
    
        Departmaster: Object,
    
        DM_Id: number)
    {
     this.SM_Id=SM_Id;
     this.SM_Name=SM_Name;
     this.StartDate=StartDate;
     this.EndDate=EndDate;
     this.Departmaster=Departmaster;
     this.DM_Id=DM_Id; 
    }
    SM_Id: number;

    SM_Name: string;

    StartDate:string;

    EndDate: string;

    Departmaster: Object;

    DM_Id: number;
}

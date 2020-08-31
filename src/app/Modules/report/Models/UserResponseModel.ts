export class UserResponse
{
    public employeeCode:string ;
    public email:string;
    public surveyName:string
    public question:string;
    public answer:string;
    public respondedDate:string;
    constructor(employeeCode:string, email:string, surveyName:string, question:string,answer:string,respondedDate:string)
    {
      this.email=email;
      this.employeeCode=employeeCode;
      this.surveyName=surveyName;
      this.question=question;
      this.answer=answer;
      this.respondedDate=respondedDate;
    }
} 
export class CompletionReport
{
    public  employeeCode:string 

    public  Email:string

    public  SurveyName:string

    public Status:string
    constructor( employeecode:string ,Email:string,SurveyName:string,Status:string)
    {
   this.employeeCode=employeecode,
   this.Email=Email,
   this.SurveyName=SurveyName,
   this.Status=status
    }
}
export class QuestionMaster{
    constructor(   public OptionType: string,
        public QM_QuestionName: string){}
      
}

export class OptionMaster{
    constructor(
        public Options: string
    ){}
    
}
export class QuestionViewModel
{
    constructor(public QuestionMaster:QuestionMaster,public optionMaster:OptionMaster[] )
    {

    }
}

export class ListQuestionViewModel
{
    constructor(public QuestionViewModelList:QuestionViewModel[])
    {

    }
}



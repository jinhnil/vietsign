import { Base } from "./base";

export interface Question {
  id: number;
  content: string;
  type: string;
}

class QuestionModelClass extends Base {
  constructor() {
    super("questions");
  }
}

const QuestionModel = new QuestionModelClass();
export default QuestionModel;

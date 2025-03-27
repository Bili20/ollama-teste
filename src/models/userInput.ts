import { AnswersDto } from "./dto/answers.dto.js";

export interface UserInput {
  context: string;
  answers: AnswersDto;
}

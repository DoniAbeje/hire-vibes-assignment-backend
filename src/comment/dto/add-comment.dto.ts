import { IsNotEmpty } from 'class-validator';

export class AddCommentDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly comment: string;
}

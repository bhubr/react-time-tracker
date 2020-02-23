import { IsString, IsInt } from "class-validator";
import { Workspace } from "../workspace.entity";

export class CreateProjectDto {
  readonly workspace: Workspace;

  @IsString()
  readonly title: string;
}

export class CreateProjectBodyDto {
  // Won't be part of the project entity, but a relationship
  // with a workspace will be created
  @IsInt()
  readonly workspaceId: number;

  @IsString()
  readonly title: string;
}
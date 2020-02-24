import { Test, TestingModule } from '@nestjs/testing';
import { DailySheetController } from './daily-sheet.controller';

describe('DailySheet Controller', () => {
  let controller: DailySheetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DailySheetController],
    }).compile();

    controller = module.get<DailySheetController>(DailySheetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

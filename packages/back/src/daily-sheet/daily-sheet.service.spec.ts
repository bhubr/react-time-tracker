import { Test, TestingModule } from '@nestjs/testing';
import { DailySheetService } from './daily-sheet.service';

describe('DailySheetService', () => {
  let service: DailySheetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DailySheetService],
    }).compile();

    service = module.get<DailySheetService>(DailySheetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

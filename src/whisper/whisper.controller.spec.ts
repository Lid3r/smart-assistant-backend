import { Test, TestingModule } from '@nestjs/testing';
import { WhisperController } from './whisper.controller';
import { WhisperService } from './whisper.service';

describe('WhisperController', () => {
  let controller: WhisperController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WhisperController],
      providers: [WhisperService],
    }).compile();

    controller = module.get<WhisperController>(WhisperController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

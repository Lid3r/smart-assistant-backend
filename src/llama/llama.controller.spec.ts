import { Test, TestingModule } from '@nestjs/testing';
import { LlamaController } from './llama.controller';
import { LlamaService } from './llama.service';

describe('LlamaController', () => {
  let controller: LlamaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LlamaController],
      providers: [LlamaService],
    }).compile();

    controller = module.get<LlamaController>(LlamaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

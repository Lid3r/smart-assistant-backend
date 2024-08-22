import { Controller, Get } from '@nestjs/common';
import { WhisperService } from './whisper.service';
import { Public } from 'src/decorators';

@Controller('whisper')
export class WhisperController {
  constructor(private readonly whisperService: WhisperService) {}

  @Public()
  @Get()
  async processFile() {
    this.whisperService
      .processFile('assets/panie.mp3')
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

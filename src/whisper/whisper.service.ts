import { Injectable } from '@nestjs/common';
import { log } from 'console';
//import OpenAI from 'openai';
//@ts-ignore
//import { whisper } from 'whisper-node';

const modelOptions = {
  modelName: 'base.en',
  whisperOptions: {
    language: 'auto', // default (use 'auto' for auto detect)
  },
};

@Injectable()
export class WhisperService {
  constructor() {}

  async processFile(path: string) {
    //const transcript = await whisper('assets/panie.mp3');
    //log(transcript);
  }
}

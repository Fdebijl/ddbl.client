import 'jasmine';

declare type Goodness = 'good' | 'bad' | 'neutral';
declare type ToastMessage = {
  message: string;
  goodness: Goodness;
  timeout: number;
}
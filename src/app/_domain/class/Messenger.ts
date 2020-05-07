export class Messenger {
  message: string;
  messageGoodness: 'good' | 'bad' | 'neutral';
  messageShow = true;
  private defaultMessage: string;

  constructor(message?: string) {
    this.message = this.defaultMessage = message;
  }

  clearMessage(): void {
    this.message = '';
  }

  showMessage(type: 'bad' | 'good' | 'neutral', message: string, stacking = false, timeout = 15): void {
    if (stacking) {
      this.message += `${message ? '\n\n' : ''}${message}`
    } else {
      this.message = message;
    }

    this.messageGoodness = type;
    this.messageShow = true;

    // When stacking error messages, we respect the timeout on the first message
    if (timeout > 0) {
      setTimeout(() => {
        this.messageShow = false;

        setTimeout(() => {
          this.showMessage('neutral', this.defaultMessage, false, 0);
        }, 1500)
      }, timeout * 1000)
    }
  }
}
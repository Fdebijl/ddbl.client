import { browser, by, element } from 'protractor';

export class AppPage {
  navigateToRoot(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  navigateToPage(path: string): Promise<unknown> {
    return browser.get(path) as Promise<unknown>;
  }

  getElementText(selector: string): Promise<string> {
    return element(by.css(selector)).getText() as Promise<string>;
  }
}

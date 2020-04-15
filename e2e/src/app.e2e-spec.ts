/* eslint-disable */

import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('Front-page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display title in header', () => {
    page.navigateToRoot();
    expect(page.getElementText('#dataSystem-title')).toEqual('DataSystem');
  });

  it('should draw main dashboard', () => {
    page.navigateToRoot();
    expect(page.getElementText('.main_title')).toEqual('Vitality Data Catalog');
  })

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});

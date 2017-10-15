import { WodappPage } from './app.po';

describe('wodapp App', () => {
  let page: WodappPage;

  beforeEach(() => {
    page = new WodappPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});

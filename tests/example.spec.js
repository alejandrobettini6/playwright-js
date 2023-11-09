const { test } = require('@playwright/test');
const { Herokuapp } = require('../pages/Herokuapp');
const path = require('path');
const {getRandomSentence} = require('../utils/Utils');

test.describe('Items management', () => {
  let herokuapp;

  test.beforeEach(async ({page}) => {
    herokuapp = new Herokuapp(page);
    await herokuapp.open();
  })

  test('Create a new item', async () => {
    const description = getRandomSentence(7);
    await herokuapp.createNewItem(path.join(__dirname, '..', 'test-data', 'kids.jpg'), description);
  });

  test('Edit the first existing item', async () => {
    await herokuapp.editExistingItem();
  });

  test('Delete the last existing item', async () => {
    await herokuapp.deleteLastItem();
  });

  test('Check existing item with description', async () => {
    await herokuapp.verifyExistingItem('Creators: Matt Duffer, Ross Duffer');
  })

  //Should pass after fix
  test.only('Verify create item button should be disabled without attaching one image file', async () => {
    await herokuapp.completeTextArea(getRandomSentence(1));
    await herokuapp.verifyCreateItemDisabled();
  })

  //Should pass after fix
  test('Verify create items mandatory field with "*required" message', async () => {
    await herokuapp.verifyRequireFields(2);
  })
  
})

test.describe('Check description field', () => {

  let herokuapp;

  test.beforeEach(async ({page}) => {
    herokuapp = new Herokuapp(page);
    await herokuapp.open();
  })

  //Should pass after fix
  test('Check max long in description disable the create item button', async () => {
    const longDescription = 'A'.repeat(301);
    const shortDescription = 'Short description';
    await herokuapp.verifyDisabledItemButton(shortDescription, longDescription, path.join(__dirname, '..', 'test-data', 'kids.jpg'));
  })

  test('Max long description field is 300 characters',  async () => {
    const longDescription = 'A'.repeat(301);
    await herokuapp.verifyDescriptionMaxLength(longDescription);
  })

})

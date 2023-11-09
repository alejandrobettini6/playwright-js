import { expect } from "@playwright/test";
const {isMobile} = require('../utils/Utils')

export class Herokuapp {
    constructor(page){
        this.page = page;

        this.baseUrl = 'http://immense-hollows-74271.herokuapp.com/';
        this.title = "//h1[contains(.,'List of items')]"
        this.textArea = page.locator('//textarea[@name="text"]');
        this.editButton = page.locator("//button[text()='Edit']");
        this.createItemButton = page.getByText('Create Item');
        this.updateButton = page.getByText('Update Item');
        this.deleteButton = page.getByText('Delete');
        this.confirmDelete = page.getByText('Yes, delete it!')
        this.items = page.locator('//p[@class="story ng-binding"]');
        this.mandatoryFields = page.locator('//i[preceding-sibling::label[contains(@for,"input")] and text()="*required"]')
    }

    async open(){

        await this.page.goto(this.baseUrl);
        await this.page.waitForSelector(this.title);

    }

    async uploadFile(path){
        if(await isMobile(this.page) == true){
            await this.page.keyboard.press('End')
        }
        await this.page.setInputFiles('input#inputImage', path);
    }

    async completeTextArea(str){
        await this.textArea.clear();
        await this.textArea.fill(str);
    }

    async createItem(){
        if(await isMobile(this.page) == true){
            await this.page.keyboard.press('End')
        }
        await this.createItemButton.click();
        await this.open();
    }

    async editItem(){
        await this.editButton.first().click();
    }

    async updateItem(){
        await this.updateButton.click();
        await this.open();
    }

    async deleteItem(){
        await this.deleteButton.last().click();
        await this.confirmDelete.click();
        await this.open();
    }

    async verifyCreateItemDisabled(){
        expect(await this.createItemButton.isDisabled()).toBeTruthy();
    }

    async verifyRequireFields(totalFields){
        let fields = await this.mandatoryFields.count()
        expect(fields).toEqual(totalFields);
        for(let i = 0; i < totalFields; i++){
                let message = await this.mandatoryFields.nth(i);
                await expect(await message.isVisible()).toBeTruthy();
                await expect(await message.innerText()).toEqual('*required');
        }
        
    }

    async createNewItem(filePath, description){

        const initalItemsCount = await this.items.count();
        await this.uploadFile(filePath);
        await this.completeTextArea(description);
        await this.createItem();

        //verifications
        await this.page.keyboard.press('End');
        const itemCreated = await this.items.last();
        await expect(itemCreated).toBeTruthy();
        await expect(await itemCreated.innerText()).toEqual(description);
        await expect(await this.items.count()).toBeGreaterThan(initalItemsCount);

    }

    async editExistingItem(){
        
        const originalText = await this.items.first().innerText();
        const newDescription = originalText + ' Edited';
        await this.editItem();
        await this.completeTextArea(newDescription)
        await this.updateItem();

        const newTextDescription = await this.items.first().innerText();
        await expect(originalText == newTextDescription).toBeFalsy();
        await expect(newDescription == newTextDescription).toBeTruthy();
        
    }

    async deleteLastItem(){

        const itemDescription = await this.items.last().innerText();
        const itemInitialCount = await this.items.count();
        await this.deleteItem()

        await expect(await this.items.count()).toBeLessThan(itemInitialCount);
        await expect(await this.items.last().innerText() == itemDescription).toBeFalsy();

    }

    async verifyExistingItem(itemDescription){
        const itemsDescription = await this.items.allInnerTexts();
        let result;
        for(const item of itemsDescription){
            if(item.includes(itemDescription)){
                result = true;
                break;
            };
        }
        await expect(result).toBeTruthy();
    }

    async verifyDisabledItemButton(str1, str2, filePath){

        if(await isMobile(this.page) == true){
            await this.page.keyboard.press('End')
        }
        await this.uploadFile(filePath);
        await this.completeTextArea(str1)
        //await this.page.setInputFiles('input#inputImage', filePath);
        //await this.textArea.fill(str1);
        await expect(await this.createItemButton.isEnabled()).toBeTruthy();
        await this.completeTextArea(str2)
        //await await this.textArea.fill(str2);
        expect(await this.createItemButton.isDisabled()).toBeTruthy();
        
    }

    async verifyDescriptionMaxLength (int){
        if(await isMobile(this.page) == true){
            await this.page.keyboard.press('End')
        }
        await this.completeTextArea(int);
        const areaText = await this.textArea.inputValue();
        expect(areaText.length).toBeLessThan(300);


    }

}
const { faker } = require('@faker-js/faker');

function getRandomSentence(length) {
    let sentence = '';
    for(let i=0; i<=length; i++){
        sentence += faker.word.sample() + ' ';
    }
    return sentence.slice(0, -1);
}

async function isMobile(page){
    const size = await page.viewportSize();
    return size.width <= 600;
}

module.exports = {
    getRandomSentence,
    isMobile
}
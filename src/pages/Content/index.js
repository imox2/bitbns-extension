import { printLine } from './modules/print';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");
// function inContent1() {
//     const el = document.createElement('div');
//     el.style.cssText = 'position:fixed; top:0; left:0; right:0; background:red';
//     el.textContent = 'DIV';
//     document.body.appendChild(el);
//   }

function getDataFromDOM(selector) {
    var domNode = document.querySelector('.overflow-auto');
    console.log("document.all[0]:", document.all[0]);
    console.log("document:", document)
    console.log("domNode:", domNode)
    if (domNode) {
        return domNode;
    }
    return undefined;
}

async function getHTML() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: getDataFromDOM, // see inContent1 in ManifestV2 example above
    });
}

// function getHTML() {
//     return getDataFromDOM();
// }

export { getHTML };
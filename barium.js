/* 
    Barium.js - Easy custom tags for HTML

    by: Noel Nimstad (basyl)
    started: 6/4/23
    last updated: 12/9/23
*/

let regexTagTypes = []; // store all the regex that will be comined later
let regex = ""; // regex to match for all tags <r> ... </r>
const keys = { }; // hold all tags with their new value inside their original tags for the erbium() function
const barium = { tags: [], add: Function.prototype, replace: Function.prototype, initial: Function.prototype, reapply: Function.prototype, addMultiple: Function.prototype }; // the barium object, contains functions and other fun stuff

barium.replace = function(content, tagType)
{
    const targetTag = barium.tags.find(t => t.name === tagType); // find the right tag type to call
    if(!targetTag) 
    {
        console.warn("no tag exists with type " + tagType); // warn if the target tag doesnt exist
        return [content.replace(regex, "$1"), "p"]; // apply default function, nothing happens and content is put inside a <p> tag
    }
    const task = targetTag.func(content.replace(regex, `$${ targetTag.multiplier * 2 }`)); // gets the content inside <r> ... </r>
    if(!task[0] || typeof(task[0]) != "string") throw new Error("no valid content was returned from " + tagType + "'s function"); // make sure that the content returned is valid
    if(!task[1] || typeof(task[1]) != "string") throw new Error("no valid tag type was returned from " + tagType + "'s function"); // make sure that the tag type returned is valid
    return [task[0], task[1]]; // you must return an array containing the updated content, and the new tag prefix
}

barium.initial = function()
{
    regex = new RegExp(regexTagTypes.join("|"), "g"); // build the regex
    const source = document.body.innerHTML.toString(); // get document content as a string 
    let counter = 0; // counter for storing all the keys later
    const updated = source.replace(regex, contents => 
    {
        const originalTag = contents.replace(/<(.*?)>(.*?)<\/(.*?)>/g, "$1")
        const updatedContents = barium.replace(contents, originalTag); // call replace() function
        if(typeof(updatedContents) != "object" || updatedContents.length != 2) throw new Error("replace function didn't return a 2 long array\nreplace() returned: " + updatedContents.join(" | ")); // you must return a string
        const newTag = `<${ updatedContents[1] }>${ updatedContents[0] }</${ updatedContents[1] }>`; // creates the new tag
        keys[counter] = [originalTag, `<${ originalTag }>${ updatedContents[0] }</${ originalTag }>`, newTag]; // store necesary information inside the key
        counter++; // increment counter
        return newTag; // return updated contents
    });

    document.body.innerHTML = updated; // injects updated site
}

barium.reapply = function()
{
    for(const key in keys) // loop through all the keys generated in the initial() function
    {
        const source = document.body.innerHTML.toString(); // get document content as a string
        const updated = barium.replace(keys[key][1], keys[key][0]); // call replace() function
        const newTag = `<${ updated[1] }>${ updated[0] }</${ updated[1] }>`; // creates the new tag
        const originalTag = keys[key][1].replace(/<(.*?)>(.*?)<\/(.*?)>/g, "$1"); // grab the tag type
        document.body.innerHTML = source.replace(keys[key][2], newTag); // inject new content
        keys[key] = [originalTag, `<${ originalTag }>${ updated[0] }</${ originalTag }>`, newTag]; // update key
    }
}

barium.add = function(tag)
{
    if(!tag.name || typeof(tag.name) != "string") throw new Error(`inputted tag doesn't have a tag type or the tag type isn't a string`); // make sure the tag has a name
    if(!tag.func || typeof(tag.func) != "function") throw new Error(`inputted tag doesn't have a tag function or the inputted tag function isn't a function`); // make sure the tag has a function
    regexTagTypes.push(`(<${ tag.name }>(.*?)<\/${ tag.name }>)`); // push the regex to the temporary regex storage
    barium.tags.push(tag); // push the custom tag to the barium object
    const indexOf = barium.tags.indexOf(tag);
    barium.tags[indexOf].multiplier = indexOf + 1;
}

barium.addMultiple = function(tags)
{
    if(!tags || typeof(tags) != "object") throw new Error(`no tags inputted or the function input isn't an array`); // make sure the inputted tags are stored inside an array
    for(let i = 0; i < tags.length; i++)
    {
        barium.add(tags[i]);
    }
}

barium.tag = class // cutsom class for easy tag creation
{
    constructor(name, func)
    {
        if(typeof(name) != "string") throw new Error(`tag type ${ name } isn't a string`); // make sure the tag has a name
        if(typeof(func) != "function") throw new Error(`inputed tag function isn't a function`); // make sure the tag has a function
        this.name = name; // store the name
        this.func = func; // store the function
        this.multiplier = 1;
    }
}

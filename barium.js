/* 
    by: Noel Nimstad (basyl)
    started: 6/4/23
    last updated: 6/4/23
*/

const regex = /<r>(.*?)<\/r>/g; // regex to match for all tags <r> ... </r>
const keys = { }; // hold all tags with their new value inside their original tags for the erbium() function

function replace(content)
{
    const task = content.replace(regex, "$1"); // gets the content inside <r> ... </r>
    return [task.split("").reverse().join(""), "p"]; // you must return an array containing the updated content, and the new tag prefix
}

function initial()
{
    const source = document.body.innerHTML.toString(); // get document content as a string 
    let counter = 0;
    const updated = source.replace(regex, contents => 
    {
        const updatedContents = replace(contents); // call replace() function
        if(typeof(updatedContents) != "object" || updatedContents.length != 2) throw new Error("replace function didn't return a 2 long array\nreplace() returned: " + updatedContents.join(" | ")); // you must return a string
        const newTag = `<${ updatedContents[1] }>${ updatedContents[0] }</${ updatedContents[1] }>`; // creates the new tag
        const originalTag = contents.replace(/<(.*?)>(.*?)<\/(.*?)>/g, "$1")
        keys[counter] = [`<${ originalTag }>${ updatedContents[0] }</${ originalTag }>`, newTag];
        counter++;
        return newTag; // return updated contents
    });

    document.body.innerHTML = updated; // injects updated site
}

initial(); // initial call

function barium()
{
    for(const key in keys) // loop through all the keys generated in the initial() function
    {
        const source = document.body.innerHTML.toString(); // get document content as a string
        const updated = replace(keys[key][0]); // call replace() function
        const newTag = `<${ updated[1] }>${ updated[0] }</${ updated[1] }>`; // creates the new tag
        const originalTag = keys[key][0].replace(/<(.*?)>(.*?)<\/(.*?)>/g, "$1");
        document.body.innerHTML = source.replace(keys[key][1], newTag); // inject new content
        keys[key] = [`<${ originalTag }>${ updated[0] }</${ originalTag }>`, newTag]; // update key
    }
}
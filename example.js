const reverse = new barium.tag("reverse", content => 
{
    return [content.split("").reverse().join(""), "p"];
}); 

const banana = new barium.tag("banana", content => 
{
    return ["🍌" + content + "🍌", "h1"];
});

barium.addMultiple([ reverse, banana ]);
barium.initial();

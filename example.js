const reverse = new barium.tag("r", content => 
{
    return [content.split("").reverse().join(""), "p"];
}); 

const banana = new barium.tag("banana", content => 
{
    return ["🍌", "h1"];
});

barium.addMultiple([ reverse, banana ]);

barium.initial();
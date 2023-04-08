const reverse = new barium.tag("r", content => 
{
    return content.split("").reverse().join("");
}); 

const banana = new barium.tag("banana", content => 
{
    return "🍌";
});

barium.addMultiple([ reverse, banana ]);

barium.initial();
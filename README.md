# Barium.js v0.1b - Easily create HTML tags

*NOTICE: barium is probably really unsafe, it's made with regex for HTML parsin and probably saves the new HTML in a way which will conflict with other code.*
*NOTICE: feel free to fix my code \(:*

## How To:
### Use:

Include either the `barium.min.js` or the `barium.js` file and make sure it is defered or placed at the end of the body.

Then load your own custom tags after barium
```html
<head>
    <script src="barium.min.js" defer></script>
    <!-- barium must be defered -->
    <script src="tags.js" defer></script>
    <!-- load your own tags after barium -->
</head>
<body>
    <my-tag>content</my-tag>
</body>
```

Example tag code:

```js
const myTag = new barium.tag("my-tag", content =>
// the first parameter is the tags name, what barium will search for in the HTML code
// barium will attempt to feed the tags content (even if there is none) into your custom function
{
    const final = content + "!"; 
    // adds an exclamation mark to the tags content
    return [ final, "h1" ];
    // returns the tags new content and the new tag type
});

barium.add(myTag);
// add the tag to barium
```

*Important: Make sure to initialise barium after loading all your tags by calling the barium.initial() function*

```js
barium.initial();
```

### Contribute:

Step 1. Fix my code (thankyou)

Step 2. Make a pull request

Step 3. I merge the code

Step 4. Profit (but no money)
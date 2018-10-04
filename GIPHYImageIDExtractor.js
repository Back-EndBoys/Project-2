function imageIDExtractor(inputURL)
{
    let step1 = "", imageID = "";

    //If user provides us a "GIF Link"
    if(inputURL.substr(inputURL.length-10, inputURL.length) === "/giphy.gif")
    {
        console.log("-=COPY LINK METHOD=-");
        console.log(`Sample Input URL: ${inputURL}`);
        step1 = inputURL.substr(0, inputURL.length-10);
        console.log(`Post-Step 1 Input URL: ${step1}`);
        imageID = step1.substr(30, step1.length);
        console.log(`Image ID: ${imageID}`);
    }

    //If user provides us a "HTML5 Video" Link
    else if(inputURL.substr(inputURL.length-6, inputURL.length) === "/html5")
    {
        console.log("% % HTML5 METHOD % %");
        console.log(`Sample Input URL: ${inputURL}`);
        step1 = inputURL.substr(0, inputURL.length-6);
        console.log(`Post-Step 1 Input URL: ${step1}`);
        imageID = step1.substr(23, step1.length);
        console.log(`Image ID: ${imageID}`);
    }

    //If user provides us a "Short Link"
    else if(inputURL.substr(0, 14) === "http://gph.is/")
    {
        console.log(". . SHORT METHOD . .");
        console.log(`Sample Input URL: ${inputURL}`);
        imageID = inputURL.substr(15, inputURL.length);
        console.log(`Image ID: ${imageID}`);
    }
}

//Sample Input
imageIDExtractor("https://media.giphy.com/media/KLd5r5pY7iqXK/giphy.gif");

imageIDExtractor("https://giphy.com/gifs/KLd5r5pY7iqXK/html5");

imageIDExtractor("http://gph.is/1dyiAbz");
# JDS Fonts 
Place here should be all fonts used within Jio Design System for all languages and text styles.

## How do I add new fonts?
1. If you have ttf fonts, please visit https://transfonter.org/ to convert them into WOFF and WOFF2 font files.
2. Extract the downloaded directory here
3. Inside your font folder, rename `demo.html` to `index.html`.
3. Change `<title>` to font name.
4. Copy the following code into the `<head>` of the file:
```html
    <!--    COPY ME ON EACH FONT'S DEMO.HTML  -->
    <script>
      document.addEventListener("DOMContentLoaded", function (event) {
        const allPreLinksTag = document.querySelectorAll('pre:not([title="Usage"])');
        for (var i in allPreLinksTag) {
          var pre = allPreLinksTag[i];
          if (pre.innerText && pre.innerText.indexOf('&lt;link') !== 0) {
            pre.innerText = pre.innerText.replace(/href="/g, `href="${location.href.replace(/\/?$/, '/')}`);
          }
        }
      });
    </script>
    <!--    -->
```
5. Copy the following code as first entry inside `<body> <div class="page">`:
```html
    <!--    COPY ME ON EACH FONT'S DEMO.HTML  -->
    <div class="demo">
        <h1>Stylesheet</h1>
        To embed this font, copy the following code into the &lt;head&gt; of your html.<br><br>
        <pre id="font-stylesheet">&lt;link href=&quot;stylesheet.css&quot; rel=&quot;stylesheet&quot;&gt;</pre>
    </div>
    <!--    -->
```
6. Make sure you do not have any other files in this directory except the folders for the font files.
7. Commit and push new files.
8. Once the build runs successfully, you would be able to see your new fonts uploaded to [https://jio-static.azureedge.net/static/fonts/JioType/](https://jio-static.azureedge.net/static/fonts/JioType/). This follows the directory structure inside this fonts folder. Replace `JioType` with your new font.

### Web Helper fonts.scss
Now that the files have been uploaded to static url, you may want to create links within fonts.scss that are used inside web Design System platforms. 

1. Copy the `stylesheet.css` from `src/static/fonts/<YourFont>/stylesheet.css` to `src/styles/web/static/text/_font-<YourFont>.scss`.
2. At the top of the file, paste the following:
```scss
$font-name: '<YourFont>';
$font-loc: 'https://jio-static.azureedge.net/static/fonts/' !default;
$font-loc-full: '#{$font-loc}#{$font-name}/';
```
3. Find and replace `url('` with `url('#{$font-loc-full}`.
4. Done.

### Android static fonts
1. Copy only the ttf files into a flat directory on `src/styles/android/static/font`.
2. rename each of them to snake case. e.g. `MyFont-Name Bold.ttf` should become `my_font_name_bold.ttf`.

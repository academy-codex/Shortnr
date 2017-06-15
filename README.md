# Shortnr
It is a URL Shortening Web Application.

# How to use?
1. Run npm install to install the needed packages.
2. By Default the app runs on port 3000 of localhost. The same can be modified as per the user needs.
3. Setup a running instance of MongoDB and add the <b>mongodb://(your url)</b> link to the file <b> db/mongoose.js </b> in the function mongoose.connect(...).
4. Enter the link and enjoy the short link generated :).

# Algorithm Used for Shortnr

<b> BASE58 </b>
<br>
BASE58 encoding and decoding is used in the project. See the functions of encoding and decoding in coding.js file for their implementations.

# TODO
Develop an extension for the web broswer to save your short links in the browser itself.

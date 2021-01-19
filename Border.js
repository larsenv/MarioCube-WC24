var imlocation = "https://wc24.mariocube.com/Borders/Animated%20GIFs/Current%20";
 function ImageArray (n) {
   this.length = n;
   for (var i =1; i <= n; i++) {
     this[i] = ' '
   }
 }
image = new ImageArray(7);
image[0] = 'Sunday.gif';
image[1] = 'Monday.gif';
image[2] = 'Tuesday.gif';
image[3] = 'Wednesday.gif';
image[4] = 'Thursday.gif';
image[5] = 'Friday.gif';
image[6] = 'Saturday.gif';
var currentdate = new Date();
var imagenumber = currentdate.getDay();
document.write('<img src="' + imlocation + image[imagenumber] + '">');

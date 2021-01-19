var imlocation = "https://wc24.mariocube.com/Borders/Forecast%20Channel%20";
 function ImageArray (n) {
   this.length = n;
   for (var i =1; i <= n; i++) {
     this[i] = ' '
   }
 }
image = new ImageArray(7);
image[0] = 'Sunday.png';
image[1] = 'Monday.png';
image[2] = 'Tuesday.png';
image[3] = 'Wednesday.png';
image[4] = 'Thursday.png';
image[5] = 'Friday.png';
image[6] = 'Saturday.png';
var currentdate = new Date();
var imagenumber = currentdate.getDay();
document.write('<img src="' + imlocation + image[imagenumber] + '">');
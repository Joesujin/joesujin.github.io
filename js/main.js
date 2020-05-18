var syh_onepage;


function setup(){
    noCanvas();
    syh_onepage = select('#syhbutton');
    syh_onepage.mouseOver(highlight);
}

function highlight(){
    console.log('this is happening');
    syh_onepage.style('background-color','#fff');
    syh_onepage.style('text-color', '#ffffff');
}
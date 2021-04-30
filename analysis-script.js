function switchTab(tab) {
  var tabs = document.getElementsByClassName("tab");
  var submit_btn = document.getElementById("sign-in").elements.namedItem("submit");
  var i;

  for(i=0;i<tabs.length;i++)
    tabs[i].style.color = "#676D6E";
  
  tabs[tab].style.color = "#3FBAC2";

  switch(tab)
  {
    case 0:
      submit_btn.value = "Sign Into Youtube";
      break;
    case 1:
      submit_btn.value = "Sign Into Instagram";
      break;
  }
}
  
function popUp() {
  var x = document.getElementsByClassName("pop-up-container"), y, i, j;

  for(i=0;i<x.length;i++)
  {
    x[i].style.display = "flex";

    y = x[i].getElementsByClassName("pop-up");
    for(j=0;j<y.length;j++)
      y[j].style.display = "flex";
  }

  switchTab(0);
}

function closePopUp() {
  var x = document.getElementsByClassName("pop-up-container"), i;
  var f = document.getElementById("sign-in");

  f.reset();

  for(i=0;i<x.length;i++)
    x[i].style.display = "none";
}

 
    function openSidebar() {
      document.getElementById('sidebar').classList.add('open');
      document.getElementById('overlay').classList.add('show');
    }

    function closeSidebar() {
      document.getElementById('sidebar').classList.remove('open');
      document.getElementById('overlay').classList.remove('show');
    }

    const menu =
document.querySelector(".hamburger");

const sidebar =
document.querySelector(".sidebar");

const overlay =
document.querySelector(".overlay");

menu?.addEventListener("click",()=>{

sidebar.classList.toggle("open");

overlay.classList.toggle("show");

});

overlay?.addEventListener("click",()=>{

sidebar.classList.remove("open");

overlay.classList.remove("show");

});

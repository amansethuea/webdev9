function toggleNav(e){
    const links = document.querySelector("#header_links"); // Changed from "#header-links" to "#header_links"
    console.log('Burger click');
    links.classList.toggle('showNav');
}

/// grab the element by id
const hamburger = document.querySelector('#hamburger');
hamburger.addEventListener('click', toggleNav);
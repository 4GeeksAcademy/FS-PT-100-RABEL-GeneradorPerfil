import "../style/index.css";

/**
 *  EDIT ONLY INSIDE THIS RENDER FUNCTION
 *  This function is called every time the user changes types or changes any input
 * 
    {
        includeCover: true, // if includeCover is true the algorithm should show the cover image
        background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da", // this is the image's url that will be used as a background for the profile cover
        avatarURL: "https://randomuser.me/api/portraits/women/42.jpg", // this is the url for the profile avatar
        socialMediaPosition: "right", // social media bar position (left or right)
        
        twitter: null, // social media usernames
        github: null,
        linkedin: null,
        instagram: null,

        name: null,
        lastName: null,
        role: null,
        country: null,
        city: null
    }
 */
function render(variables = {}) {
  console.log("These are the current variables: ", variables); // Mostrar variables en la consola

  // 1. Portada (cover)
  let cover = variables.includeCover
    ? `<div class="cover"><img src="${variables.background}" /></div>`
    : "<div class='cover'></div>";

  // 2. Avatar
  const avatar = variables.avatarURL
    ? `<img src="${variables.avatarURL}" class="photo" />`
    : "";

  // 3. Nombre completo
  const fullName = variables.name || variables.lastName
    ? `<h1>${variables.name || ""} ${variables.lastName || ""}</h1>`
    : "";

  // 4. Rol (título del trabajo)
  const role = variables.role
    ? `<h2>${variables.role}</h2>`
    : "";

  // 5. Ubicación (ciudad y país)
  const location = variables.city || variables.country
    ? `<h3>${variables.city || ""}${variables.city && variables.country ? ", " : ""}${variables.country || ""}</h3>`
    : "";

  // 6. Redes sociales
  const socialMediaLinks = [];
  if (variables.twitter) socialMediaLinks.push(`<li><a href="https://twitter.com/${variables.twitter}"><i class="fab fa-twitter"></i></a></li>`);
  if (variables.github) socialMediaLinks.push(`<li><a href="https://github.com/${variables.github}"><i class="fab fa-github"></i></a></li>`);
  if (variables.linkedin) socialMediaLinks.push(`<li><a href="https://linkedin.com/in/${variables.linkedin}"><i class="fab fa-linkedin"></i></a></li>`);
  if (variables.instagram) socialMediaLinks.push(`<li><a href="https://instagram.com/${variables.instagram}"><i class="fab fa-instagram"></i></a></li>`);

  const socialMedia = socialMediaLinks.length > 0
    ? `<ul class="${variables.socialMediaPosition || "position-right"}">${socialMediaLinks.join("")}</ul>`
    : "";

  // 7. Construir el HTML completo
  const widgetContent = `
    <div class="widget">
      ${cover}
      ${avatar}
      ${fullName}
      ${role}
      ${location}
      ${socialMedia}
    </div>
  `;

  // 8. Insertar el HTML en el contenedor
  document.querySelector("#widget_content").innerHTML = widgetContent;
}

/**
 * Don't change any of the lines below, here is where we do the logic for the dropdowns
 */
window.onload = function() {
  window.variables = {
    // if includeCover is true the algorithm should show the cover image
    includeCover: true,
    // this is the image's url that will be used as a background for the profile cover
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    // this is the url for the profile avatar
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    // social media bar position (left or right)
    socialMediaPosition: "position-left",
    // social media usernames
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: null,
    lastName: null,
    role: null,
    country: null,
    city: null
  };
  render(window.variables); // render the card for the first time

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      // <- add a listener to every input
      const attribute = e.target.getAttribute("for"); // when any input changes, collect the value
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values)); // render again the card with new values
    });
  });
};

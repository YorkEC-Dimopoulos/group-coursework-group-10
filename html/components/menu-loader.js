document.addEventListener("DOMContentLoaded", () => {
  const getBasePath = () => {
    const currentPath = window.location.pathname;

    const pathParts = currentPath.split('/').filter(p => p);
    
 
    let hasFile = false;
    if (pathParts.length > 0 && /\.(html?|php)$/i.test(pathParts[pathParts.length - 1])) {
      pathParts.pop();
      hasFile = true;
    }
    
  
    let projectDepth = 0;
    for (let i = pathParts.length - 1; i >= 0; i--) {
      const folder = pathParts[i];
      if (folder === 'html' || folder === 'students' || folder === 'other') {
        projectDepth = pathParts.length - i;
        break;
      } else if (folder === 'model_V' || folder === 'model_K' || 
                 folder === 'model_L' || folder === 'model_MZ' || 
                 folder === 'components') {
        continue;
      }
    }
    

    if (projectDepth > 0) {
      return '../'.repeat(projectDepth);
    }
    
   
    return hasFile ? './' : './';
  };
  
  const basePath = getBasePath();
  
  fetch(basePath + "html/components/menu.html")
    .then(response => response.text())
    .then(menuHTML => {
      document.body.insertAdjacentHTML("afterbegin", menuHTML);
      const script = document.createElement("script");
      script.src = basePath + "html/components/menu.js";
      script.defer = true;
      document.body.appendChild(script);
    })
    .catch(error => {
      console.error("Menu Loading Error:", error);
    });
});

 
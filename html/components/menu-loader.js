document.addEventListener("DOMContentLoaded", () => {
  // Get the base path for the project root
  // This works for both local files and GitHub Pages with repository subdirectories
  const getBasePath = () => {
    const currentPath = window.location.pathname;
    
    // For GitHub Pages, find where index.html would be
    // Look for common project folders to determine depth
    const pathParts = currentPath.split('/').filter(p => p);
    
    // Remove filename if present (ends with .html, .htm, etc.)
    let hasFile = false;
    if (pathParts.length > 0 && /\.(html?|php)$/i.test(pathParts[pathParts.length - 1])) {
      pathParts.pop();
      hasFile = true;
    }
    
    // Count how deep we are inside project folders (html, students, model_V, etc.)
    let projectDepth = 0;
    for (let i = pathParts.length - 1; i >= 0; i--) {
      const folder = pathParts[i];
      if (folder === 'html' || folder === 'students' || folder === 'other') {
        projectDepth = pathParts.length - i;
        break;
      } else if (folder === 'model_V' || folder === 'model_K' || 
                 folder === 'model_L' || folder === 'model_MZ' || 
                 folder === 'components') {
        // These are subfolders, keep looking
        continue;
      }
    }
    
    // If we found a project folder, go up that many levels
    if (projectDepth > 0) {
      return '../'.repeat(projectDepth);
    }
    
    // Otherwise, we're at root or one level down
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

 
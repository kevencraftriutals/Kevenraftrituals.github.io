// app.js

// Function to fetch repositories
async function fetchRepositories() {
    const response = await fetch('https://api.github.com/users/kevencraftriutals/repos');
    const repos = await response.json();
    const repoList = document.getElementById('repo-list');
    
    repos.forEach(repo => {
        const option = document.createElement('option');
        option.value = repo.full_name;
        option.textContent = repo.name;
        repoList.appendChild(option);
    });
}

// Function to fetch files from the selected repository
async function fetchFiles(repoName) {
    const response = await fetch(`https://api.github.com/repos/${repoName}/contents`);
    const files = await response.json();
    const fileList = document.getElementById('file-list');
    fileList.innerHTML = ''; // Clear previous files

    files.forEach(file => {
        const option = document.createElement('option');
        option.value = file.download_url;
        option.textContent = file.name;
        fileList.appendChild(option);
    });
}

// Function to load the selected file and display it
async function loadFile(fileUrl) {
    const response = await fetch(fileUrl);
    const content = await response.text();
    const previewArea = document.getElementById('preview');
    
    previewArea.textContent = content;
}

// Event listeners
document.getElementById('repo-list').addEventListener('change', (e) => {
    fetchFiles(e.target.value);
});

document.getElementById('file-list').addEventListener('change', (e) => {
    loadFile(e.target.value);
});

// Initial fetch of repositories when the page loads
fetchRepositories();
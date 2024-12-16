(function() {
    function updateCommitInfo() {
        fetch('https://api.github.com/repos/lktuan/lktuan.github.io/commits?per_page=1')
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Failed to fetch commit data');
                }
                return response.json();
            })
            .then(function(commits) {
                if (commits.length > 0) {
                    var latestCommit = commits[0];
                    
                    // Parse and format the date with GMT+7
                    var commitDate = new Date(latestCommit.commit.committer.date);
                    
                    // Adjust to GMT+7
                    commitDate.setHours(commitDate.getHours() + 7);
                    
                    // Format date
                    var formattedDate = commitDate.toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                        timeZone: 'UTC'
                    });

                    // Update the DOM element
                    var commitInfoEl = document.getElementById('commit-info');
                    
                    if (commitInfoEl) {
                        commitInfoEl.textContent = `last commit on ${formattedDate} (GMT+7): ${latestCommit.commit.message}`;
                    }
                }
            })
            .catch(function(error) {
                console.error('Error fetching commit data:', error);
                var commitInfoEl = document.getElementById('commit-info');
                
                if (commitInfoEl) {
                    commitInfoEl.textContent = 'Could not retrieve commit information';
                }
            });
    }

    // Run the update when the script loads
    updateCommitInfo();
})();
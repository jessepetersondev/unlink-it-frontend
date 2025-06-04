// Enhanced checklist functionality
        function updateProgress() {
            const categories = document.querySelectorAll('.checklist-category');
            let totalTasks = 0;
            let completedTasks = 0;
            
            categories.forEach(category => {
                const checkboxes = category.querySelectorAll('input[type="checkbox"]');
                const checked = category.querySelectorAll('input[type="checkbox"]:checked');
                const progressText = category.querySelector('.progress-text');
                
                totalTasks += checkboxes.length;
                completedTasks += checked.length;
                
                if (progressText) {
                    progressText.textContent = `${checked.length}/${checkboxes.length} completed`;
                }
                
                // Update category completion status
                if (checked.length === checkboxes.length && checkboxes.length > 0) {
                    category.classList.add('completed');
                } else {
                    category.classList.remove('completed');
                }
            });
            
            // Update overall progress
            const progressFill = document.getElementById('overall-progress');
            const progressText = document.getElementById('progress-text');
            const estimatedTime = document.getElementById('estimated-time');
            
            const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
            
            if (progressFill) {
                progressFill.style.width = progressPercentage + '%';
            }
            
            if (progressText) {
                progressText.textContent = `${completedTasks}/${totalTasks} tasks completed`;
            }
            
            if (estimatedTime) {
                const remainingTasks = totalTasks - completedTasks;
                const minHours = Math.ceil(remainingTasks * 0.15);
                const maxHours = Math.ceil(remainingTasks * 0.3);
                estimatedTime.textContent = `Estimated time remaining: ${minHours}-${maxHours} hours`;
            }
        }
        
        function exportProgress() {
            const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
            const progress = {};
            
            checkboxes.forEach(checkbox => {
                progress[checkbox.id] = checkbox.checked;
            });
            
            const dataStr = JSON.stringify(progress, null, 2);
            const dataBlob = new Blob([dataStr], {type: 'application/json'});
            const url = URL.createObjectURL(dataBlob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = 'privacy-checklist-progress.json';
            link.click();
            
            URL.revokeObjectURL(url);
        }
        
        function resetProgress() {
            if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
                const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
                checkboxes.forEach(checkbox => {
                    checkbox.checked = false;
                });
                localStorage.removeItem('privacy-checklist');
                updateProgress();
            }
        }
        
        // Initialize progress tracking
        document.addEventListener('DOMContentLoaded', function() {
            updateProgress();
            
            // Add event listeners to all checkboxes
            const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', updateProgress);
            });
        });
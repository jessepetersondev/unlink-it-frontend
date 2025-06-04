
        function copyAddress(addressId) {
            const addressElement = document.getElementById(addressId);
            const address = addressElement.textContent;
            const button = addressElement.parentNode.querySelector('.copy-btn');
            
            // Create temporary textarea for copying
            const textarea = document.createElement('textarea');
            textarea.value = address;
            textarea.setAttribute('readonly', '');
            textarea.style.position = 'absolute';
            textarea.style.left = '-9999px';
            document.body.appendChild(textarea);
            
            // Select and copy
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            
            // Show success state
            button.classList.add('copied');
            
            // Reset after 2 seconds
            setTimeout(() => {
                button.classList.remove('copied');
            }, 2000);
        }
/**
 * Apply icon upload feature to main admin panel
 */

const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'public/admin/index.html');

console.log('Reading index.html...');
let html = fs.readFileSync(indexPath, 'utf8');

// Step 1: Add tabs after the Icon label
const iconLabelPattern = /(<label[^>]*>\s*Icon\s*<span[^>]*>\*<\/span>\s*<\/label>)\s*<!-- Selected Icon Display -->/;

const iconLabelReplacement = `$1

                        <!-- Icon Type Tabs -->
                        <div style="display: flex; gap: 10px; margin-bottom: 15px; border-bottom: 2px solid #e9ecef;">
                            <button type="button" id="emojiTabBtn" class="icon-tab-btn active" data-tab="emoji"
                                    style="padding: 10px 20px; border: none; background: none; cursor: pointer; font-weight: 500; color: #667eea; border-bottom: 3px solid #667eea; transition: all 0.3s;">
                                📱 Emoji Icon
                            </button>
                            <button type="button" id="imageTabBtn" class="icon-tab-btn" data-tab="image"
                                    style="padding: 10px 20px; border: none; background: none; cursor: pointer; font-weight: 500; color: #6c757d; border-bottom: 3px solid transparent; transition: all 0.3s;">
                                🖼️ Custom Image
                            </button>
                        </div>

                        <!-- Selected Icon Display -->`;

if (!html.includes('Icon Type Tabs')) {
    html = html.replace(iconLabelPattern, iconLabelReplacement);
    console.log('✅ Added icon type tabs');
} else {
    console.log('⏭️  Tabs already exist');
}

// Step 2: Update selectedIconDisplay to include overflow: hidden
html = html.replace(
    /id="selectedIconDisplay" style="([^"]*?)"/,
    (match, styles) => {
        if (!styles.includes('overflow')) {
            return `id="selectedIconDisplay" style="${styles} overflow: hidden;"`;
        }
        return match;
    }
);
console.log('✅ Updated icon display styles');

// Step 3: Add hidden inputs after categoryIcon
const categoryIconPattern = /(<input[^>]*id="categoryIcon"[^>]*>)\s*(<small)/;
const categoryIconReplacement = `$1
                                <input type="hidden" id="categoryIconType" value="emoji">
                                <input type="hidden" id="categoryIconImage" value="">
                                $2`;

if (!html.includes('categoryIconType')) {
    html = html.replace(categoryIconPattern, categoryIconReplacement);
    console.log('✅ Added hidden input fields');
} else {
    console.log('⏭️  Hidden inputs already exist');
}

// Step 4: Update small text to have an ID
html = html.replace(
    /<small style="color: #6c757d[^"]*"[^>]*>\s*Click an emoji below to select/,
    '<small id="iconHelpText" style="color: #6c757d; font-size: 12px; margin-top: 5px; display: block;">\n                                    Click an emoji below to select'
);
console.log('✅ Added ID to help text');

// Step 5: Add ID to emoji picker div
html = html.replace(
    /<!-- Emoji Picker Grid -->\s*<div style="background: #f8f9fa; padding: 15px/,
    '<!-- Emoji Picker Grid -->\n                        <div id="emojiPicker" style="background: #f8f9fa; padding: 15px; display: block'
);
console.log('✅ Added ID to emoji picker');

// Step 6: Add custom image upload section after emoji picker
const emojiPickerEndPattern = /(<!-- Emoji Picker Grid -->[\s\S]*?<\/div>\s*<\/div>)\s*(<style>)/;
const imageUploadSection = `$1

                        <!-- Custom Image Upload Section -->
                        <div id="imagePicker" style="background: #f8f9fa; padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0; display: none;">
                            <div style="text-align: center;">
                                <label for="customIconImageInput" style="display: inline-block; padding: 12px 24px; background: #667eea; color: white; border-radius: 8px; cursor: pointer; font-weight: 500; transition: all 0.3s; margin-bottom: 15px;">
                                    📁 Choose Image File
                                    <input type="file" id="customIconImageInput" accept="image/*" style="display: none;">
                                </label>
                                <p style="color: #6c757d; font-size: 13px; margin: 10px 0;">
                                    Upload PNG, JPG, or SVG (recommended size: 80x80px)
                                </p>
                                <div id="imageUploadPreview" style="margin-top: 15px; padding: 15px; background: white; border-radius: 8px; display: none;">
                                    <p style="color: #28a745; font-size: 14px; margin: 0;">
                                        ✅ Image uploaded successfully
                                    </p>
                                </div>
                            </div>
                        </div>

                        $2`;

if (!html.includes('id="imagePicker"')) {
    html = html.replace(emojiPickerEndPattern, imageUploadSection);
    console.log('✅ Added image upload section');
} else {
    console.log('⏭️  Image upload section already exists');
}

// Step 7: Add tab button styles
const tabStylesPattern = /(\.emoji-btn\.selected\s*{[\s\S]*?})\s*(<\/style>)/;
const tabStyles = `$1
                            .icon-tab-btn.active {
                                color: #667eea !important;
                                border-bottom-color: #667eea !important;
                            }
                            .icon-tab-btn:hover {
                                color: #667eea;
                            }
                        $2`;

if (!html.includes('icon-tab-btn.active')) {
    html = html.replace(tabStylesPattern, tabStyles);
    console.log('✅ Added tab button styles');
} else {
    console.log('⏭️  Tab styles already exist');
}

// Step 8: Update emoji selection JavaScript
const emojiScriptPattern = /(document\.getElementById\('categoryIcon'\)\.value = emoji;\s*document\.getElementById\('selectedIconDisplay'\)\.textContent = emoji;)/;
const emojiScriptReplacement = `$1
                                    document.getElementById('categoryIconType').value = 'emoji';
                                    document.getElementById('categoryIconImage').value = '';`;


// Step 9: Add tab switching and image upload JavaScript before </script>
const scriptEndPattern = /(document\.querySelectorAll\('\.emoji-btn'\)[\s\S]*?}\);)\s*(<\/script>)/;
const newScripts = `$1

                            // Tab switching
                            const emojiTabBtn = document.getElementById('emojiTabBtn');
                            const imageTabBtn = document.getElementById('imageTabBtn');
                            const emojiPicker = document.getElementById('emojiPicker');
                            const imagePicker = document.getElementById('imagePicker');
                            const iconHelpText = document.getElementById('iconHelpText');

                            if (emojiTabBtn && imageTabBtn) {
                                emojiTabBtn.addEventListener('click', function() {
                                    emojiTabBtn.classList.add('active');
                                    imageTabBtn.classList.remove('active');
                                    emojiTabBtn.style.color = '#667eea';
                                    emojiTabBtn.style.borderBottomColor = '#667eea';
                                    imageTabBtn.style.color = '#6c757d';
                                    imageTabBtn.style.borderBottomColor = 'transparent';
                                    emojiPicker.style.display = 'block';
                                    imagePicker.style.display = 'none';
                                    iconHelpText.textContent = 'Click an emoji below to select';
                                });

                                imageTabBtn.addEventListener('click', function() {
                                    imageTabBtn.classList.add('active');
                                    emojiTabBtn.classList.remove('active');
                                    imageTabBtn.style.color = '#667eea';
                                    imageTabBtn.style.borderBottomColor = '#667eea';
                                    emojiTabBtn.style.color = '#6c757d';
                                    emojiTabBtn.style.borderBottomColor = 'transparent';
                                    emojiPicker.style.display = 'none';
                                    imagePicker.style.display = 'block';
                                    iconHelpText.textContent = 'Upload a custom image file';
                                });
                            }

                            // Custom image upload handler
                            const imageInput = document.getElementById('customIconImageInput');
                            if (imageInput) {
                                imageInput.addEventListener('change', function(e) {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onload = function(event) {
                                            const imageData = event.target.result;
                                            const displayDiv = document.getElementById('selectedIconDisplay');
                                            displayDiv.innerHTML = '';
                                            const img = document.createElement('img');
                                            img.src = imageData;
                                            img.style.width = '100%';
                                            img.style.height = '100%';
                                            img.style.objectFit = 'cover';
                                            displayDiv.appendChild(img);
                                            document.getElementById('categoryIcon').value = file.name;
                                            document.getElementById('categoryIconType').value = 'image';
                                            document.getElementById('categoryIconImage').value = imageData;
                                            document.getElementById('imageUploadPreview').style.display = 'block';
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                });
                            }
                        $2`;

if (!html.includes('Tab switching')) {
    html = html.replace(scriptEndPattern, newScripts);
    console.log('✅ Added tab switching and image upload handlers');
} else {
    console.log('⏭️  Tab switching already exists');
}

// Write back
fs.writeFileSync(indexPath, html, 'utf8');

console.log('\n✨ Icon upload feature applied successfully!');
console.log('📁 File: public/admin/index.html');
console.log('🔄 Server will auto-reload\n');

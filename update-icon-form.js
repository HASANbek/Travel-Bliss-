/**
 * Script to add custom image upload to category icon form
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'public/admin/index.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add tabs before "Selected Icon Display"
const labelSection = `                        <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #495057; font-size: 14px;">
                            Icon <span style="color: #dc3545;">*</span>
                        </label>

                        <!-- Selected Icon Display -->`;

const labelSectionWithTabs = `                        <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #495057; font-size: 14px;">
                            Icon <span style="color: #dc3545;">*</span>
                        </label>

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

// Only add tabs if they don't exist
if (!content.includes('Icon Type Tabs')) {
    content = content.replace(labelSection, labelSectionWithTabs);
    console.log('✅ Added icon type tabs');
}

// 2. Update the icon display div and input
const oldIconDisplay = `                            <div id="selectedIconDisplay" style="width: 80px; height: 80px; border: 2px solid #ced4da; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 40px; background: #f8f9fa;">
                                📁
                            </div>
                            <div style="flex: 1;">
                                <input type="text" id="categoryIcon" value="📁" required readonly
                                       style="width: 100%; padding: 12px; border: 1px solid #ced4da; border-radius: 6px; font-size: 20px; text-align: center; background: white; cursor: default;">
                                <small style="color: #6c757d; font-size: 12px; margin-top: 5px; display: block;">
                                    Click an emoji below to select
                                </small>
                            </div>`;

const newIconDisplay = `                            <div id="selectedIconDisplay" style="width: 80px; height: 80px; border: 2px solid #ced4da; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 40px; background: #f8f9fa; overflow: hidden;">
                                📁
                            </div>
                            <div style="flex: 1;">
                                <input type="text" id="categoryIcon" value="📁" required readonly
                                       style="width: 100%; padding: 12px; border: 1px solid #ced4da; border-radius: 6px; font-size: 20px; text-align: center; background: white; cursor: default;">
                                <input type="hidden" id="categoryIconType" value="emoji">
                                <input type="hidden" id="categoryIconImage" value="">
                                <small id="iconHelpText" style="color: #6c757d; font-size: 12px; margin-top: 5px; display: block;">
                                    Click an emoji below to select
                                </small>
                            </div>`;

if (!content.includes('categoryIconType')) {
    content = content.replace(oldIconDisplay, newIconDisplay);
    console.log('✅ Updated icon display section');
}

// 3. Update emoji picker div
const oldEmojiPicker = `                        <!-- Emoji Picker Grid -->
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px solid #e0e0e0;">`;

const newEmojiPicker = `                        <!-- Emoji Picker Grid -->
                        <div id="emojiPicker" style="background: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px solid #e0e0e0; display: block;">`;

if (!content.includes('id="emojiPicker"')) {
    content = content.replace(oldEmojiPicker, newEmojiPicker);
    console.log('✅ Updated emoji picker div');
}

// 4. Add custom image upload section after emoji picker closing div
const emojiPickerEnd = `                        </div>

                        <style>
                            .emoji-btn:hover {`;

const emojiPickerEndWithImageUpload = `                        </div>

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

                        <style>
                            .emoji-btn:hover {`;

if (!content.includes('id="imagePicker"')) {
    content = content.replace(emojiPickerEnd, emojiPickerEndWithImageUpload);
    console.log('✅ Added custom image upload section');
}

// 5. Add CSS for tab buttons
const emojiBtnSelectedStyle = `                            .emoji-btn.selected {
                                border-color: #667eea !important;
                                background: #f0f0ff !important;
                                box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
                            }
                        </style>`;

const emojiBtnSelectedStyleWithTabCSS = `                            .emoji-btn.selected {
                                border-color: #667eea !important;
                                background: #f0f0ff !important;
                                box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
                            }
                            .icon-tab-btn.active {
                                color: #667eea !important;
                                border-bottom-color: #667eea !important;
                            }
                            .icon-tab-btn:hover {
                                color: #667eea;
                            }
                        </style>`;

if (!content.includes('icon-tab-btn.active')) {
    content = content.replace(emojiBtnSelectedStyle, emojiBtnSelectedStyleWithTabCSS);
    console.log('✅ Added tab button styles');
}

// 6. Add JavaScript for tab switching and image upload
const emojiScriptEnd = `                            // Emoji selection handler
                            document.querySelectorAll('.emoji-btn').forEach(btn => {
                                btn.addEventListener('click', function() {
                                    const emoji = this.getAttribute('data-emoji');

                                    // Update input and display
                                    document.getElementById('categoryIcon').value = emoji;
                                    document.getElementById('selectedIconDisplay').textContent = emoji;

                                    // Remove previous selection
                                    document.querySelectorAll('.emoji-btn').forEach(b => b.classList.remove('selected'));

                                    // Add selection to clicked button
                                    this.classList.add('selected');
                                });
                            });
                        </script>`;

const emojiScriptEndWithTabs = `                            // Emoji selection handler
                            document.querySelectorAll('.emoji-btn').forEach(btn => {
                                btn.addEventListener('click', function() {
                                    const emoji = this.getAttribute('data-emoji');

                                    // Update input and display
                                    document.getElementById('categoryIcon').value = emoji;
                                    document.getElementById('selectedIconDisplay').textContent = emoji;
                                    document.getElementById('categoryIconType').value = 'emoji';
                                    document.getElementById('categoryIconImage').value = '';

                                    // Remove previous selection
                                    document.querySelectorAll('.emoji-btn').forEach(b => b.classList.remove('selected'));

                                    // Add selection to clicked button
                                    this.classList.add('selected');
                                });
                            });

                            // Tab switching
                            const emojiTabBtn = document.getElementById('emojiTabBtn');
                            const imageTabBtn = document.getElementById('imageTabBtn');
                            const emojiPicker = document.getElementById('emojiPicker');
                            const imagePicker = document.getElementById('imagePicker');
                            const iconHelpText = document.getElementById('iconHelpText');

                            emojiTabBtn.addEventListener('click', function() {
                                // Switch to emoji tab
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
                                // Switch to image tab
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

                            // Custom image upload handler
                            document.getElementById('customIconImageInput').addEventListener('change', function(e) {
                                const file = e.target.files[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onload = function(event) {
                                        const imageData = event.target.result;

                                        // Update display with image
                                        const displayDiv = document.getElementById('selectedIconDisplay');
                                        displayDiv.innerHTML = '';
                                        const img = document.createElement('img');
                                        img.src = imageData;
                                        img.style.width = '100%';
                                        img.style.height = '100%';
                                        img.style.objectFit = 'cover';
                                        displayDiv.appendChild(img);

                                        // Update hidden inputs
                                        document.getElementById('categoryIcon').value = file.name;
                                        document.getElementById('categoryIconType').value = 'image';
                                        document.getElementById('categoryIconImage').value = imageData;

                                        // Show success message
                                        document.getElementById('imageUploadPreview').style.display = 'block';
                                    };
                                    reader.readAsDataURL(file);
                                }
                            });
                        </script>`;

if (!content.includes('Tab switching')) {
    content = content.replace(emojiScriptEnd, emojiScriptEndWithTabs);
    console.log('✅ Added tab switching and image upload JavaScript');
}

// Write the updated content
fs.writeFileSync(filePath, content, 'utf8');

console.log('\n✨ Icon form updated successfully!');
console.log('   - Added emoji/image tabs');
console.log('   - Added custom image upload');
console.log('   - Added tab switching logic');
console.log('   - Added image preview functionality\n');

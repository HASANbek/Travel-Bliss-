/**
 * Add View button to Categories table
 */

const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'public/admin/index.html');

console.log('📖 Reading index.html...');
let html = fs.readFileSync(indexPath, 'utf8');

// Find and replace Actions column buttons
const oldButtons = `<td style="padding: 15px; text-align: center;">
                        <button onclick="openCategoryModal('\${category._id}')" class="action-btn edit-btn" style="margin-right: 5px;">
                            ✏️ Edit
                        </button>
                        <button onclick="deleteCategory('\${category._id}')" class="action-btn delete-btn">
                            🗑️ Delete
                        </button>
                    </td>`;

const newButtons = `<td style="padding: 15px; text-align: center;">
                        <button onclick="viewCategory('\${category._id}')" class="action-btn view-btn" style="margin-right: 5px;">
                            👁️ View
                        </button>
                        <button onclick="openCategoryModal('\${category._id}')" class="action-btn edit-btn" style="margin-right: 5px;">
                            ✏️ Edit
                        </button>
                        <button onclick="deleteCategory('\${category._id}')" class="action-btn delete-btn">
                            🗑️ Delete
                        </button>
                    </td>`;

if (html.includes('viewCategory')) {
    console.log('⏭️  View button already exists');
} else {
    html = html.replace(oldButtons, newButtons);
    console.log('✅ Added View button to Actions column');
}

// Now add the viewCategory function
const viewCategoryFunction = `
        // View category details in modal
        function viewCategory(categoryId) {
            const category = categories.find(c => c._id === categoryId || c.id === categoryId);
            if (!category) {
                alert('Category not found');
                return;
            }

            // Create view modal content
            const modalContent = \`
                <div style="padding: 20px;">
                    <h3 style="margin-bottom: 20px; color: #2c3e50; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
                        📋 Category Details
                    </h3>

                    <div style="display: grid; grid-template-columns: 150px 1fr; gap: 15px; margin-bottom: 20px;">
                        <div style="font-weight: 600; color: #495057;">Icon:</div>
                        <div style="font-size: 32px;">\${category.icon || '📁'}</div>

                        <div style="font-weight: 600; color: #495057;">Name:</div>
                        <div style="color: #2c3e50; font-size: 16px;">\${category.name}</div>

                        <div style="font-weight: 600; color: #495057;">Slug:</div>
                        <div style="font-family: monospace; color: #6c757d; background: #f8f9fa; padding: 5px 10px; border-radius: 4px;">\${category.slug}</div>

                        <div style="font-weight: 600; color: #495057;">Description:</div>
                        <div style="color: #495057;">\${category.description || 'No description'}</div>

                        <div style="font-weight: 600; color: #495057;">Color:</div>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <div style="width: 40px; height: 40px; background: \${category.color || '#667eea'}; border-radius: 6px; border: 1px solid #dee2e6;"></div>
                            <span style="font-family: monospace; font-size: 14px; color: #6c757d;">\${category.color || '#667eea'}</span>
                        </div>

                        <div style="font-weight: 600; color: #495057;">Order:</div>
                        <div style="font-size: 16px; color: #2c3e50;">\${category.order || 0}</div>

                        <div style="font-weight: 600; color: #495057;">Status:</div>
                        <div>
                            <span style="padding: 6px 14px; border-radius: 12px; font-size: 12px; font-weight: 600;
                                         background: \${category.status === 'active' ? '#d4edda' : '#f8d7da'};
                                         color: \${category.status === 'active' ? '#155724' : '#721c24'};">
                                \${category.status === 'active' ? 'Active' : 'Inactive'}
                            </span>
                        </div>

                        <div style="font-weight: 600; color: #495057;">Created:</div>
                        <div style="color: #6c757d; font-size: 14px;">\${new Date(category.createdAt).toLocaleString('en-US', {
                            year: 'numeric', month: 'short', day: 'numeric',
                            hour: '2-digit', minute: '2-digit'
                        })}</div>

                        <div style="font-weight: 600; color: #495057;">Last Updated:</div>
                        <div style="color: #6c757d; font-size: 14px;">\${new Date(category.updatedAt).toLocaleString('en-US', {
                            year: 'numeric', month: 'short', day: 'numeric',
                            hour: '2-digit', minute: '2-digit'
                        })}</div>
                    </div>

                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef; text-align: right;">
                        <button onclick="document.getElementById('viewCategoryModal').style.display='none'"
                                style="padding: 10px 24px; background: #6c757d; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500;">
                            Close
                        </button>
                        <button onclick="document.getElementById('viewCategoryModal').style.display='none'; openCategoryModal('\${category._id}');"
                                style="padding: 10px 24px; background: #667eea; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; margin-left: 10px;">
                            Edit Category
                        </button>
                    </div>
                </div>
            \`;

            // Create or update view modal
            let viewModal = document.getElementById('viewCategoryModal');
            if (!viewModal) {
                viewModal = document.createElement('div');
                viewModal.id = 'viewCategoryModal';
                viewModal.className = 'modal';
                document.body.appendChild(viewModal);
            }

            viewModal.innerHTML = \`
                <div class="modal-content" style="max-width: 700px; max-height: 90vh; overflow-y: auto;">
                    \${modalContent}
                </div>
            \`;

            viewModal.style.display = 'flex';
        }
`;

// Add the function before the closing script tag of the categories section
const categoryScriptEnd = /(\s*\/\/ Load categories on page load[\s\S]*?loadCategories\(\);[\s\S]*?<\/script>)/;

if (html.includes('function viewCategory')) {
    console.log('⏭️  viewCategory function already exists');
} else {
    html = html.replace(categoryScriptEnd, (match) => {
        return viewCategoryFunction + '\n' + match;
    });
    console.log('✅ Added viewCategory function');
}

// Add CSS for view button if not exists
const actionBtnCSS = `.action-btn {
            padding: 8px 16px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 13px;
            font-weight: 500;
            transition: all 0.3s;
        }`;

if (!html.includes('.view-btn')) {
    const viewBtnCSS = `
        .view-btn {
            background: #17a2b8;
            color: white;
        }
        .view-btn:hover {
            background: #138496;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(23, 162, 184, 0.3);
        }`;

    html = html.replace(actionBtnCSS, actionBtnCSS + viewBtnCSS);
    console.log('✅ Added view button CSS');
}

// Write back
fs.writeFileSync(indexPath, html, 'utf8');

console.log('\n✨ View button added successfully!');
console.log('📁 File: public/admin/index.html');
console.log('\n🎯 Features added:');
console.log('   • View button in Actions column');
console.log('   • viewCategory() function');
console.log('   • Detailed category information modal');
console.log('   • View button CSS styling\n');

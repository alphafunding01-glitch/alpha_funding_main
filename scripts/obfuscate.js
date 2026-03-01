/**
 * ═══════════════════════════════════════════════════════════════════════════
 * Alpha Funding - Post-Build Obfuscation Script
 * Phase 0.3: Protect UI/Animation Code from Theft
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * This script runs AFTER `next build` and obfuscates only the app chunks,
 * leaving framework files (React, Webpack, polyfills) untouched.
 *
 * Usage: npm run build (automatically runs obfuscation after build)
 */

const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');
const path = require('path');

// ─────────────────────────────────────────────────────────────────────────────
// Configuration
// ─────────────────────────────────────────────────────────────────────────────

const CONFIG = {
    // Target directories containing app code
    // Next.js 14+ puts chunks directly in static/chunks
    targetDirs: [
        '.next/static/chunks',
    ],

    // Files to SKIP (framework, vendor, polyfills)
    // These patterns match the hash-named files that contain framework code
    skipPatterns: [
        /^framework/i,
        /^webpack/i,
        /^polyfills/i,
        /^main-app/i,
        /^turbopack/i,       // Build system
        /^_app/i,
        /^_document/i,
        /node_modules/i,
        /\.map$/i,           // Source maps
        /\.css$/i,           // CSS files
        // Large vendor bundles (usually React, framer-motion, etc.)
        // Files over 300KB are typically vendor bundles
    ],

    // Minimum file size to obfuscate (skip tiny files)
    minFileSize: 1000, // 1KB

    // Maximum file size to obfuscate (skip huge vendor bundles)
    maxFileSize: 400000, // 400KB - larger files are usually vendor bundles


    // Obfuscation settings (balanced for performance)
    obfuscatorOptions: {
        // String protection
        stringArray: true,
        stringArrayThreshold: 0.75,
        stringArrayEncoding: ['base64'],
        splitStrings: true,
        splitStringsChunkLength: 10,

        // Control flow (moderate)
        controlFlowFlattening: false, // Disabled for performance

        // Variable renaming
        renameGlobals: false,
        identifierNamesGenerator: 'hexadecimal',

        // Dead code (minimal)
        deadCodeInjection: false, // Disabled for performance

        // Self-defending (breaks if beautified)
        selfDefending: true,

        // Compact output
        compact: true,

        // Preserve functionality
        reservedStrings: [
            'React',
            'useState',
            'useEffect',
            'useCallback',
            'useMemo',
            'useRef',
            'motion',
            'animate',
            'className',
            'children',
            'onClick',
            'onChange',
            'onSubmit',
        ],
    },
};

// ─────────────────────────────────────────────────────────────────────────────
// Helper Functions
// ─────────────────────────────────────────────────────────────────────────────

function shouldSkipFile(filename) {
    return CONFIG.skipPatterns.some(pattern => {
        if (pattern instanceof RegExp) {
            return pattern.test(filename);
        }
        return filename.includes(pattern);
    });
}

function getFilesRecursively(dir) {
    const files = [];

    if (!fs.existsSync(dir)) {
        return files;
    }

    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
        const fullPath = path.join(dir, item.name);

        if (item.isDirectory()) {
            files.push(...getFilesRecursively(fullPath));
        } else if (item.name.endsWith('.js') && !shouldSkipFile(item.name)) {
            files.push(fullPath);
        }
    }

    return files;
}

function formatBytes(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Obfuscation Function
// ─────────────────────────────────────────────────────────────────────────────

async function obfuscateFiles() {
    console.log('\n🔒 Post-Build Obfuscation Starting...\n');
    console.log('═══════════════════════════════════════════════════════════');

    let totalFiles = 0;
    let totalOriginal = 0;
    let totalObfuscated = 0;
    let skipped = 0;
    let errors = 0;

    for (const targetDir of CONFIG.targetDirs) {
        if (!fs.existsSync(targetDir)) {
            console.log(`⚠️  Directory not found: ${targetDir}`);
            continue;
        }

        console.log(`\n📁 Processing: ${targetDir}`);
        const files = getFilesRecursively(targetDir);

        for (const filePath of files) {
            const filename = path.basename(filePath);

            try {
                const originalCode = fs.readFileSync(filePath, 'utf8');
                const originalSize = Buffer.byteLength(originalCode);

                // Skip files outside size range
                if (originalSize < CONFIG.minFileSize) {
                    console.log(`  ⊘ ${filename} (too small: ${formatBytes(originalSize)})`);
                    skipped++;
                    continue;
                }

                if (originalSize > CONFIG.maxFileSize) {
                    console.log(`  ⊘ ${filename} (vendor bundle: ${formatBytes(originalSize)})`);
                    skipped++;
                    continue;
                }

                // Obfuscate
                const result = JavaScriptObfuscator.obfuscate(originalCode, CONFIG.obfuscatorOptions);
                const obfuscatedCode = result.getObfuscatedCode();
                const obfuscatedSize = Buffer.byteLength(obfuscatedCode);

                // Write back
                fs.writeFileSync(filePath, obfuscatedCode);

                totalFiles++;
                totalOriginal += originalSize;
                totalObfuscated += obfuscatedSize;

                const sizeChange = ((obfuscatedSize - originalSize) / originalSize * 100).toFixed(1);
                console.log(`  ✓ ${filename} (${formatBytes(originalSize)} → ${formatBytes(obfuscatedSize)}, ${sizeChange}%)`);

            } catch (err) {
                errors++;
                console.log(`  ✗ ${filename} - Error: ${err.message}`);
            }
        }
    }

    // Summary
    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('📊 Obfuscation Summary:');
    console.log(`   Files processed: ${totalFiles}`);
    console.log(`   Files skipped:   ${skipped}`);
    console.log(`   Errors:          ${errors}`);
    console.log(`   Original size:   ${formatBytes(totalOriginal)}`);
    console.log(`   Obfuscated size: ${formatBytes(totalObfuscated)}`);

    if (totalOriginal > 0) {
        const overhead = ((totalObfuscated - totalOriginal) / totalOriginal * 100).toFixed(1);
        console.log(`   Size overhead:   ${overhead}%`);
    }

    console.log('\n✅ Obfuscation complete! Your UI code is now protected.\n');
}

// ─────────────────────────────────────────────────────────────────────────────
// Run
// ─────────────────────────────────────────────────────────────────────────────

obfuscateFiles().catch(err => {
    console.error('❌ Obfuscation failed:', err);
    process.exit(1);
});

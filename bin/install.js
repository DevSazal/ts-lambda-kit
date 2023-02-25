#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Validate Arguments
if (process.argv.length < 3) {
    console.log('You have to provide a name for your lambda backend app.');
    console.log('For example :');
    console.log('    npx ts-lambda-kit my-app');
    // console.log('    OR');
    // console.log('    npm init ts-lambda-kit my-app');
    process.exit(1);
}

// define constants
const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const git_repo = 'https://github.com/DevSazal/ts-lambda-kit.git';

// check if directory already exists
try {
    fs.mkdirSync(projectPath);
} catch (err) {
    if (err.code === 'EEXIST') {
        console.log(`The folder ${projectName} already exist in the current directory, please give it another name.`);
    } else {
        console.log(error);
    }
    process.exit(1);
}

async function main() {
    try {
        console.log('\n');
        console.log(`Downloading files...`);
        console.log(`repository: ${git_repo}`);
        console.log('\n');
        execSync(`git clone --depth 1 ${git_repo} ${projectPath}`);

        process.chdir(projectPath);

        console.log('\n');
        console.log(`Installing dependencies...`);
        execSync('npm install');

        // remove extra files
        console.log('\n');
        console.log(`Cleaning the workspace...`);
        execSync('npx rimraf ./.git'); // delete .git folder

        fs.unlinkSync(path.join(projectPath, 'bin', 'install.js'));
        fs.rmSync(path.join(projectPath, 'bin'), { recursive: true });

        // end notes
        console.log('\n');
        console.log('Installation is now complete!');
        console.log('This is ready to use.');
        console.log('\n');
        console.log('We suggest that you start by typing:');
        console.log(`    cd ${projectName}`);
        console.log();
        console.log('Enjoy your typescript lambda app, which will provide you some ready-made features!');
        console.log('🎉 Tada...');
        console.log();
    } catch (error) {
        console.log(error);
    }
}

main();

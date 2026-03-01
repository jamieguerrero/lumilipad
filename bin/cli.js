#!/usr/bin/env node

import { Command } from 'commander';
import { scaffold } from '../src/scaffold.js';
import { deploy } from '../src/deploy.js';
import chalk from 'chalk';

const program = new Command();

program
  .name('lumipad')
  .description('Scaffold and deploy static sites to Netlify')
  .version('0.1.0');

program
  .option('--to <project-name>', 'Create and deploy a new project')
  .action(async (options) => {
    if (!options.to) {
      console.log(chalk.yellow('Usage: lumipad --to <project-name>'));
      process.exit(1);
    }

    try {
      const projectName = options.to;
      console.log(chalk.blue(`\n✈️  Lumipad launching: ${projectName}\n`));

      // Step 1: Scaffold the project locally
      const projectPath = await scaffold(projectName);

      // Step 2: Create GitHub repo and push
      // Step 3: Create Netlify site and link to GitHub
      await deploy(projectPath, projectName);

      console.log(chalk.green(`\n✓ ${projectName} is live! 🚀\n`));
    } catch (error) {
      console.error(chalk.red(`\n✗ Error: ${error.message}\n`));
      process.exit(1);
    }
  });

program.parse();

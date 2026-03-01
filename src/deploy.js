import { execa } from 'execa';
import chalk from 'chalk';
import ora from 'ora';
import path from 'path';

export async function deploy(projectPath, projectName) {
  // Step 1: Initialize git repo
  await initGit(projectPath);

  // Step 2: Create GitHub repo and push
  await createGitHubRepo(projectPath, projectName);

  // Step 3: Initialize Netlify site linked to GitHub
  await initNetlify(projectPath, projectName);

  // Step 4: Trigger initial deploy
  await triggerDeploy(projectPath, projectName);
}

async function initGit(projectPath) {
  const spinner = ora('Initializing git repository').start();

  try {
    await execa('git', ['init'], { cwd: projectPath });
    await execa('git', ['add', '.'], { cwd: projectPath });
    await execa('git', ['commit', '-m', 'Initial commit via lumipad'], { cwd: projectPath });
    await execa('git', ['branch', '-M', 'main'], { cwd: projectPath });

    spinner.succeed(chalk.green('Git initialized'));
  } catch (error) {
    spinner.fail(chalk.red('Git initialization failed'));
    throw error;
  }
}

async function createGitHubRepo(projectPath, projectName) {
  const spinner = ora('Creating GitHub repository').start();

  try {
    // Create repo under @jamieguerrero
    await execa('gh', [
      'repo',
      'create',
      `jamieguerrero/${projectName}`,
      '--public',
      '--source=.',
      '--push',
      '--description',
      `Created with lumipad ✈️`
    ], { cwd: projectPath });

    spinner.succeed(chalk.green(`GitHub repo created: jamieguerrero/${projectName}`));
  } catch (error) {
    spinner.fail(chalk.red('GitHub repo creation failed'));
    throw error;
  }
}

async function initNetlify(projectPath, projectName) {
  const spinner = ora('Setting up Netlify site').start();

  try {
    // Check if NETLIFY_AUTH_TOKEN is set
    if (!process.env.NETLIFY_AUTH_TOKEN) {
      spinner.warn(chalk.yellow('NETLIFY_AUTH_TOKEN not found'));
      console.log(chalk.dim('Run: netlify login'));
      console.log(chalk.dim('Or set NETLIFY_AUTH_TOKEN environment variable'));
      throw new Error('Netlify authentication required');
    }

    // Initialize Netlify site linked to GitHub
    // This creates the site and connects it to the GitHub repo
    await execa('netlify', [
      'init',
      '--manual',
      '--name',
      projectName
    ], {
      cwd: projectPath,
      stdio: 'inherit' // Show interactive prompts if needed
    });

    spinner.succeed(chalk.green('Netlify site created'));
  } catch (error) {
    spinner.fail(chalk.red('Netlify initialization failed'));
    throw error;
  }
}

async function triggerDeploy(projectPath, projectName) {
  const spinner = ora('Deploying to Netlify').start();

  try {
    // Deploy to production
    const { stdout } = await execa('netlify', ['deploy', '--prod'], {
      cwd: projectPath
    });

    // Extract URL from output
    const urlMatch = stdout.match(/Website URL:\s+(https:\/\/[^\s]+)/);
    const siteUrl = urlMatch ? urlMatch[1] : `https://${projectName}.netlify.app`;

    spinner.succeed(chalk.green(`Deployed to ${siteUrl}`));
  } catch (error) {
    spinner.fail(chalk.red('Deployment failed'));
    throw error;
  }
}

const { Command } = require('commander');
const program = new Command();
const { runMigrations, rollbackMigration, connectToDatabase } = require('./db');

program
  .command('migrate')
  .description('Run database migrations')
  .action(async () => {
    await connectToDatabase();
    await runMigrations();
  });

program
  .command('rollback')
  .description('Rollback database migrations')
  .action(async() => {
    await connectToDatabase();
    await rollbackMigration();
  });

program.parse(process.argv);
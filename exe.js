#!/usr/bin/env node

import { Command } from 'commander';
//const { Command } = require('commander');
const program = new Command();

program
  .name('phanie-script')
  .description('CLI to some JavaScript string utilities')
  .version('0.8.0');

program.command("ifnti")
  .argument('<string>',"Niveau d'etude(L1,L2,L3)")
  .action((str,option)=>{
    //console.log(str);
    
    console.log("Bonjour "+str);
    
  })

program.parse();
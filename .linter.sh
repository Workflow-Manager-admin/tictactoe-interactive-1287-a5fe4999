#!/bin/bash
cd /tmp/kavia/workspace/code-generation/tictactoe-interactive-1287-a5fe4999/tic_tac_toe_interactive
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi


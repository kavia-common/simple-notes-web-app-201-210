#!/bin/bash
cd /tmp/kavia/workspace/code-generation/simple-notes-web-app-201-210/react_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi


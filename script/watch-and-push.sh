#!/bin/bash

# Check the status of the ship-position.json file
if [[ $(git status --porcelain ship-position.json) ]]; then
    # Add the file to the staging area
    git add ship-position.json

    # Commit the changes
    git commit -m "Update ship position"

    # Push the changes to the remote repository
    git push
fi

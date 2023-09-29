#! /usr/bin/bash

 
#####################################################################
############ PLEASE GIVE THE BRANCH NAME IN TE SCRIPT ###############
#####################################################################
 
COMMIT_NAME=$1

display_msg() {
    echo ">>-----------> "" $1 """
    # sleep 2s
}

echo "
________________________________________________________________________________________________________________
                               /
          =___________________/_____=    ___.___.___.___.___.___.__.___    ___.___.___.___.___.___.__.___
         / D         IR            D \  |    Getting Things Ready...   |  |                              |
        =\___---_______________---___/==|____,.,________________,.,____|==|____,.,________________,.,____|=
_____________000_______________000___________0_0________________0_0____________0_0________________0_0___________
"

# Change to the local code directory
display_msg "Reaching to the Directory..."
LOCAL_CODE_DIR=$(pwd)
cd "$LOCAL_CODE_DIR" || return


# Define the repository URL and the local code directory
display_msg "Gathering information about git..."
BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)

# doing git add
display_msg "Op-1 :- adding..."
git add . > /dev/null 2>&1

# Commit the changes
display_msg "Op-2 :- commiting - $COMMIT_NAME..."
git commit -m "$COMMIT_NAME" --no-verify > /dev/null 2>&1

# # Add the remote repository and push the code
display_msg "Op-3 :- pushing to - $BRANCH_NAME..."
git push origin "$BRANCH_NAME" --no-verify > /dev/null 2>&1

# success message
display_msg "Operation successful. "

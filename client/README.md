# OS Lens Client

## Pre-requisites
1. Setup and start server first. See server [README](../server/README.md)

## Setup

1. `npm install`
1. `npm run dev`

## Future improvements
1. logger
1. automated tests (unit && e2e)
1. router
1. SSR
1. better transitions/animations
1. improved error handling
1. better css/variable management

## Manual Tests to be converted to e2e
### Org Search View
1. Search for a known org like "facebook"
    1. when clicking the search button (or hitting enter) you should see a loading spinner while waiting for the reques to come back
    1. verify you see 30 repos, (most likely React is first)
    1. verify you see repo descriptions under each name
    1. you should see fork count on the right of each line
    1. there should be an "eye" icon on the left
1. Search for a known invalid org like "asdf"  
    1. verify there aren't any search results
1. Shut off backend, search for known org like "facebook"
    1. verify you get a red alert "Unable to get search results. Please try again later."

### Commits View
1. Search for a known org like "facebook" and click on the "eye" icon next to "React"
    1. verify you see a list of 30 commits.
    1. verify you see an external link icon, the name of each commit author, the first 100 chars of the commit message, and the commit timestamp
    1. click on a row and verify the correct commit is opened in a new tab
1. Search for a known org like "facebook", once results come back shut off the server. Then click on the "eye" next to "React"
    1. verify you see a message "Unable to get commits. Please try again later."
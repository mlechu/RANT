# RANT
Robots Are Not Taking our jobs bro
## Inspiration
As computer science majors, the majority of us are introverts. Though we may rock the technical interview, we bomb the "casual coffee chat" one. Our only friends are on Discord, which don't really count as they're all virtual. To achieve our dream of getting a $500/hour starting base job without working 9 to 5, we created R.A.N.T. which stands for Robots Are Not Taking our jobs (because they’re helping people get jobs...get it?). 

## What it does
1. Upload resume and job description.
2. Resume is parsed into text, sent to Google Cloud NLP API token generation and analysis, fed into template starter questions (fill-in-the-blank style!).
3. Templates send prompt to OpenAI API.
4. OpenAI generates a list of relevant questions.
4. AI asks the questions. User decides answer duration, and can choose when to move on to the next question.
5. Facial expression detection with emotion analysis and body language - report and summary statistics provided to user once interview session is complete.

The blend of generic templating and openAI works well together, since template questions may or may not make grammatical sense, and openAI alone would ask you about everything you’ve never used.

## How we built it
The frontend is built with React. 
The backend is comprised of Node.js, Google Cloud NLP API, and OpenAI API.

## Accomplishments that we're proud of
We created a site that makes computer science introverts rock interviews and answer impromptu questions quickly. We are able to be aware of our body language and outwards appearance to others.
 
## What we learned
Experimenting with OpenAI GPT-3, Google Cloud 

## Challenges we ran into
Names were confusing. We had two people named Emily. They forget sometimes who they are.
Sadly, TOhacks is only 24 hours, so we struggled with implementing all the features we originally thought. See 'What's next for RANT' below for some of our many other ideas for this project!

## What's next for RANT 
1. Feedback on filler words "um," "uh," or "like" based on voice transcript - we did try this but realized the package we were using does not detect filler words. 
2. Job description - this currently does not do anything in our MVP. Analyzing a job description would be easier than analyzing a pdf resume. Combining both together, users can really get optimal questions.
3. Randomness of questions - Google Cloud looks for header titles like "Projects," "Experience," and "Education." Thus, OpenAI API can tie tasks to projects and jobs to ask users of skills, especially if specific ones are important for the job.
4. Authentication feature so that users can see their progress over time  - eventually, this could potentially allow users to video call with other users and get feedback from real people in addition to the machine.

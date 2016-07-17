REST API
This is a REST API implemented using Express, Mongoose and MongoDB. The API supports a "stackoverflow"
like website.

To test the implementation, postman plugin is recommended.
To get all the questions, enter URL: http://localhost:3000/questions/ and select GET method in postman.

To post a new question, enter URL: http://localhost:3000/questions/ and select POST method in postman. Then
enter a JSON object like {text:YOUR_QUESTION}

To get a question by ID, enter URL: http://localhost:3000/questions/QUESTION_ID and select GET method in postman.

To post an answer, enter URL: http://localhost:3000/questions/QUESTION_ID/answers and select POST method in postman and enter a JSON object like {text:YOUR_ANSWER}

To edit a specific answer, enter URL: http://localhost:3000/questions/QUESTION_ID/answers/ANSWER_ID and select PUT method in postman and enter a JSON object like {text:YOUR_ANSWER}

To delete a specific answer, enter URL: http://localhost:3000/questions/QUESTION_ID/answers/ANSWER_ID and select DELETE method in postman.

To vote up for an answer, enter URL:http://localhost:3000/questions/QUESTION_ID/answers/ANSWER_ID/vote-up and select POST method in postman.

To vote up for an answer, enter URL: http://localhost:3000/questions/QUESTION_ID/answers/ANSWER_ID/vote-down and select POST method in postman.

One thing to be noticed is that the answers with more vote-ups will always appear before than other answers.

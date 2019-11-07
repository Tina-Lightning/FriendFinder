var friends = require("../data/friends");

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {

        // This is the ideal difference between two friends (they gave the same answers)
        var totalDiff = 0;

        // This is a new bestMatch object 
        var bestMatch = {
            name: "",
            photo: "",
            friendDiff: 1000 // This is the score to beat and will reset with every iteration
        };

        // Here we get the data the user on the site submits: their name and the their scores
        var userData = req.body;
        var userName = userData.name;
        var userScores = userData.scores;

        //This converts the scores array into an array of integers
        var scoresArray = userScores.map(function (item) {
            return parseInt(item, 10);
        });

        // Here we get the data the user on the site submits, then their name and the their scores
        userData = {
            name: req.body.name,
            photo: req.body.photo,
            scores: scoresArray
        };

        // We console.log the User's name and their scores
        console.log("Name: " + userName);
        console.log("User Score " + userScores);

        // Then we get the sum of the user's scoresArray
        var sum = scoresArray.reduce((a, b) => a + b, 0);

        //Log the sum and friendDiff, which starts at 1000
        console.log("Sum of users score " + sum);
        console.log("Best match friend diff " + bestMatch.friendDiff);
        console.log("----------------------");

        // Then we iterate over the friends already in the array
        for (var i = 0; i < friends.length; i++) {

            // We log their name, totalDiff (which is always 0), and "Best friend match difference" (which starts at 1000)
            console.log(friends[i].name);
            totalDiff = 0;
            console.log("Total Diff: " + totalDiff);
            console.log("Best match friend diff: " + bestMatch.friendDiff);

            // Then we get the bestfriendScore (which gets the sum of the scores of each friend in the friends Array)
            var bestfriendScore = friends[i].scores.reduce((a, b) => a + b, 0);
            // We log the bestfriendScore
            console.log("Total of " + friends[i].name + "'s scores: " + bestfriendScore);

            // Then we subtract the bestfriendScore from the sum of the users score, and get the absolute value of that value, then add that totalDiff (which is currently 0)
            totalDiff += Math.abs(sum - bestfriendScore);

            // Then we log that new number which is the difference in these two friends, an ideal friendship totalDiff close to 0
            console.log("The difference between the new user and this friend: " + totalDiff);

            // If totalDiff is <= bestMatch.friendDiff, then set the values of bestMatch with the new friends values, with each iteration it checks if the new value is lower (aka a closer match)
            if (totalDiff <= bestMatch.friendDiff) {
                bestMatch.name = friends[i].name;
                bestMatch.photo = friends[i].photo;
                bestMatch.friendDiff = totalDiff;
            }
            // Log the new totalDiff
            console.log("New best match friend diff: " + totalDiff);
            console.log("----------------------");
        }
        // Finally, log whichever friend was determined to be the closest match (the final value of bestMatch)
        console.log(bestMatch);

        // Add the new user to the friend array
        friends.push(userData);

        // Log the new user 
        console.log("New user added");
        console.log(userData);

        // The results are now the bestMatch converted to json
        res.json(bestMatch);
    });
};
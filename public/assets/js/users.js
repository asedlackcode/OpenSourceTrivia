const users = [];

// Join user to chat
function userJoin(id, username, email){
    const user = {id, username, email};

    users.push(user);

    return user;
}

// Get current user
function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

// User leaves cht
function userLeaves(id) {
    const index = users.findIndex(user => user.id === id);

    if(index !== -1) {
        return users.splice(index, 1)[0];
    }
}


module.exports = {
    userJoin,
    getCurrentUser,
    userLeaves
};
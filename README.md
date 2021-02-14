# Project - PROG2053

## Group members:
- Dennis Kristiansen <denniskr@stud.ntnu.no>
- Salvador Bascunan <sobascun@stud.ntnu.no>
- Jørgen Eriksen <jorgberi@stud.ntnu.no>
- Elvis Arifagic <elvisa@stud.ntnu.no>

## Installation notes:
- Install nodeJs
- Run "npm i" in both the server and client folders of the project.
- While in the root folder of the project: "docker-compose up -d" - this will take a long time the first time you do it.

The client runs on [localhost:8080](http://localhost:8080)  
The server runs on [localhost:8081](http://localhost:8081)  
The PHPmyadmin runs on [localhost:8082](http://localhost:8082)  

all users from init.db has password of 'hello' so you can for an example login with:  
aland/hello (admin)  
jason/hello (moderator)  
amanda/hello (user)


## features
- authenticated login/register system (password is hashed in database)
- upvote and downvote posts and comments
- create and delete post (user can only delete it's own post)
- comment on posts
- request to be moderator using form (only admin can approve)
- can not view post without logging in.
- searching (both title and content of posts)
- sorting by date or alphabetic. It is sorted by SQL primary key from posts as default.




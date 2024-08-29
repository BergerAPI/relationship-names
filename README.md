# Relationship-Names

This is a very basic project, to match the initals of 2 persons in a relationship with a single image.
TikTok served as a big inspiration for this project, and my girlfriends obsession with these useless mappings gave me the final kick to write this.

## Technologies

Instead of overcomplication things with React etc., I chose to keep it simple by using Express with Nodejs and Typescript.
The images are provided by Unsplash. There is no template engine used, it's just plain html files.

## Setting up

To get this thing up and running, you just need to one simple environment variable to be able to communicate with unsplash.
Create a `.env` file, and add `UNSPLASH_ACCESS=your_access_key` to it.

### Registering for an Unsplash-Key

Create an account on `https://unsplash.com/join` and then create a new application on `https://unsplash.com/oauth/applications`.
This should automatically show you your access-key.

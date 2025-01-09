const { describe , it } = require("mocha")
const supertest = require("supertest")
import chai from "chai"

const requester = supertest("http://localhost:8080/")
const expect = chai.expect


describe( "Initializing Blogs endpoint", async function(){

    this.timeout(15000)


    describe( "Get all blogs" , async function(){
        const blogs = await requester.get("/blogs/allblogs")
        const response = JSON.parse( blogs )
        console.log( response)
    })
})